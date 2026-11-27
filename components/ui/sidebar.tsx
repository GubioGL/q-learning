"use client"

import React from "react";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useT } from "@/lib/i18n/context";
import { SidebarContent } from "@/components/ui/SidebarContent";

export const Sidebar = () => {
  const { nav } = useT();
  return (
  <SheetContent side="left" className="w-[280px] bg-(--ql-bg) text-gray-50">
    <SheetTitle className="sr-only">{nav.menuTitle}</SheetTitle>
    <SidebarContent />
  </SheetContent>
  );
}; 