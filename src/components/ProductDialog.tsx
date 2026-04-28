import { Product, availableSizes, totalStock } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shirt } from "lucide-react";

interface Props {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDialog = ({ product, open, onOpenChange }: Props) => {
  if (!product) return null;
  const hasStockInfo = product.stock !== undefined;
  const sizes = hasStockInfo ? availableSizes(product) : product.sizes;
  const total = totalStock(product);
  const outOfStock = hasStockInfo && sizes.length === 0;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden border-border/70 bg-card p-0">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-square bg-secondary md:aspect-auto">
            {product.image ? (
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Shirt className="h-32 w-32 text-muted-foreground/30" strokeWidth={1} />
              </div>
            )}
            <Badge className="absolute left-4 top-4 bg-primary font-bold uppercase tracking-wider text-primary-foreground">
              {product.brand}
            </Badge>
          </div>

          <div className="flex flex-col gap-5 p-6 md:p-8">
            <DialogHeader className="space-y-2 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {product.brand}
              </p>
              <DialogTitle className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                {product.name}
                {product.color && (
                  <span className="block text-base font-normal text-muted-foreground">
                    {product.color}
                  </span>
                )}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-lg border border-border/60 bg-secondary/40 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Preço</p>
              <p className="font-display text-5xl text-primary">
                R$ {product.price}
                <span className="ml-1 text-base text-muted-foreground">,00</span>
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {hasStockInfo && outOfStock ? "Estoque" : "Tamanhos disponíveis"}
              </p>
              {outOfStock ? (
                <p className="rounded-md border border-border/70 bg-background px-3 py-2 text-sm font-semibold text-muted-foreground">
                  Esgotado
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <span
                      key={s}
                      className="min-w-[2.5rem] rounded-md border border-border/70 bg-background px-3 py-2 text-center text-sm font-semibold text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-auto text-xs text-muted-foreground">
              💬 Para comprar, entre em contato pelas redes sociais.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};