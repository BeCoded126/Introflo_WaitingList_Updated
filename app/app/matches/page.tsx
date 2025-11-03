"use client";

import { useEffect, useState } from "react";
import { Facility, Match } from "@/types";
import FacilityCard from "@/components/FacilityCard";
import { getFacilityMatches, getFacilityById } from "@/lib/api";

export default function MatchesPage() {
  const [matches, setMatches] = useState<(Match & { facility: Facility })[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        const matchData = await getFacilityMatches();
        const matchesWithFacilities = await Promise.all(
          matchData.map(async (match: Match) => {
            const facility = await getFacilityById(match.matchedWith);
            return { ...match, facility };
          })
        );
        setMatches(matchesWithFacilities);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Your Matches
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((match) => (
                <div key={match.id} className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {Math.round(match.score * 100)}% Match
                    </span>
                  </div>
                  <FacilityCard
                    facility={match.facility}
                    onConnect={() => {
                      // Handle connect action
                      console.log("Connect with facility:", match.facility.id);
                    }}
                  />
                </div>
              ))}

              {matches.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">
                    No matches yet
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Complete your profile to start seeing matches.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
