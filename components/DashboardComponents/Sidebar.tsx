"use client";

import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MapPin, 
  Settings, 
  Flag, 
  LogOut
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Geral", path: "/dashboard" },
  { icon: Calendar, label: "Eventos", path: "/dashboard/events" },
  { icon: Flag, label: "Denúncias", path: "/dashboard/reports" },
  { icon: Users, label: "Usuários", path: "/dashboard/users" },
  { icon: MapPin, label: "Locais", path: "/dashboard/venues" },
  { icon: Settings, label: "Configurações", path: "/dashboard/settings" },
];

export function Sidebar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="w-60 h-screen bg-sidebar flex flex-col sticky top-0 text-sidebar-foreground">
      
      <div className="p-8">
        <div className="text-2xl font-extrabold text-white tracking-tighter">
          Eventus<span className="text-primary">.</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors rounded-lg ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-800/50 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gray-800/30 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.charAt(0)}
            </div>

            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {user?.name}
              </p>
              <p className="text-[10px] text-sidebar-foreground uppercase font-bold tracking-widest">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-3 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}