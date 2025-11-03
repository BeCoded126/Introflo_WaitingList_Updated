"use client";

import React from "react";

export type Facility = {
  id: string;
  name: string;
  city?: string;
  state?: string;
  services?: string[];
  phone?: string;
  verified?: boolean;
};

export default function Card({ facility }: { facility: Facility }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{facility.name}</div>
        {facility.verified && <div className="badge">Verified</div>}
      </div>
      <div className="card-body">
        <div className="meta">
          {facility.city}, {facility.state}
        </div>
        <div className="services">
          {facility.services?.slice(0, 3).join(" • ")}
        </div>
      </div>
    </div>
  );
}
