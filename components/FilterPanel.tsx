"use client";

import React from "react";
import { Facility } from "./Card";

type Props = {
  onFilterChange?: (filters: any) => void;
};

export default function FilterPanel({ onFilterChange }: Props) {
  const [location, setLocation] = React.useState("");
  const [services, setServices] = React.useState<string[]>([]);

  const serviceOptions = [
    "Therapy",
    "IOP",
    "PHP",
    "Detox",
    "Med Management",
    "TMS",
    "ECT",
  ];

  return (
    <div className="filter-panel">
      <h3>Find Partners</h3>

      <div className="filter-section">
        <label>Location</label>
        <input
          type="text"
          placeholder="City, State"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-section">
        <label>Services</label>
        <div className="service-tags">
          {serviceOptions.map((service) => (
            <button
              key={service}
              onClick={() => {
                if (services.includes(service)) {
                  setServices(services.filter((s) => s !== service));
                } else {
                  setServices([...services, service]);
                }
              }}
              className={`tag ${services.includes(service) ? "active" : ""}`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
