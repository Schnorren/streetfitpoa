import { useMemo, useState } from "react";
import { Search, Zap, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductDialog } from "@/components/ProductDialog";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import {
  Product,
  Category,
  categoryLabels,
  categoryEmoji,
} from "@/types/product";

type Filter = "todos" | Category;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "jaquetas", label: categoryLabels.jaquetas },
  { id: "calcas", label: categoryLabels.calcas },
  { id: "camisetas", label: categoryLabels.camisetas },
  { id: "calcados", label: categoryLabels.calcados },
];

const Index = () => {
  const { products, loading } = useProducts();
  const { isAdmin } = useAuth();
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "todos" || p.category === filter;
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, filter, search]);

  const grouped = useMemo(() => {
    if (filter !== "todos") return null;
    const map = new Map<Category, Product[]>();
    filtered.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    });
    return map;
  }, [filtered, filter]);

  const handleSelect = (p: Product) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container flex items-center justify-between gap-4 py-4">
          <a href="#" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" strokeWidth={2.5} />
            <span className="font-display text-2xl tracking-wider text-foreground">
              STREET<span className="text-primary">FIT</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {filters.slice(1).map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-smooth hover:text-primary"
              >
                {f.label}
              </button>
            ))}
            <Link
              to={isAdmin ? "/admin" : "/auth"}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-smooth hover:text-primary"
            >
              <Lock className="h-3.5 w-3.5" />
              {isAdmin ? "Admin" : "Entrar"}
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero">
        <div className="container relative py-16 md:py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Coleção 2025
          </p>
          <h1 className="font-display text-5xl leading-[0.9] text-foreground md:text-7xl lg:text-8xl">
            Streetwear &
            <br />
            <span className="text-primary">Sportwear</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Peças originais Nike, adidas, Oakley, Fila e Kappa. Atitude, conforto e
            estilo para quem vive em movimento.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              {products.length} peças disponíveis
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Entrega para todo o Brasil
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      </section>

      <section className="sticky top-[65px] z-20 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="container flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                key={f.id}
                variant={filter === f.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f.id)}
                className={
                  filter === f.id
                    ? "bg-primary font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                    : "border-border/70 font-semibold uppercase tracking-wider text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }
              >
                {f.label}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar peça ou marca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border/70 bg-secondary/50 pl-9"
            />
          </div>
        </div>
      </section>

      <main className="container py-10 md:py-14">
        {loading ? (
          <div className="py-20 text-center text-muted-foreground">Carregando catálogo...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-3xl text-muted-foreground">
              Nenhuma peça encontrada
            </p>
          </div>
        ) : grouped ? (
          <div className="space-y-14">
            {(["jaquetas", "calcas", "camisetas", "calcados"] as Category[]).map(
              (cat) => {
                const list = grouped.get(cat);
                if (!list || list.length === 0) return null;
                return (
                  <section key={cat} id={cat}>
                    <div className="mb-6 flex items-end justify-between border-b border-border/60 pb-3">
                      <h2 className="font-display text-3xl text-foreground md:text-4xl">
                        <span className="mr-2">{categoryEmoji[cat]}</span>
                        {categoryLabels[cat]}
                      </h2>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {list.length} {list.length === 1 ? "peça" : "peças"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {list.map((p) => (
                        <ProductCard key={p.id} product={p} onClick={() => handleSelect(p)} />
                      ))}
                    </div>
                  </section>
                );
              }
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => handleSelect(p)} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border/60 bg-secondary/30">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="font-display text-lg tracking-wider text-foreground">
            STREET<span className="text-primary">FIT</span>
          </p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            © 2025 — Catálogo digital
          </p>
        </div>
      </footer>

      <ProductDialog product={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Index;
