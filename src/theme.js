import {
  LayoutDashboard, Receipt, PieChart as PieIcon, Target, BarChart3, Settings as SettingsIcon,
} from "lucide-react";

export const THEME = {
  dark: {
    bg: "#111111", surface: "#171717", surfaceAlt: "rgba(26,26,26,0.65)",
    primary: "#3B82F6", success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
    text: "#F1F5F9", textMuted: "#94A3B8", border: "rgba(148,163,184,0.14)",
    track: "rgba(148,163,184,0.15)",
  },
  light: {
    bg: "#F8FAFC", surface: "#FFFFFF", surfaceAlt: "rgba(255,255,255,0.75)",
    primary: "#2563EB", success: "#059669", warning: "#D97706", danger: "#DC2626",
    text: "#0F172A", textMuted: "#64748B", border: "rgba(15,23,42,0.08)",
    track: "rgba(15,23,42,0.06)",
  },
};

export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, subtitle: "Welcome back, here's your financial overview." },
  { key: "transactions", label: "Transactions", icon: Receipt, subtitle: "Search, filter, and manage every transaction." },
  { key: "budgets", label: "Budgets", icon: PieIcon, subtitle: "See how your spending stacks up against each budget." },
  { key: "goals", label: "Savings Goals", icon: Target, subtitle: "Track progress toward what you're saving for." },
  { key: "reports", label: "Reports", icon: BarChart3, subtitle: "A closer look at your income and spending trends." },
  { key: "settings", label: "Settings", icon: SettingsIcon, subtitle: "Manage your profile, currency, and preferences." },
];