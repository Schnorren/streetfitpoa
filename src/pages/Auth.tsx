import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Auth = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) nav("/admin");
    else if (!loading && user && !isAdmin) {
      toast.error("Sua conta não tem permissão de admin.");
    }
  }, [user, isAdmin, loading, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Conta criada! Faça login.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo!");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao autenticar");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-border/60">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <Zap className="h-7 w-7 text-primary" strokeWidth={2.5} />
          <span className="font-display text-2xl tracking-wider">
            STREET<span className="text-primary">FIT</span>
          </span>
        </Link>
        <h1 className="font-display text-2xl text-center mb-1">
          {mode === "login" ? "Entrar no painel" : "Criar conta admin"}
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Acesso restrito ao administrador
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" disabled={busy} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {busy ? "..." : mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 w-full text-xs text-muted-foreground hover:text-primary"
        >
          {mode === "login" ? "Primeira vez? Criar conta" : "Já tem conta? Entrar"}
        </button>
      </Card>
    </div>
  );
};

export default Auth;
