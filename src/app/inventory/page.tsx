import BottomNav from "@/components/BottomNav";
import InventoryClient from "./InventoryClient";
import { getProducts } from "../actions";

export default async function Inventory() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <div className="px-6 pt-16 pb-2 bg-slate-50 z-10 sticky top-0">
        <h2 className="text-[28px] font-extrabold text-slate-900 tracking-tight">Inventario</h2>
      </div>

      <InventoryClient initialProducts={products} />
      
      <BottomNav />
    </div>
  );
}
