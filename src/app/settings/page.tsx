import BottomNav from "@/components/BottomNav";
import { LogOut, CheckCircle, CreditCard, Building } from "lucide-react";
import { signout } from "../login/actions";
import { getProfile, updateProfile, createCheckoutSession, createPortalSession } from "./actions";

export default async function SettingsPage() {
  const profile = await getProfile()

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <div className="px-6 pt-16 pb-4 bg-slate-50 z-10 sticky top-0">
        <h2 className="text-[28px] font-extrabold text-slate-900 mb-2 tracking-tight">Ajustes</h2>
        <p className="text-slate-500 font-medium text-sm">Gestiona tu negocio y suscripción SaaS</p>
      </div>

      <div className="px-6 flex flex-col gap-6 mt-4">
        {/* Profile Section */}
        <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-2.5 rounded-[14px] text-blue-500">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">Datos del Negocio</h3>
           </div>
           
           <form action={updateProfile} className="flex flex-col gap-4">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-1.5">Nombre del Negocio</label>
               <input 
                 name="business_name"
                 defaultValue={profile?.business_name || ''}
                 className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium" 
                 placeholder="Ej. Zapatería Paco" 
                 required 
               />
             </div>
             <button type="submit" className="self-end bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all active:scale-[0.98]">
               Guardar Cambios
             </button>
           </form>
        </div>

        {/* Subscription Section */}
        <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-brand-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-0 opacity-50"></div>
           
           <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-brand-50 p-2.5 rounded-[14px] text-brand-500">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">Plan de Suscripción</h3>
           </div>

           <div className="relative z-10">
             {profile?.is_pro ? (
               <div>
                  <div className="flex items-center gap-2 mb-2 text-brand-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">Plan PRO Activo</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6">Tienes acceso ilimitado a todas las herramientas de gestión de inventario como SaaS.</p>
                  
                  <form action={createPortalSession}>
                    <button className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl text-[15px] transition-all active:scale-[0.98]">
                      Administrar Suscripción
                    </button>
                  </form>
               </div>
             ) : (
               <div>
                  <div className="mb-2">
                    <span className="font-bold text-slate-900">Plan Gratuito</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6">Actualiza a la versión PRO para desbloquear funcionalidad ilimitada (Pagos Reales vía Stripe).</p>
                  
                  <form action={createCheckoutSession}>
                    <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-2xl text-[15px] shadow-[0_8px_30px_rgba(16,185,129,0.3)] flex justify-center items-center transition-all active:scale-[0.98]">
                      Mejorar a PRO
                    </button>
                  </form>
               </div>
             )}
           </div>
        </div>

        {/* Logout Section */}
        <div className="mt-4">
           <form action={signout}>
             <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-2xl text-[15px] flex justify-center items-center gap-2 transition-all active:scale-[0.98]">
               <LogOut className="w-5 h-5" />
               Cerrar Sesión
             </button>
           </form>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
