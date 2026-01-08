import { LucideIcon } from "lucide-react";

export type SidebarChild = {
  title: string;
  href: string;
  children?: SidebarChild[];
};

export type SidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon; 
  children?: SidebarChild[];
};