import React from "react";

interface LogoMarkProps {
  size?: number;
}

export default function LogoMark({ size = 48 }: LogoMarkProps) {
  return (
    <img
      src="/images/logo.png"
      alt="introflo.io logo"
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
}
