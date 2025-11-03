import { Suspense } from "react";
import { getReferrals } from "@/lib/api";

export default async function ReferralsPage() {
  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Referrals
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your Active Referrals
                </h3>
              </div>
              <Suspense fallback={<ReferralsSkeleton />}>
                <ReferralList />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

async function ReferralList() {
  const referrals = await getReferrals();

  if (referrals.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No referrals yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Start connecting with facilities to create referrals.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      <ul role="list" className="divide-y divide-gray-200">
        {referrals.map((referral) => (
          <li key={referral.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-600">
                      {referral.fromFacility.name[0]}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {referral.fromFacility.name} → {referral.toFacility.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Created on{" "}
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
                  {referral.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReferralsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="space-y-6 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
            </div>
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
