"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TabProps {
  tabs: {
    id: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
  }[];
  defaultTab?: string;
  className?: string;
}

export const Tab = ({ tabs, defaultTab, className }: TabProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200",
              activeTab === tab.id
                ? "text-purple-500 border-b-2 border-purple-500 bg-purple-500/10"
                : "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "transition-all duration-200",
              activeTab === tab.id ? "block opacity-100" : "hidden opacity-0"
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}; 