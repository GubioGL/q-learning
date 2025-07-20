"use client"

import React from "react";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/ui/SidebarContent";

export const Sidebar = () => (
  <SheetContent side="left" className="w-[280px] bg-[#1a1a1a] text-white">
    <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
    <SidebarContent />
  </SheetContent>
); 