"use client";

import { AlertCircle, Loader2, CheckCircle2, Pencil, Image as ImageIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { registerSale, deleteProduct } from "@/app/actions";

export default function ActionModal({ isOpen, onClose, onEdit, product }: { isOpen: boolean, onClose: () => void, onEdit: () => void, product: any }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 300);
    }
  }, [isOpen]);

  const handleSale = async () => {
    setLoading(true);
    await registerSale(product.id, 1, Number(product.price));
    setLoading(false);
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm("¿Seguro que quieres eliminar este producto? Esta acción no se puede deshacer.")) {
      setLoading(true);
      await deleteProduct(product.id);
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen && !show) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed bottom-0 left-0 w-full max-w-md bg-white rounded-t-[40px] z-[70] px-6 pt-5 pb-10 shadow-[0_-20px_40px_rgba(0,0,0,0.12)] transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} md:left-1/2 md:-translate-x-1/2`}
      >
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
        
        {product && (
          <div className="flex items-center gap-5 mb-10">
            <div className="w-[84px] h-[84px] rounded-[20px] bg-slate-50 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-300" />
              )}
            </div>
            <div>
              <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight mb-2 tracking-tight">{product.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-extrabold text-base">${Number(product.price).toFixed(2)}</span>
                <span className="text-slate-300 mx-1">•</span>
                <span className={`${product.stock <= 3 ? 'text-red-500 bg-red-50' : 'text-brand-600 bg-brand-50'} text-[13px] font-extrabold flex items-center gap-1.5 px-2 py-0.5 rounded-md`}>
                  <AlertCircle className="w-4 h-4" /> Stock: {product.stock}
                </span>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={handleSale}
          disabled={loading || product?.stock < 1}
          className="w-full bg-brand-500 disabled:opacity-50 hover:bg-brand-600 text-white font-extrabold py-4 rounded-[20px] text-[18px] shadow-[0_12px_30px_rgba(16,185,129,0.3)] flex justify-center items-center gap-3 active:scale-[0.98] transition-all mb-3"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
          {product?.stock < 1 ? "Agotado" : "Registrar 1 Venta"}
        </button>

        <div className="flex gap-3 mb-4">
          <button 
            onClick={() => { onClose(); onEdit(); }}
            disabled={loading}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3.5 rounded-[16px] text-[15px] flex justify-center items-center gap-2 transition-colors active:scale-[0.98]"
          >
            <Pencil className="w-4 h-4" />
            Editar
          </button>
          
          <button 
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 rounded-[16px] text-[15px] flex justify-center items-center gap-2 transition-colors active:scale-[0.98]"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>

        <button 
          onClick={onClose}
          disabled={loading}
          className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-4 rounded-[20px] text-[15px] flex justify-center items-center transition-colors active:scale-[0.98]"
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
