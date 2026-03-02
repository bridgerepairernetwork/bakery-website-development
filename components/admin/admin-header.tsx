import { LayoutGrid, List, Search, Plus } from "lucide-react";

interface AdminHeaderProps {
  onAddClick: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onLogout?: () => void;
}

export default function AdminHeader({
  onAddClick,
  viewMode,
  onViewModeChange,
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-8 shrink-0">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Portfolio Management
        </h2>
        <p className="text-sm text-slate-500">
          Curate and manage Perfect Whites artisanal showcase
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search creations..."
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-primary focus:border-primary w-64 outline-none transition-all"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="bg-accent hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Add New Creation
        </button>
      </div>

      {/* Logout Button (if provided) */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="ml-6 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition"
        >
          Logout
        </button>
      )}

      {/* View Mode Toggle */}
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 rounded-lg transition-all ${
            viewMode === "grid"
              ? "bg-white shadow-sm border border-slate-200 text-slate-900"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-2 rounded-lg transition-all ${
            viewMode === "list"
              ? "bg-white shadow-sm border border-slate-200 text-slate-900"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
