"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import AdminHeader from "@/components/admin/admin-header";
import AdminGrid from "@/components/admin/admin-grid";
import AdminForm from "@/components/admin/admin-form";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { logout } = useAuth();

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
      <AdminHeader
        onAddClick={() => setShowForm(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onLogout={logout}
      />

      <div className="flex-1 overflow-hidden flex lg:flex-row flex-col">
        <AdminGrid viewMode={viewMode} />

        {/* Form Drawer */}
        {showForm && <AdminForm onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
}
