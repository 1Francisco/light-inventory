"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PackageSearch, Settings } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-between items-center pb-8 z-50">
      <Link href="/" className={`flex flex-col items-center gap-1.5 cursor-pointer w-16 transition-colors ${pathname === "/" ? "text-brand-500" : "text-slate-400 hover:text-slate-900"}`}>
        <div className={`p-1.5 rounded-xl ${pathname === "/" ? "bg-brand-50" : ""}`}>
          <Home className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold">Inicio</span>
      </Link>
      
      <Link href="/inventory" className={`flex flex-col items-center gap-1.5 cursor-pointer w-16 transition-colors ${pathname === "/inventory" ? "text-brand-500" : "text-slate-400 hover:text-slate-900"}`}>
        <div className={`p-1.5 rounded-xl ${pathname === "/inventory" ? "bg-brand-50" : ""}`}>
          <PackageSearch className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold">Inventario</span>
      </Link>
      
      <Link href="/settings" className={`flex flex-col items-center gap-1.5 cursor-pointer w-16 transition-colors ${pathname === "/settings" ? "text-brand-500" : "text-slate-400 hover:text-slate-900"}`}>
        <div className={`p-1.5 rounded-xl ${pathname === "/settings" ? "bg-brand-50" : ""}`}>
          <Settings className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold">Ajustes</span>
      </Link>
    </div>
  );
}
