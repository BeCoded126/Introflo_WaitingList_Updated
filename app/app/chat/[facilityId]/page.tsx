import { Suspense } from "react";
import Chat from "@/components/Chat";
import { getCurrentUser, getFacilityById } from "@/lib/api";

export default async function ChatPage({
  params: { facilityId },
}: {
  params: { facilityId: string };
}) {
  const [user, facility] = await Promise.all([
    getCurrentUser(),
    getFacilityById(facilityId),
  ]);

  if (!user || !facility) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {!user ? "Please sign in to continue" : "Facility not found"}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Chat with {facility.name}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
                </div>
              }
            >
              <Chat facility={facility} currentUserId={user.id} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
