import { Product } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shirt } from "lucide-react";

interface Props {
  product: Product;
  onClick: () => void;
}

const brandClass: Record<string, string> = {
  Nike: "bg-brand-nike text-background",
  adidas: "bg-brand-adidas text-background",
  Oakley: "bg-brand-oakley text-foreground",
  Fila: "bg-brand-fila text-foreground",
  Kappa: "bg-brand-kappa text-foreground",
};

export const ProductCard = ({ product, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-border/60 bg-gradient-card shadow-card transition-smooth hover:border-primary/60 hover:shadow-glow"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
            <Shirt className="h-16 w-16 opacity-30" strokeWidth={1.2} />
          </div>
        )}
        <Badge
          className={`absolute left-3 top-3 ${brandClass[product.brand]} font-bold uppercase tracking-wider`}
        >
          {product.brand}
        </Badge>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight text-foreground">
          {product.name}
          {product.color && (
            <span className="text-muted-foreground"> — {product.color}</span>
          )}
        </h3>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              R$
            </p>
            <p className="font-display text-3xl leading-none text-primary">
              {product.price}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-1">
            {product.sizes.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded border border-border/70 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};