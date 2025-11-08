import Stripe from "stripe";

// Lazy-init pattern: allow module to load but Stripe instance undefined if key missing
let stripe: Stripe | undefined;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16" as any,
    typescript: true,
  });
} else {
  console.warn(
    "[stripe] STRIPE_SECRET_KEY not set – subscription endpoints will return 503."
  );
}

export { stripe };

function ensureStripe(): Stripe {
  if (!stripe) {
    throw new Error("Stripe is not configured (missing STRIPE_SECRET_KEY)");
  }
  return stripe;
}

export async function createSubscription(customerId: string, priceId: string) {
  const client = ensureStripe();
  try {
    const subscription = await client.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as Stripe.Invoice)
        .payment_intent as Stripe.PaymentIntent,
    };
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  const client = ensureStripe();
  try {
    const subscription = await client.subscriptions.cancel(subscriptionId);
    return subscription;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
}

export async function updateSubscription(
  subscriptionId: string,
  priceId: string
) {
  const client = ensureStripe();
  try {
    const subscription = await client.subscriptions.retrieve(subscriptionId);

    const updatedSubscription = await client.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: subscription.items.data[0].id,
            price: priceId,
          },
        ],
      }
    );

    return updatedSubscription;
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
}

export async function createCustomer(email: string, name?: string) {
  const client = ensureStripe();
  try {
    const customer = await client.customers.create({
      email,
      name,
    });
    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

export async function getSubscription(subscriptionId: string) {
  const client = ensureStripe();
  try {
    const subscription = await client.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error("Error retrieving subscription:", error);
    throw error;
  }
}

export async function listInvoices(customerId: string) {
  const client = ensureStripe();
  try {
    const invoices = await client.invoices.list({
      customer: customerId,
      limit: 10,
    });
    return invoices;
  } catch (error) {
    console.error("Error listing invoices:", error);
    throw error;
  }
}

export async function createPortalSession(
  customerId: string,
  returnUrl: string
) {
  const client = ensureStripe();
  try {
    const session = await client.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    return session;
  } catch (error) {
    console.error("Error creating portal session:", error);
    throw error;
  }
}
