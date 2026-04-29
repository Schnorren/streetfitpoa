export type Category = "jaquetas" | "calcas" | "camisetas" | "calcados";
export type Brand = string;

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  description: string;
  color?: string | null;
  image_url?: string | null;
  sizes: string[];
  sort_order: number;
  active: boolean;
  stock: Record<string, number>;
}

export const categoryLabels: Record<Category, string> = {
  jaquetas: "Jaquetas & Blusões",
  calcas: "Calças",
  camisetas: "Camisetas",
  calcados: "Calçados",
};

export const categoryEmoji: Record<Category, string> = {
  jaquetas: "🧥",
  calcas: "👖",
  camisetas: "👕",
  calcados: "👟",
};

export const availableSizes = (p: Product): string[] =>
  p.sizes.filter((s) => (p.stock[s] ?? 0) > 0);

export const totalStock = (p: Product): number =>
  Object.values(p.stock).reduce((a, b) => a + b, 0);

export const hasStockInfo = (p: Product): boolean =>
  Object.keys(p.stock).length > 0;
