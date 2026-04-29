import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product, Category } from "@/types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: prods } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    const { data: stocks } = await supabase
      .from("product_stock")
      .select("*");

    const stockMap = new Map<string, Record<string, number>>();
    (stocks ?? []).forEach((s) => {
      const cur = stockMap.get(s.product_id) ?? {};
      cur[s.size] = s.quantity;
      stockMap.set(s.product_id, cur);
    });

    const merged: Product[] = (prods ?? []).map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category as Category,
      price: Number(p.price),
      description: p.description ?? "",
      color: p.color,
      image_url: resolveImage(p.image_url),
      sizes: p.sizes ?? [],
      sort_order: p.sort_order,
      active: p.active,
      stock: stockMap.get(p.id) ?? {},
    }));
    setProducts(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, reload: load };
};

// Mantém compatibilidade com fotos antigas (caminhos /src/assets/...) usando importação dinâmica via Vite glob
const assetMap = import.meta.glob("/src/assets/products/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const resolveImage = (url: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/src/assets/")) {
    return assetMap[url] ?? null;
  }
  return url;
};
