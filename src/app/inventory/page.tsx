"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import ActionModal from "@/components/ActionModal";
import { Search, Plus, Image as ImageIcon } from "lucide-react";

export default function Inventory() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 1,
      name: "Termo Aesthetic 500ml",
      price: 350,
      stock: 15,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=200&h=200",
      status: "healthy"
    },
    {
      id: 2,
      name: "Funda iPhone 15 Pro",
      price: 200,
      stock: 2,
      image: "https://images.unsplash.com/photo-1588636402446-2dcdb21d582c?auto=format&fit=crop&q=80&w=200&h=200",
      status: "low"
    },
    {
      id: 3,
      name: "Aro de luz LED 12\"",
      price: 450,
      stock: 8,
      image: null,
      status: "healthy"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <div className="px-6 pt-16 pb-4 bg-slate-50 z-10 sticky top-0">
        <h2 className="text-[28px] font-extrabold text-slate-900 mb-6 tracking-tight">Inventario</h2>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o SKU..." 
            className="w-full bg-white border-2 border-slate-100 text-slate-900 text-[15px] rounded-[20px] pl-12 pr-4 py-4 focus:outline-none focus:ring-0 focus:border-brand-500 shadow-sm transition-all placeholder:text-slate-400 font-semibold"
          />
        </div>
        <div className="flex gap-2.5 mt-5 overflow-x-auto no-scrollbar pb-2">
          <span className="px-5 py-2 bg-slate-900 text-white text-[13px] font-bold rounded-full whitespace-nowrap shadow-md">Todos</span>
          <span className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-[13px] font-bold rounded-full whitespace-nowrap cursor-pointer transition-colors shadow-sm">Casi agotados</span>
          <span className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-[13px] font-bold rounded-full whitespace-nowrap cursor-pointer transition-colors shadow-sm">Nuevos</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-2">
        <div className="flex flex-col gap-3.5">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="bg-white p-3.5 rounded-[24px] flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 active:scale-[0.98]"
            >
              <div className="w-16 h-16 rounded-[18px] bg-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-50">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <div className="flex-1 min-w-0 py-1">
                <h3 className="text-slate-900 font-extrabold truncate text-[16px] mb-0.5">{product.name}</h3>
                <p className="text-slate-400 text-sm font-bold mb-2">${product.price.toFixed(2)}</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide border ${
                  product.status === 'low' 
                    ? 'bg-red-50 text-red-600 border-red-100' 
                    : 'bg-green-50 text-brand-600 border-green-100'
                }`}>
                  Stock: {product.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[108px] right-6 z-40 md:absolute md:right-auto md:left-1/2 md:translate-x-32 md:bottom-[108px]">
        <button className="w-[64px] h-[64px] bg-brand-500 rounded-[22px] flex items-center justify-center text-white shadow-[0_12px_30px_rgba(16,185,129,0.4)] hover:scale-105 hover:bg-brand-600 active:scale-95 transition-all">
          <Plus className="w-8 h-8" />
        </button>
      </div>

      <ActionModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
      
      <BottomNav />
    </div>
  );
}
