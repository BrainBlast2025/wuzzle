// lib/clerkProvider.jsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ClerkProviderWithNavigation({ children }) {
  return (
    <ClerkProvider navigate={(to) => useRouter().push(to)}>
      {children}
    </ClerkProvider>
  );
}
