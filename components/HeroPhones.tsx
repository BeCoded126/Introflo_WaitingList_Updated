"use client";

import React, { useEffect, useState } from "react";

type Props = {
  activePhone: number;
};

export default function HeroPhones({ activePhone }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => {
      const forced = document.body.classList.contains("force-show-mockups");
      setShow(mq.matches || forced);
    };
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  if (!show) return null;

  // Render the single mockup card (force mockup template style)
  return (
    <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
      <div className="mockup-card" style={{ width: 320 }}>
        <div
          className="mockup-image"
          style={{
            height: 220,
            background: "#E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/interior-1.jpg"
            alt="facility"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          className="mockup-content"
          style={{ padding: 20, background: "white" }}
        >
          <div
            className="mockup-title"
            style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}
          >
            The SD Mindset
          </div>
          <div
            className="mockup-text"
            style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}
          >
            Coral Springs, FL
          </div>
          <div
            className="mockup-text"
            style={{ fontSize: 12, marginBottom: 8 }}
          >
            Therapy • IOP • Counseling • Coaching
          </div>
          <div
            className="mockup-buttons"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <div
              className="mockup-btn skip"
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: "#f2f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </div>
            <div
              className="mockup-btn match"
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: "#44bc0c",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ♥
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
