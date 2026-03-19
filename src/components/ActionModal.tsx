"use client";

import { AlertCircle, CheckCircle2, Pencil, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ActionModal({ isOpen, onClose, product }: { isOpen: boolean, onClose: () => void, product: any }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 300); // Wait for transition
    }
  }, [isOpen]);

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
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-300" />
              )}
            </div>
            <div>
              <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight mb-2 tracking-tight">{product.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-extrabold text-base">${product.price.toFixed(2)}</span>
                <span className="text-slate-300 mx-1">•</span>
                <span className={`${product.status === 'low' ? 'text-red-500 bg-red-50' : 'text-brand-600 bg-brand-50'} text-[13px] font-extrabold flex items-center gap-1.5 px-2 py-0.5 rounded-md`}>
                  <AlertCircle className="w-4 h-4" /> Stock: {product.stock}
                </span>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-extrabold py-5 rounded-[24px] text-xl shadow-[0_12px_30px_rgba(16,185,129,0.3)] flex justify-center items-center gap-3 active:scale-[0.98] transition-all mb-4"
        >
          <CheckCircle2 className="w-7 h-7" />
          Registrar 1 Venta
        </button>

        <button 
          onClick={onClose}
          className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-4 rounded-[20px] text-[15px] flex justify-center items-center gap-2 transition-colors active:scale-[0.98]"
        >
          <Pencil className="w-4 h-4 text-slate-400" />
          Editar producto
        </button>
      </div>
    </>
  );
}
