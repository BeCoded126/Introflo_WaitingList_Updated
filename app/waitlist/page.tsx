"use client";

import React, { useState, useEffect } from "react";
import LogoMark from "@/components/LogoMark";

export default function Waitlist() {
  const [mounted, setMounted] = useState(false);
  const [activePhone, setActivePhone] = useState(0); // 0 = swipe deck, 1 = chat
  const [chatStep, setChatStep] = useState(1);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Scripted chat sequence
  const chatMessages = [
    {
      id: 1,
      text: "Hey there — can we set up an intro call?",
      time: "9:41 AM",
    },
    {
      id: 2,
      text: "Sure! What kind of services are you most often referring?",
      time: "9:41 AM",
    },
    {
      id: 3,
      text: "Primarily therapy & IOP for adolescents.",
      time: "9:42 AM",
      outgoing: true,
    },
    { id: 4, text: "Great — we have availability next week.", time: "9:42 AM" },
    {
      id: 5,
      text: "Amazing. I’ll send a few over shortly.",
      time: "9:43 AM",
      outgoing: true,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotate phone view (swipe deck -> chat)
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActivePhone((p) => (p === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Chat message reveal
  useEffect(() => {
    if (activePhone !== 1) return;
    if (chatStep >= chatMessages.length) return;
    const t = setTimeout(() => setChatStep((s) => s + 1), 2500);
    return () => clearTimeout(t);
  }, [activePhone, chatStep, chatMessages.length]);

  // Typing indicator toggle
  useEffect(() => {
    if (activePhone !== 1) return;
    const t = setTimeout(() => setIsTyping(true), 1200);
    const t2 = setTimeout(() => setIsTyping(false), 2200);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [activePhone, chatStep]);

  // Swipe animation & filters overlay
  useEffect(() => {
    if (activePhone !== 0) return;
    const swipe = setInterval(() => {
      setSwipeDirection((d) => (d === "left" ? "right" : "left"));
      setSwipeOffset((o) => (o === 0 ? 40 : 0));
    }, 3000);
    const filters = setInterval(() => {
      setShowFilters((f) => !f);
    }, 5000);
    return () => {
      clearInterval(swipe);
      clearInterval(filters);
    };
  }, [activePhone]);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#F8F9FA",
        color: "#2B2D31",
      }}
    >
      {/* Nav Bar */}
      <nav
        style={{
          padding: "20px 40px",
          borderBottom: "1px solid #C9CCD1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "#2B2D31",
              borderRadius: "8px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogoMark size={32} />
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#2B2D31",
              letterSpacing: "-0.02em",
            }}
          >
            introflo.io
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: "120px 24px 80px", background: "#F8F9FA" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 48,
            }}
          >
            {/* Left: Text + CTA */}
            <div style={{ flex: "1 1 480px", minWidth: 300 }}>
              <h1
                style={{
                  fontSize: "38px",
                  lineHeight: 1.15,
                  fontWeight: 800,
                  margin: 0,
                  color: "#1A1B1E",
                  letterSpacing: "-0.02em",
                }}
              >
                FIND THE PERFECT VERIFIED BEHAVIORAL HEALTH PARTNER —INSTANTLY.
              </h1>
              <div
                style={{
                  fontSize: "17px",
                  color: "#3A3A3D",
                  maxWidth: "640px",
                  margin: "32px 0",
                  lineHeight: 1.65,
                  fontWeight: 400,
                }}
              >
                <p style={{ marginBottom: 20 }}>
                  TOO MANY CALLS, TOO FEW RELIABLE CONTACTS →{" "}
                  <strong style={{ color: "#2B2D31" }}>
                    Curate your own verified network
                  </strong>
                </p>
                <p style={{ marginBottom: 20 }}>
                  ENDLESS FOLLOW-UPS AND GUESSING GAMES →{" "}
                  <strong style={{ color: "#2B2D31" }}>
                    Collaborate confidently with vetted partners
                  </strong>
                </p>
                <p style={{ marginBottom: 20 }}>
                  DISCONNECTED CARE TRANSITIONS →{" "}
                  <strong style={{ color: "#2B2D31" }}>
                    Strengthen every step of your patient's continuum
                  </strong>
                </p>
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "#F08A75",
                    marginTop: 28,
                    letterSpacing: "0.02em",
                  }}
                >
                  RESERVE YOUR SPOT NOW.
                </p>
              </div>
              {mounted ? (
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "560px",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Join waitlist"
                    style={{
                      flex: 1,
                      padding: "16px 20px",
                      fontSize: "16px",
                      borderRadius: "12px",
                      border: "1px solid #C9CCD1",
                      outline: "none",
                      background: "#F8F9FA",
                      color: "#3A3A3D",
                      fontWeight: 500,
                      boxShadow: "0 2px 6px rgba(240,138,117,0.10)",
                    }}
                  />
                  <button
                    style={{
                      padding: "16px 28px",
                      fontSize: "16px",
                      borderRadius: "12px",
                      fontWeight: 700,
                      background: "#F08A75",
                      color: "#FFFFFF",
                      border: "1px solid #F08A75",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(240,138,117,0.25)",
                      transition: "all 0.25s",
                    }}
                    onClick={() =>
                      window.open(
                        "https://tally.so/r/n0pRk9",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.background = "#D9A28B";
                      e.currentTarget.style.boxShadow =
                        "0 8px 18px rgba(240,138,117,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.background = "#F08A75";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(240,138,117,0.25)";
                    }}
                  >
                    Join
                  </button>
                </div>
              ) : null}
            </div>

            {/* Right: Phones cluster */}
            <div
              style={{
                position: "relative",
                display: mounted ? "flex" : "none",
                gap: "40px",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 auto",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "140%",
                  height: "140%",
                  background:
                    "radial-gradient(ellipse at center, rgba(240,138,117,0.12) 0%, transparent 70%)",
                  filter: "blur(70px)",
                  zIndex: 0,
                }}
              />
              {/* Left Phone (Wordmark) */}
              <div
                style={{
                  width: 280,
                  height: 580,
                  background: "#E5E7EB",
                  borderRadius: 40,
                  padding: 12,
                  boxShadow: "0 20px 40px rgba(240,138,117,0.15)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#F8F9FA",
                    borderRadius: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: 800,
                      color: "#2B2D31",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    introflo.io
                  </div>
                </div>
              </div>
              {/* Right Phone (Animations) */}
              <div
                style={{
                  width: 280,
                  height: 580,
                  background: "#E5E7EB",
                  borderRadius: 40,
                  padding: 12,
                  boxShadow:
                    activePhone === 1
                      ? "0 32px 60px rgba(240,138,117,0.28)"
                      : "0 20px 40px rgba(240,138,117,0.15)",
                  transform: activePhone === 1 ? "scale(1.055)" : "scale(1)",
                  transition: "all 0.7s cubic-bezier(.4,0,.2,1)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#F8F9FA",
                    borderRadius: 32,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 20px 8px",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#3A3A3D",
                    }}
                  >
                    <span>9:41</span>
                    <span>●●●●</span>
                  </div>
                  {activePhone === 0 ? (
                    <div
                      style={{
                        padding: "0 20px",
                        position: "relative",
                        flex: 1,
                      }}
                    >
                      {/* Mini app header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "6px 0 8px",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#8893AD",
                          letterSpacing: 0.4,
                        }}
                      >
                        introflo.io
                      </div>
                      {swipeDirection && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: 80,
                            opacity: 0.9,
                            animation: "scaleIn .35s ease-out",
                            pointerEvents: "none",
                            zIndex: 12,
                          }}
                        >
                          ♥
                        </div>
                      )}
                      {showFilters && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "#F8F9FA",
                            borderRadius: 20,
                            zIndex: 11,
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 8px 28px rgba(240,138,117,0.20)",
                            animation: "fadeIn .45s ease-out",
                          }}
                        >
                          <div
                            style={{
                              padding: "16px 18px",
                              borderBottom: "1px solid #C9CCD1",
                            }}
                          >
                            <h2
                              style={{
                                fontSize: 15,
                                fontWeight: 700,
                                margin: 0,
                                color: "#2B2D31",
                              }}
                            >
                              Filters
                            </h2>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              overflowY: "auto",
                              padding: "16px 18px",
                            }}
                          >
                            <div style={{ marginBottom: 18 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: 11,
                                  fontWeight: 600,
                                  marginBottom: 7,
                                  color: "#2B2D31",
                                }}
                              >
                                Location
                              </label>
                              <div
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #C9CCD1",
                                  borderRadius: 6,
                                  fontSize: 11,
                                  background: "#F8F9FA",
                                }}
                              >
                                Tampa, FL
                              </div>
                            </div>
                            <div style={{ marginBottom: 18 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: 11,
                                  fontWeight: 600,
                                  marginBottom: 7,
                                  color: "#2B2D31",
                                }}
                              >
                                Distance
                              </label>
                              <div
                                style={{
                                  padding: "8px 10px",
                                  border: "1px solid #C9CCD1",
                                  borderRadius: 6,
                                  fontSize: 11,
                                  background: "#F8F9FA",
                                }}
                              >
                                50 miles
                              </div>
                            </div>
                            <div style={{ marginBottom: 18 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: 11,
                                  fontWeight: 600,
                                  marginBottom: 7,
                                  color: "#2B2D31",
                                }}
                              >
                                Insurances Accepted (3)
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 6,
                                }}
                              >
                                {["Aetna", "Medicare", "Florida Blue"].map(
                                  (i) => (
                                    <div
                                      key={i}
                                      style={{
                                        padding: "6px 12px",
                                        borderRadius: 16,
                                        background: "#F08A75",
                                        border: "1.5px solid #F08A75",
                                        color: "#FFFFFF",
                                        fontSize: 10,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {i}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            <div style={{ marginBottom: 18 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: 11,
                                  fontWeight: 600,
                                  marginBottom: 7,
                                  color: "#2B2D31",
                                }}
                              >
                                Ages Treated (2)
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 6,
                                }}
                              >
                                {[
                                  "Adolescent (13-17)",
                                  "Young Adult (18-25)",
                                ].map((i) => (
                                  <div
                                    key={i}
                                    style={{
                                      padding: "6px 12px",
                                      borderRadius: 16,
                                      background: "#F08A75",
                                      border: "1.5px solid #F08A75",
                                      color: "#FFFFFF",
                                      fontSize: 10,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {i}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: 11,
                                  fontWeight: 600,
                                  marginBottom: 7,
                                  color: "#2B2D31",
                                }}
                              >
                                Services Provided (3)
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 6,
                                }}
                              >
                                {["Therapy", "IOP", "Counseling"].map((i) => (
                                  <div
                                    key={i}
                                    style={{
                                      padding: "6px 12px",
                                      borderRadius: 16,
                                      background: "#F08A75",
                                      border: "1.5px solid #F08A75",
                                      color: "#FFFFFF",
                                      fontSize: 10,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {i}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              padding: "16px 18px",
                              borderTop: "1px solid #C9CCD1",
                              display: "flex",
                              gap: 10,
                            }}
                          >
                            <button
                              style={{
                                flex: 1,
                                padding: "10px 16px",
                                borderRadius: 6,
                                background: "#F8F9FA",
                                border: "1.5px solid #C9CCD1",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#8893AD",
                                cursor: "pointer",
                              }}
                            >
                              Clear All
                            </button>
                            <button
                              style={{
                                flex: 1,
                                padding: "10px 16px",
                                borderRadius: 6,
                                background: "#F08A75",
                                border: "1px solid #F08A75",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#FFFFFF",
                                boxShadow: "0 2px 8px rgba(240,138,117,0.25)",
                                cursor: "pointer",
                              }}
                            >
                              Apply Filters
                            </button>
                          </div>
                        </div>
                      )}
                      <div
                        style={{
                          background: "#F8F9FA",
                          borderRadius: 20,
                          overflow: "hidden",
                          boxShadow: "0 8px 24px rgba(240,138,117,0.15)",
                          transform: `translateX(${swipeOffset}px) rotate(${
                            swipeOffset * 0.1
                          }deg)`,
                          transition: "all .7s cubic-bezier(.34,1.56,.64,1)",
                          opacity: swipeDirection ? 0.85 : 1,
                          filter: showFilters ? "blur(2px)" : "none",
                          marginTop: 8,
                        }}
                      >
                        <div
                          style={{
                            height: 220,
                            background:
                              "linear-gradient(135deg, rgba(240,138,117,0.15) 0%, rgba(217,162,139,0.12) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 48,
                          }}
                        >
                          🏥
                        </div>
                        <div style={{ padding: 16 }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              marginBottom: 6,
                              color: "#2B2D31",
                            }}
                          >
                            The SD Mindset
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#8893AD",
                              marginBottom: 8,
                            }}
                          >
                            📍 Coral Springs, FL
                          </div>
                          <div style={{ fontSize: 10, color: "#8893AD" }}>
                            Therapy • IOP • Counseling
                          </div>
                        </div>
                      </div>
                      {/* Swipe buttons */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 16,
                          padding: "12px 0 8px",
                          opacity: showFilters ? 0.5 : 1,
                          pointerEvents: showFilters ? "none" : "auto",
                        }}
                      >
                        <button
                          style={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            border: "1.5px solid #C9CCD1",
                            background: "#F8F9FA",
                            color: "#8893AD",
                            fontSize: 22,
                            boxShadow: "0 2px 8px rgba(240,138,117,0.10)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSwipeDirection("left");
                            setSwipeOffset(40);
                            setTimeout(() => {
                              setSwipeOffset(0);
                              setSwipeDirection(null);
                            }, 700);
                          }}
                        >
                          ✕
                        </button>
                        <button
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            border: "1.5px solid #F08A75",
                            background: "#F08A75",
                            color: "#FFFFFF",
                            fontSize: 24,
                            boxShadow: "0 6px 16px rgba(240,138,117,0.30)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSwipeDirection("right");
                            setSwipeOffset(40);
                            setTimeout(() => {
                              setSwipeOffset(0);
                              setSwipeDirection(null);
                            }, 700);
                          }}
                        >
                          ♥
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          padding: "12px 20px",
                          background: "#F08A75",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                          }}
                        >
                          🏥
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#FFFFFF",
                            }}
                          >
                            The SD Mindset
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "rgba(255,255,255,0.9)",
                            }}
                          >
                            Online
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: 16,
                          background: "#F8F9FA",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                        }}
                      >
                        {(mounted
                          ? chatMessages.slice(0, chatStep)
                          : chatMessages.slice(0, 1)
                        ).map((m) => (
                          <div
                            key={m.id}
                            style={{
                              marginBottom: 12,
                              display: "flex",
                              justifyContent: m.outgoing
                                ? "flex-end"
                                : "flex-start",
                              opacity: 0,
                              animation: "fadeIn .5s forwards",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  maxWidth: "80%",
                                  background: m.outgoing
                                    ? "#F08A75"
                                    : "#E5E7EB",
                                  color: m.outgoing ? "#FFFFFF" : "#3A3A3D",
                                  padding: "10px 14px",
                                  borderRadius: m.outgoing
                                    ? "16px 16px 4px 16px"
                                    : "16px 16px 16px 4px",
                                  fontSize: 12,
                                  lineHeight: 1.5,
                                  boxShadow: m.outgoing
                                    ? "0 4px 12px rgba(240,138,117,0.25)"
                                    : "0 2px 8px rgba(240,138,117,0.08)",
                                }}
                              >
                                {m.text}
                              </div>
                              <div
                                style={{
                                  fontSize: 10,
                                  color: "#8893AD",
                                  marginTop: 4,
                                  textAlign: m.outgoing ? "right" : "left",
                                }}
                              >
                                {m.time}
                              </div>
                            </div>
                          </div>
                        ))}
                        {mounted && isTyping && (
                          <div
                            style={{
                              marginBottom: 12,
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                background: "#E5E7EB",
                                padding: "10px 14px",
                                borderRadius: "16px 16px 16px 4px",
                                boxShadow: "0 2px 8px rgba(240,138,117,0.08)",
                                display: "flex",
                                gap: 4,
                              }}
                            >
                              <div
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: "#8893AD",
                                  animation: "typingDot 1.4s infinite",
                                }}
                              />
                              <div
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: "#8893AD",
                                  animation: "typingDot 1.4s infinite .2s",
                                }}
                              />
                              <div
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: "#8893AD",
                                  animation: "typingDot 1.4s infinite .4s",
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}@keyframes scaleIn{from{transform:translate(-50%,-50%) scale(.5);opacity:0;}to{transform:translate(-50%,-50%) scale(1);opacity:.9;}}@keyframes typingDot{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-8px);}}`}</style>
                      </div>
                      <div
                        style={{
                          padding: "12px 16px",
                          borderTop: "1px solid #C9CCD1",
                          background: "#F8F9FA",
                        }}
                      >
                        <div
                          style={{
                            background: "#E5E7EB",
                            borderRadius: 20,
                            padding: "10px 16px",
                            fontSize: 12,
                            color: "#8893AD",
                          }}
                        >
                          Type a message...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "100px 24px", background: "#F8F9FA" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 800,
                marginBottom: 16,
                color: "#2B2D31",
              }}
            >
              Why Choose introflo.io?
            </h2>
            <p style={{ fontSize: 18, color: "#3A3A3D" }}>
              Everything you need to build a strong referral network
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 40,
            }}
          >
            {[
              {
                icon: "🎯",
                title: "Smart Matching",
                desc: "Algorithm connects you with facilities matching your criteria",
              },
              {
                icon: "💬",
                title: "Direct Messaging",
                desc: "Chat instantly with matched facilities",
              },
              {
                icon: "✅",
                title: "Verified Facilities",
                desc: "All facilities verified and credentialed",
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: 32,
                  background: "#E5E7EB",
                  border: "1px solid #C9CCD1",
                  borderRadius: 14,
                  boxShadow: "0 4px 12px rgba(240,138,117,0.08)",
                }}
              >
                <div
                  style={{ fontSize: 48, marginBottom: 16, color: "#F08A75" }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#2B2D31",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 15, color: "#3A3A3D", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#F8F9FA",
          padding: "80px 40px 40px",
          borderTop: "1px solid #C9CCD1",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h3
            style={{
              fontSize: 28,
              fontWeight: 800,
              marginBottom: 18,
              color: "#2B2D31",
            }}
          >
            Be One of the First to Gain Access
          </h3>
          {mounted && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                maxWidth: 420,
                margin: "0 auto 32px",
                alignItems: "center",
              }}
            >
              <input
                type="email"
                placeholder="Join waitlist"
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  fontSize: 16,
                  borderRadius: 10,
                  border: "1px solid #C9CCD1",
                  outline: "none",
                  background: "#F8F9FA",
                  color: "#3A3A3D",
                  fontWeight: 500,
                  boxShadow: "0 2px 6px rgba(240,138,117,0.08)",
                }}
              />
              <button
                style={{
                  padding: "14px 28px",
                  fontSize: 16,
                  borderRadius: 10,
                  fontWeight: 700,
                  background: "#F08A75",
                  color: "#FFFFFF",
                  border: "1px solid #F08A75",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(240,138,117,0.25)",
                  transition: "all .25s",
                }}
                onClick={() =>
                  window.open(
                    "https://tally.so/r/n0pRk9",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background = "#D9A28B";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(240,138,117,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "#F08A75";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(240,138,117,0.25)";
                }}
              >
                Join
              </button>
            </div>
          )}
          <div
            style={{
              fontSize: 14,
              color: "#8893AD",
              paddingTop: 32,
              borderTop: "1px solid #C9CCD1",
            }}
          >
            © 2025 introflo.io. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
