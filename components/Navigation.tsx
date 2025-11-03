"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Discover" },
    { href: "/matches", label: "Matches" },
    { href: "/auth", label: "Sign In" },
  ];

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link href="/">
          <h1>introflo.io</h1>
        </Link>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
