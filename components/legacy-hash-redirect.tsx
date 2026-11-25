"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** The old one-page site used /#section links. Send them to the new pages. */
const map: Record<string, string> = {
  "#projects": "/work",
  "#about": "/about",
  "#skills": "/about#capabilities",
  "#education": "/about#education",
  "#certifications": "/about#education",
  "#contact": "/contact",
};

export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const to = map[window.location.hash];
    if (to) router.replace(to);
  }, [router]);
  return null;
}
