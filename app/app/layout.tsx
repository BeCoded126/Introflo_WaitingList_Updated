import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Allow all access in demo mode - no auth checks
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
