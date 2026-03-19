"use client";

import { useState } from "react";
import { Plus, Image as ImageIcon, Search } from "lucide-react";
import ActionModal from "@/components/ActionModal";
import CreateProductModal from "@/components/CreateProductModal";

export default function InventoryClient({ initialProducts }: { initialProducts: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all"|"low">("all");

  const displayedProducts = initialProducts.filter(p => {
    if (filter === "low" && p.stock > 3) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="px-6 pb-2 bg-slate-50 z-10 sticky top-[72px]">
        <div className="relative mt-2">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text" 
            placeholder="Buscar por nombre..." 
            className="w-full bg-white border border-slate-200 text-slate-900 text-[15px] rounded-[20px] pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:border-brand-500 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
        <div className="flex gap-2.5 mt-4 overflow-x-auto no-scrollbar pb-3">
          <span 
            onClick={() => setFilter('all')} 
            className={`px-5 py-2.5 ${filter === 'all' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'} text-[13px] font-bold rounded-full cursor-pointer shadow-sm transition-all`}
          >
            Todos
          </span>
          <span 
            onClick={() => setFilter('low')} 
            className={`px-5 py-2.5 ${filter === 'low' ? 'bg-brand-500 text-white' : 'bg-white border text-slate-600'} text-[13px] font-bold rounded-full cursor-pointer shadow-sm transition-all`}
          >
            Casi agotados
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-2">
        <div className="flex flex-col gap-3.5">
          {displayedProducts.length === 0 && (
            <div className="text-center py-10 text-slate-500 font-medium">No se encontraron productos.</div>
          )}
          {displayedProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="bg-white p-3.5 rounded-[24px] flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 active:scale-[0.98]"
            >
              <div className="w-16 h-16 rounded-[18px] bg-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-50">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <div className="flex-1 min-w-0 py-1">
                <h3 className="text-slate-900 font-extrabold truncate text-[16px] mb-0.5">{product.name}</h3>
                <p className="text-slate-400 text-sm font-bold mb-2">${Number(product.price).toFixed(2)}</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide border ${
                  product.stock <= 3 
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
        <button 
          onClick={() => { setSelectedProduct(null); setIsCreateOpen(true); }}
          className="w-[64px] h-[64px] bg-brand-500 rounded-[22px] flex items-center justify-center text-white shadow-[0_12px_30px_rgba(16,185,129,0.4)] hover:scale-105 hover:bg-brand-600 active:scale-95 transition-all"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>

      <ActionModal 
        isOpen={!!selectedProduct && !isCreateOpen} 
        onClose={() => setSelectedProduct(null)} 
        onEdit={() => setIsCreateOpen(true)}
        product={selectedProduct} 
      />

      <CreateProductModal 
        isOpen={isCreateOpen}
        onClose={() => { setIsCreateOpen(false); setSelectedProduct(null); }}
        initialData={selectedProduct}
      />
    </>
  );
}
