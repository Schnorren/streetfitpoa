import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2, Pencil, LogOut, Upload, Save, X, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { Product, Category, categoryLabels } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface FormState {
  id?: string;
  name: string;
  brand: string;
  category: Category;
  price: string;
  color: string;
  description: string;
  sizes: string;
  image_url: string;
  stock: Record<string, number>;
}

const empty: FormState = {
  name: "",
  brand: "Nike",
  category: "jaquetas",
  price: "",
  color: "",
  description: "",
  sizes: "P,M,G,GG",
  image_url: "",
  stock: {},
};

const Admin = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { products, reload } = useProducts();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) nav("/auth");
  }, [user, isAdmin, loading, nav]);

  const openNew = () => {
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: String(p.price),
      color: p.color ?? "",
      description: p.description,
      sizes: p.sizes.join(","),
      image_url: p.image_url ?? "",
      stock: { ...p.stock },
    });
    setOpen(true);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Foto enviada!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const sizesArr = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);
      const slug = form.id
        ? undefined
        : form.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .slice(0, 60) + "-" + Math.random().toString(36).slice(2, 6);

      const payload = {
        name: form.name,
        brand: form.brand,
        category: form.category,
        price: Number(form.price),
        color: form.color || null,
        description: form.description,
        sizes: sizesArr,
        image_url: form.image_url || null,
      };

      let productId = form.id;
      if (form.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert({ ...payload, slug: slug! })
          .select("id")
          .single();
        if (error) throw error;
        productId = data.id;
      }

      // Stock: replace all rows
      await supabase.from("product_stock").delete().eq("product_id", productId!);
      const stockRows = Object.entries(form.stock)
        .filter(([_, q]) => q > 0)
        .map(([size, quantity]) => ({ product_id: productId!, size, quantity }));
      if (stockRows.length) {
        const { error } = await supabase.from("product_stock").insert(stockRows);
        if (error) throw error;
      }

      toast.success("Salvo!");
      setOpen(false);
      reload();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Product) => {
    if (!confirm(`Remover "${p.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Produto removido");
    reload();
  };

  const sizesArr = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur sticky top-0 z-30">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Voltar à loja
          </Link>
          <h1 className="font-display text-xl">Painel Admin</h1>
          <Button variant="ghost" size="sm" onClick={() => signOut().then(() => nav("/"))}>
            <LogOut className="h-4 w-4 mr-1" /> Sair
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">{products.length} produtos no catálogo</p>
          <Button onClick={openNew} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-1" /> Novo produto
          </Button>
        </div>

        <div className="grid gap-3">
          {products.map((p) => (
            <Card key={p.id} className="p-3 flex items-center gap-3 border-border/60">
              <div className="h-16 w-16 rounded bg-secondary overflow-hidden flex-shrink-0">
                {p.image_url && <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.brand} · {categoryLabels[p.category]} · R$ {p.price}
                  {p.color && ` · ${p.color}`}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Estoque:{" "}
                  {Object.entries(p.stock).length === 0
                    ? "—"
                    : Object.entries(p.stock).map(([s, q]) => `${s}:${q}`).join("  ")}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(p)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Editar produto" : "Novo produto"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label>Foto</Label>
                <div className="flex items-center gap-3 mt-1">
                  <div className="h-24 w-24 rounded bg-secondary overflow-hidden border border-border/60">
                    {form.image_url && (
                      <img src={form.image_url} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                    />
                    <span className="inline-flex items-center gap-2 rounded border border-border/70 px-3 py-2 text-sm hover:bg-secondary">
                      <Upload className="h-4 w-4" /> {uploading ? "Enviando..." : "Enviar foto"}
                    </span>
                  </label>
                  {form.image_url && (
                    <Button variant="ghost" size="icon" onClick={() => setForm((f) => ({ ...f, image_url: "" }))}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <Label>Nome</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Marca</Label>
                <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select value={form.category} onValueChange={(v: Category) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jaquetas">Jaquetas & Blusões</SelectItem>
                    <SelectItem value="calcas">Calças</SelectItem>
                    <SelectItem value="camisetas">Camisetas</SelectItem>
                    <SelectItem value="calcados">Calçados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preço (R$)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label>Cor (opcional)</Label>
                <Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label>Descrição</Label>
                <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label>Tamanhos disponíveis (separados por vírgula)</Label>
                <Input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label>Estoque por tamanho</Label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {sizesArr.map((s) => (
                    <div key={s} className="flex items-center gap-1">
                      <span className="text-xs font-bold w-8">{s}</span>
                      <Input
                        type="number"
                        min={0}
                        value={form.stock[s] ?? ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            stock: { ...form.stock, [s]: Number(e.target.value) || 0 },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Deixe 0 ou vazio se não tiver estoque desse tamanho.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="h-4 w-4 mr-1" /> {saving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
