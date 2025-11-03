import { Suspense } from "react";
import { getFacilityMatches } from "@/lib/api";

export default async function Dashboard() {
  const matches = await getFacilityMatches();

  return (
    <div>
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Matches
        </h2>
        <Suspense fallback={<div>Loading matches...</div>}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Match Score
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {Math.round(match.score * 100)}%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a
                      href={`/app/facilities/${match.facilityId}`}
                      className="font-medium text-indigo-600 hover:text-indigo-900"
                    >
                      View details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
