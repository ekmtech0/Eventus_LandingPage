import "../globals.css";
import { Sidebar } from "@/components/DashboardComponents/Sidebar";
import { AuthProvider } from "@/hooks/useAuth";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-white text-slate-900">
        <Sidebar />
        <main className="pt-10 px-8 flex-1 mx-auto justify-center">{children}</main>
      </div>
    </AuthProvider>
  );
}
