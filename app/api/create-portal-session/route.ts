import { NextResponse } from "next/server";
import { stripe, createPortalSession } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/api";
import { createClient } from "@/lib/api";

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabase = createClient();

    // Get organization details
    const { data: org } = await supabase
      .from("organizations")
      .select("stripe_customer_id")
      .eq("id", user.org_id)
      .single();

    if (!org?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 400 }
      );
    }

    const session = await createPortalSession(
      org.stripe_customer_id,
      `${req.headers.get("origin")}/app/subscription`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Error creating portal session" },
      { status: 500 }
    );
  }
}
