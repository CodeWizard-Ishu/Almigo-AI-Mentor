import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Map,
  FileText,
  Users,
  GraduationCap,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    to: "/",
    icon: MessageSquare,
    label: "Chat",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    to: "/roadmap",
    icon: Map,
    label: "Roadmap",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    to: "/summarize",
    icon: FileText,
    label: "Summarize",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    to: "/search",
    icon: Users,
    label: "Search Mentors",
    gradient: "from-blue-500 to-cyan-600",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full z-50 w-64 bg-card border-r flex flex-col transition-transform duration-300",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">Almigo</h1>
              <p className="text-[10px] text-muted-foreground leading-tight">
                AI Mentor
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      isActive
                        ? "bg-white/20"
                        : `bg-gradient-to-br ${item.gradient} text-white`
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t flex items-center justify-between">
          <span className="text-xs text-muted-foreground">v1.0</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
