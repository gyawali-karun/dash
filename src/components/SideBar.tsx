import { Home, BarChart3, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "data", label: "Data", icon: BarChart3, path: "/data" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <span className="text-sidebar-primary-foreground font-bold">D</span>
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground">Dashboard</h1>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-sidebar-border">
        <p className="text-sm text-sidebar-foreground/60">
          © 2025 Dashboard App
        </p>
      </div>
    </aside>
  );
}
