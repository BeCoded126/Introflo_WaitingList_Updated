import React from "react";
import DesktopMock from "@/components/DesktopMock";

export const metadata = {
  title: "Components Preview — Desktop Mock",
};

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <div style={{ maxWidth: 980, width: "100%", padding: 24 }}>
        <h1 style={{ fontSize: 20, marginBottom: 12 }}>Desktop Mock Preview</h1>
        <DesktopMock />
      </div>
    </main>
  );
}
