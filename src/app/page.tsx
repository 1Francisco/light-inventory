import BottomNav from "@/components/BottomNav";
import { TrendingUp, ArrowUp, ShoppingBag, Package, AlertTriangle, ChevronRight, LogOut } from "lucide-react";
import { getDashboardStats } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { signout } from "./login/actions";
import { getProfile } from "./settings/actions";

export default async function Dashboard() {
  const stats = await getDashboardStats();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const profile = await getProfile();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-6 pt-16 pb-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-slate-400 text-sm font-semibold mb-1">{profile?.business_name || 'Tu Negocio'}</p>
            <h2 className="text-[28px] font-extrabold text-slate-900 tracking-tight">Hola 👋</h2>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[150px]">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <form action={signout}>
              <button className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </form>
            <div className="w-12 h-12 bg-brand-100 rounded-full flex justify-center items-center overflow-hidden border-4 border-white shadow-sm shrink-0">
              <img src={`https://ui-avatars.com/api/?name=${user?.email || 'A'}&background=d1fae5&color=059669&bold=true`} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wide">Ganancia neta hoy</h3>
              <div className="bg-brand-50 p-2.5 rounded-[14px] text-brand-500">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[40px] font-extrabold text-slate-900 mb-1 tracking-tight">${stats.netProfit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-wide mb-1">Ventas hoy</p>
              <p className="text-3xl font-extrabold text-slate-900">{stats.salesCount}</p>
            </div>
            
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1">
              <div className="bg-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-500 mb-4">
                <Package className="w-6 h-6" />
              </div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-wide mb-1">Alerta Stock</p>
              <p className="text-3xl font-extrabold text-slate-900">{stats.lowStockCount}</p>
            </div>
          </div>

          {stats.lowStockCount > 0 && (
            <div className="mt-2 bg-orange-50 rounded-[28px] p-5 border border-orange-100/60 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all">
              <div className="bg-orange-100 p-3 rounded-2xl text-orange-500 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-orange-900 font-extrabold mb-0.5 text-[15px]">Atención de Stock</p>
                <p className="text-orange-700/80 text-sm font-bold">{stats.lowStockCount} productos casi agotados</p>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-300" />
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
