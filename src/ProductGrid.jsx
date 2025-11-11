import { useEffect, useState } from "react";

function ProductCard({ p, onAdd }) {
  return (
    <div className="group rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="aspect-square overflow-hidden">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold leading-tight">{p.title}</h3>
          <span className="font-bold">${p.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
        {p.sizes?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {p.sizes.map((s) => (
              <span key={s} className="px-2 py-1 text-xs rounded border">{s}</span>
            ))}
          </div>
        )}
        <button onClick={() => onAdd(p)} className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-black/90">Add to cart</button>
      </div>
    </div>
  );
}

export default function ProductGrid({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
        const res = await fetch(`${base}/api/products?category=${category}`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  if (loading) return <p className="text-center text-gray-500">Loading {category}...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} onAdd={(prod) => console.log("add", prod)} />
      ))}
    </div>
  );
}
