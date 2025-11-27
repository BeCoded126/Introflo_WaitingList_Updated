"use client";

import dynamic from "next/dynamic";

// Render the newer App dashboard (keeps the richer UI) client-side.
const AppDashboard = dynamic(() => import("@/app/dashboard/page"), {
  ssr: false,
});

export default function Dashboard() {
  return <AppDashboard />;
}
