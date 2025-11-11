import { ShoppingCart, Shirt } from "lucide-react";

export default function Header({ onCartClick }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-black text-white grid place-items-center">
            <span className="font-bold">dy</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight">dyfn</span>
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#tshirts" className="hover:text-black/80 text-black/60 flex items-center gap-2">
            <Shirt className="h-4 w-4" /> T‑Shirts
          </a>
          <a href="#hoodies" className="hover:text-black/80 text-black/60">Hoodies</a>
          <button onClick={onCartClick} className="relative inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-gray-50">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
