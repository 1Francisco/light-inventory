"use client";

import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "@/app/actions";
import { Loader2 } from "lucide-react";

export default function CreateProductModal({ isOpen, onClose, initialData }: { isOpen: boolean, onClose: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (initialData && isOpen) {
      setName(initialData.name);
      setPrice(initialData.price.toString());
      setStock(initialData.stock.toString());
    } else if (!initialData && isOpen) {
      setName(""); setPrice(""); setStock("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (initialData) {
      await updateProduct(initialData.id, name, Number(price), Number(stock));
    } else {
      await createProduct(name, Number(price), Number(stock));
    }
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[3px]" onClick={onClose} />
      <div className="bg-white rounded-[32px] w-full max-w-md p-6 relative shadow-2xl z-10">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">{initialData ? "Editar Producto" : "Nuevo Producto"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nombre</label>
            <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-medium" placeholder="Funda iPhone..." />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Precio ($)</label>
              <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-medium" placeholder="200" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Stock Inicial</label>
              <input required type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-medium" placeholder="10" />
            </div>
          </div>
          <button disabled={loading} type="submit" className="w-full mt-4 bg-brand-500 disabled:opacity-50 hover:bg-brand-600 text-white font-bold py-4 rounded-[20px] text-[15px] shadow-[0_8px_30px_rgba(16,185,129,0.3)] flex justify-center items-center transition-all active:scale-[0.98]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
}
