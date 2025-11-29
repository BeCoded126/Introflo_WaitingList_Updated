"use client";

import React from "react";

export type Facility = {
  id: string;
  name: string;
  city?: string;
  state?: string;
  services?: string[];
  ageGroups?: string[];
  phone?: string;
  verified?: boolean;
  image?: string;
  images?: string[];
  insurances?: string[];
  bio?: string;
};

export default function Card({ facility }: { facility: Facility }) {
  // Use first image from profile images if available, otherwise fall back to single image
  const displayImage = facility.images?.[0] || facility.image;

  return (
    <div className="card horizontal">
      <div className="card-media">
        {displayImage ? (
          <div className="card-media-figure">
            <img src={displayImage} alt={facility.name} loading="lazy" />
          </div>
        ) : (
          <div className="card-media-placeholder" aria-hidden>
            No image
          </div>
        )}

        {/* Action row under the main image: circular icon buttons (match iPhone mock) */}
        <div className="card-actions" aria-hidden>
          <button className="card-action dislike" type="button" aria-label="Dislike">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M6.225 6.225a.75.75 0 011.06 0L12 10.94l4.715-4.715a.75.75 0 111.06 1.06L13.06 12l4.715 4.715a.75.75 0 11-1.06 1.06L12 13.06l-4.715 4.715a.75.75 0 11-1.06-1.06L10.94 12 6.225 7.285a.75.75 0 010-1.06z" />
            </svg>
          </button>
          <button className="card-action like" type="button" aria-label="Like">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.74 0 3.41 1 4.5 2.09C11.09 6 12.76 5 14.5 5 16.58 5 18 6.42 18 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <div className="card-title">{facility.name}</div>
          {facility.verified && <div className="badge">Verified</div>}
        </div>
        <div className="card-body">
          <div className="meta">
            {facility.city}, {facility.state}
          </div>
          <div className="distance">12 miles away</div>
          <div className="services">
            <strong>Services Provided:</strong>{" "}
            {facility.services?.slice(0, 4).join(" • ")}
          </div>
          {facility.insurances && facility.insurances.length > 0 && (
            <div className="insurances">
              <strong>Insurances accepted:</strong>{" "}
              {facility.insurances.slice(0, 3).join(", ")}
              {facility.insurances.length > 3 &&
                ` +${facility.insurances.length - 3} more`}
            </div>
          )}
          {facility.bio && (
            <div className="bio">
              <strong>About Us:</strong>{" "}
              {facility.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
