"use client";

import React from "react";
import ChatPane from "../../components/ChatPane";

export default function Matches() {
  return (
    <div style={{ display: "flex", gap: 16, padding: 24 }}>
      <div
        style={{
          width: 300,
          background: "#fff",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <h4>Your matches</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            Harmony Therapy
          </li>
          <li style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            Tranduitiy Behavioral Health
          </li>
        </ul>
      </div>
      <div
        style={{ flex: 1, background: "#fff", padding: 16, borderRadius: 12 }}
      >
        <ChatPane partnerName="Harmony Therapy" />
      </div>
    </div>
  );
}
