import { LucideIcon } from "lucide-react";

export type SidebarChild = {
  title: string;
  href: string;
};

export type SidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon; 
  children?: SidebarChild[];
};