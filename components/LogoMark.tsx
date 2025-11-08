import React from "react";

interface LogoMarkProps {
  size?: number;
}

export default function LogoMark({ size = 48 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff655c" />
          <stop offset="1" stopColor="#44bc0c" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logo-gradient)" />
      <path
        d="M24 16C19.58 16 16 19.58 16 24C16 26.89 17.65 29.42 20.07 30.66L24 27L27.93 30.66C30.35 29.42 32 26.89 32 24C32 19.58 28.42 16 24 16Z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M20 30H28V32C28 33.1 27.1 34 26 34H22C20.9 34 20 33.1 20 32V30Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}
