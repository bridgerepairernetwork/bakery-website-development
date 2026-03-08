"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import AdminLogin from "@/components/admin/admin-login";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  console.log("user: ", user, "\nloading:", loading);

  if (!loading && !user) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}
