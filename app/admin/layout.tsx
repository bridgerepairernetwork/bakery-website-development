import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth";
import AdminProtected from "@/components/admin/admin-protected";
import { Epilogue } from "next/font/google";

import "../globals.css";

const epilogue = Epilogue({ subsets: ["latin"], variable: "--font-epilogue" });

export const metadata: Metadata = {
  title: "Perfect White Admin | Portfolio Management",
  description: "Manage Perfect Whites artisanal showcase and portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={epilogue.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          <div className="flex h-screen bg-background">
            <main className="flex-1 flex flex-col overflow-hidden">
              <AdminProtected>{children}</AdminProtected>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
