import { login, signup } from './actions'

export default async function LoginPage(props: { searchParams: Promise<{ message?: string }> }) {
  const params = await props.searchParams;
  return (
    <div className="flex flex-col min-h-screen pt-24 px-6 md:px-0 max-w-sm mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-2">Inventario Ligero 📦</h1>
        <p className="text-slate-500 font-medium">Inicia sesión para gestionar tu negocio</p>
      </div>

      <form className="flex flex-col gap-4 bg-white p-6 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="email">Correo electrónico</label>
          <input className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium" id="email" name="email" type="email" placeholder="tu@email.com" required />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="password">Contraseña</label>
          <input className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium" id="password" name="password" type="password" placeholder="••••••••" required />
        </div>
        
        {params?.message && (
          <p className="text-sm font-bold text-red-500 text-center mb-2 bg-red-50 py-2 rounded-lg">{params.message}</p>
        )}

        <button formAction={login} className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-[20px] text-[15px] shadow-[0_8px_30px_rgba(16,185,129,0.3)] flex justify-center items-center transition-all active:scale-[0.98]">
          Iniciar sesión
        </button>
        <button formAction={signup} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3.5 rounded-[20px] text-[15px] flex justify-center items-center transition-all active:scale-[0.98] border border-slate-200">
          Crear cuenta nueva
        </button>
      </form>
    </div>
  )
}
