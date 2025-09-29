"use client";

import * as React from "react";
import { Outlet } from "@tanstack/react-router";
import Header from "./Header";
import { MadeWithApplaa } from "@/components/made-with-applaa";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        {children || <Outlet />}
      </main>
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <MadeWithApplaa />
        </div>
      </footer>
    </div>
  );
};

export default Layout;