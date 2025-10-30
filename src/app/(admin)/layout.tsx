import AdminSidebar from "@/components/layout/AdminSidebar";
import { AdminGuard } from "@/components/layout/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="admin-layout flex h-screen bg-muted/30">
        <AdminSidebar />
        <main className="flex-1 ml-64 overflow-y-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}

