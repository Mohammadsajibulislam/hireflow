"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/types/user";

interface UseRequireAuthOptions {
  allowedRoles?: UserRole[]; // না দিলে যেকোনো লগইন করা ইউজার ঢুকতে পারবে
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return; // এখনো session লোড হচ্ছে, কিছু করার দরকার নেই

    if (!session) {
      // Requirement: "Only accessible when logged in; redirect others to /login"
      router.push("/login");
      return;
    }

    const role = session.user.role as UserRole;

    if (options.allowedRoles && !options.allowedRoles.includes(role)) {
      // লগইন করা আছে, কিন্তু সঠিক role নেই — হোমপেজে পাঠানো
      router.push("/");
    }
  }, [session, isPending, router, options.allowedRoles]);

  return { session, isPending };
}