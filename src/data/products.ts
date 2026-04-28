import calcaNikePantSock from "@/assets/products/calca-nike-pant-sock.webp";
import calcaNikeTribuna from "@/assets/products/calca-nike-tribuna.webp";
import calcaAdidasEntrada from "@/assets/products/calca-adidas-entrada.webp";
import calcaNikeLibero from "@/assets/products/calca-nike-libero.webp";
import camisetaNikeGraphic from "@/assets/products/camiseta-nike-graphic.webp";
import camisetaNikeLiberoCamo from "@/assets/products/camiseta-nike-libero-camo.webp";
import camisetaNikeSeasonalGlobo from "@/assets/products/camiseta-nike-seasonal-globo.webp";
import blusaoAdidasEntrada from "@/assets/products/blusao-adidas-entrada.webp";
import blusaoNikeLiberoPreto from "@/assets/products/blusao-nike-libero-preto.webp";
import blusaoNikeLiberoAzul from "@/assets/products/blusao-nike-libero-azul.webp";
import blusaoKappaPreto from "@/assets/products/blusao-kappa-preto.webp";
import blusaoKappaAzul from "@/assets/products/blusao-kappa-azul.webp";
import jaquetaAdidasEntradaCinza from "@/assets/products/jaqueta-adidas-entrada-cinza.webp";
import jaquetaAdidasEntradaAzul from "@/assets/products/jaqueta-adidas-entrada-azul.webp";
import jaquetaOakleyCamo from "@/assets/products/jaqueta-oakley-camo.webp";
import jaquetaOakleyTravelNomad from "@/assets/products/jaqueta-oakley-travel-nomad.webp";
import jaquetaFilaPuffer from "@/assets/products/jaqueta-fila-puffer.webp";
import tenisAdidasLiteRacer from "@/assets/products/tenis-adidas-lite-racer.webp";

export type Category = "jaquetas" | "calcas" | "camisetas" | "calcados";
export type Brand = "Nike" | "adidas" | "Oakley" | "Fila" | "Kappa";

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  description: string;
  sizes: string[];
  color?: string;
  image?: string;
  /** Estoque por tamanho. Tamanhos ausentes = sem estoque. */
  stock?: Record<string, number>;
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

const clothingSizes = ["P", "M", "G", "GG"];
const shoeSizes = ["36", "37", "38", "39", "40"];

/** Helper: retorna apenas os tamanhos com estoque > 0. */
export const availableSizes = (p: Product): string[] => {
  if (!p.stock) return p.sizes;
  return p.sizes.filter((s) => (p.stock?.[s] ?? 0) > 0);
};

/** Helper: total em estoque do produto. */
export const totalStock = (p: Product): number | null => {
  if (!p.stock) return null;
  return Object.values(p.stock).reduce((a, b) => a + b, 0);
};

export const products: Product[] = [
  // Jaquetas & Blusões
  {
    id: "jaq-adidas-entrada-cinza",
    name: "Jaqueta de Treino adidas Entrada 22",
    brand: "adidas",
    category: "jaquetas",
    price: 130,
    color: "Cinza",
    description:
      "Jaqueta esportiva da linha Entrada 22, ideal para treinos e dia a dia. Tecido leve, respirável e com acabamento moderno.",
    sizes: clothingSizes,
    image: jaquetaAdidasEntradaCinza,
    stock: { G: 3 },
  },
  {
    id: "jaq-adidas-entrada-azul",
    name: "Jaqueta de Treino adidas Entrada 22",
    brand: "adidas",
    category: "jaquetas",
    price: 130,
    color: "Azul",
    description:
      "Versão azul da clássica Entrada 22. Conforto, mobilidade e o estilo inconfundível das três listras.",
    sizes: clothingSizes,
    image: jaquetaAdidasEntradaAzul,
    stock: { G: 1 },
  },
  {
    id: "jaq-oakley-mod",
    name: "Jaqueta Oakley Camo Windbreaker Masculina",
    brand: "Oakley",
    category: "jaquetas",
    price: 180,
    color: "Camo Verde",
    description:
      "Corta-vento Oakley com estampa camuflada, capuz e ziper frontal. Proteção contra o vento, leveza e visual urbano marcante.",
    sizes: [...clothingSizes, "XG"],
    image: jaquetaOakleyCamo,
    stock: { P: 2 },
  },
  {
    id: "jaq-oakley-travel-nomad",
    name: "Jaqueta Oakley Travel Nomad Packable W",
    brand: "Oakley",
    category: "jaquetas",
    price: 180,
    color: "Preto + Amarelo",
    description:
      "Jaqueta packable da Oakley — dobra dentro do próprio bolso. Perfeita para viagens e dias imprevisíveis.",
    sizes: [...clothingSizes, "XG"],
    image: jaquetaOakleyTravelNomad,
    stock: { M: 14, XG: 10 },
  },
  {
    id: "jaq-fila-puffer",
    name: "Jaqueta Puffer Fila Vest Masculina",
    brand: "Fila",
    category: "jaquetas",
    price: 150,
    description:
      "Colete puffer Fila com enchimento térmico. Aquece sem pesar e finaliza qualquer look com atitude.",
    sizes: clothingSizes,
    image: jaquetaFilaPuffer,
    stock: { M: 1 },
  },
  {
    id: "blu-adidas-entrada",
    name: "Blusão de Treino adidas Entrada 22",
    brand: "adidas",
    category: "jaquetas",
    price: 130,
    color: "Preto",
    description:
      "Blusão Entrada 22 da adidas para treinos e ocasiões casuais. Tecido confortável e corte esportivo.",
    sizes: clothingSizes,
    image: blusaoAdidasEntrada,
    stock: { G: 3 },
  },
  {
    id: "blu-nike-libero-capuz",
    name: "Blusão Nike com Capuz Dri-Fit F.C. Libero",
    brand: "Nike",
    category: "jaquetas",
    price: 160,
    color: "Preto",
    description:
      "Blusão Nike F.C. com tecnologia Dri-Fit que afasta a umidade. Capuz ajustável e estilo futebol-streetwear.",
    sizes: clothingSizes,
    image: blusaoNikeLiberoPreto,
    stock: { P: 4, M: 21, G: 12 },
  },
  {
    id: "blu-nike-libero-azul",
    name: "Blusão Nike F.C. Libero Masculino",
    brand: "Nike",
    category: "jaquetas",
    price: 160,
    color: "Azul",
    description:
      "Versão azul do icônico blusão Nike F.C. com capuz. Estampa F.C. no peito e identidade futebol-streetwear.",
    sizes: clothingSizes,
    image: blusaoNikeLiberoAzul,
    stock: { M: 2 },
  },
  {
    id: "blu-kappa-heavy-1",
    name: "Blusão Kappa Masculino com Capuz Heavy",
    brand: "Kappa",
    category: "jaquetas",
    price: 90,
    color: "Preto",
    description:
      "Blusão Kappa Heavy com capuz, tecido encorpado e logo da marca em destaque. Conforto e atitude italiana.",
    sizes: clothingSizes,
    image: blusaoKappaPreto,
    stock: { G: 1 },
  },
  {
    id: "blu-kappa-heavy-2",
    name: "Blusão Kappa Masculino com Capuz Heavy",
    brand: "Kappa",
    category: "jaquetas",
    price: 90,
    color: "Azul Marinho",
    description:
      "Versão azul marinho do clássico Kappa Heavy. Capuz, meio zíper e tecido encorpado.",
    sizes: clothingSizes,
    image: blusaoKappaAzul,
    stock: { G: 3 },
  },

  // Calças
  {
    id: "cal-adidas-entrada",
    name: "Calça de Treino adidas Entrada 22",
    brand: "adidas",
    category: "calcas",
    price: 120,
    description:
      "Calça esportiva Entrada 22 com corte slim, três listras laterais e cordão de ajuste na cintura.",
    sizes: clothingSizes,
    image: calcaAdidasEntrada,
  },
  {
    id: "cal-nike-tribuna",
    name: "Calça Nike F.C. Tribuna Sock Pant",
    brand: "Nike",
    category: "calcas",
    price: 190,
    description:
      "Calça Nike F.C. Tribuna com punho tipo meião, ajuste perfeito e visual de quem entende de futebol.",
    sizes: clothingSizes,
    image: calcaNikeTribuna,
    stock: { M: 6, G: 4 },
  },
  {
    id: "cal-nike-pant-sock",
    name: "Calça Nike Fc Pant Sock Cuff Kpz",
    brand: "Nike",
    category: "calcas",
    price: 190,
    description:
      "Calça Nike F.C. com punho sock cuff. Caimento moderno, ideal para treino ou rolês casuais.",
    sizes: clothingSizes,
    image: calcaNikePantSock,
    stock: { G: 1 },
  },
  {
    id: "cal-nike-libero",
    name: "Calça Nike F.C. Dri-Fit Libero Pant K",
    brand: "Nike",
    category: "calcas",
    price: 190,
    description:
      "Calça Nike F.C. Dri-Fit Libero. Tecnologia que afasta o suor, caimento confortável e estilo Nike F.C.",
    sizes: clothingSizes,
    image: calcaNikeLibero,
  },

  // Camisetas
  {
    id: "cam-nike-graphic-seasonal",
    name: "Camiseta Nike Manga Curta Graphic F.C. Seasonal",
    brand: "Nike",
    category: "camisetas",
    price: 125,
    color: "Cinza",
    description:
      "Camiseta Nike F.C. Graphic Seasonal com estampa do globo em verde neon. Algodão macio e identidade futebol streetwear.",
    sizes: clothingSizes,
    image: camisetaNikeSeasonalGlobo,
    stock: { M: 2, G: 4 },
  },
  {
    id: "cam-nike-libero-camo",
    name: "Camiseta Nike Manga Curta Dri-Fit F.C. Libero T",
    brand: "Nike",
    category: "camisetas",
    price: 125,
    color: "Camuflada",
    description:
      "Camiseta Nike F.C. Libero com estampa camo all-over e tecnologia Dri-Fit. Estilo militar com pegada esportiva.",
    sizes: clothingSizes,
    image: camisetaNikeLiberoCamo,
  },
  {
    id: "cam-nike-fc-tee-seasonal",
    name: "Camiseta Nike F.C. Manga Curta Tee Seasonal",
    brand: "Nike",
    category: "camisetas",
    price: 125,
    color: "Preta",
    description:
      "Camiseta Nike F.C. com estampa frontal NIKE F.C. em destaque. Algodão premium e visual streetwear marcante.",
    sizes: clothingSizes,
    image: camisetaNikeGraphic,
    stock: { M: 3, G: 7 },
  },

  // Calçados
  {
    id: "ten-adidas-lite-racer",
    name: "Tênis Adidas Lite Racer Rebold Feminino",
    brand: "adidas",
    category: "calcados",
    price: 190,
    description:
      "Tênis adidas Lite Racer Rebold feminino. Leveza, conforto e visual versátil para o dia a dia.",
    sizes: shoeSizes,
    image: tenisAdidasLiteRacer,
  },
];