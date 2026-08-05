"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const user = useAuth((s) => s.user);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  if (!user) return null;

  return children;
}