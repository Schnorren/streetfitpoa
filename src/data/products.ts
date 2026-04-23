import calcaNikePantSock from "@/assets/products/calca-nike-pant-sock.webp";
import calcaNikeTribuna from "@/assets/products/calca-nike-tribuna.webp";
import calcaAdidasEntrada from "@/assets/products/calca-adidas-entrada.webp";
import calcaNikeLibero from "@/assets/products/calca-nike-libero.webp";
import camisetaNikeGraphic from "@/assets/products/camiseta-nike-graphic.webp";
import blusaoAdidasEntrada from "@/assets/products/blusao-adidas-entrada.webp";
import blusaoNikeLiberoPreto from "@/assets/products/blusao-nike-libero-preto.webp";
import blusaoNikeLiberoAzul from "@/assets/products/blusao-nike-libero-azul.webp";
import blusaoKappaPreto from "@/assets/products/blusao-kappa-preto.webp";
import blusaoKappaAzul from "@/assets/products/blusao-kappa-azul.webp";

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
  },
  {
    id: "jaq-oakley-mod",
    name: "Jaqueta Corta Vento Oakley Mod",
    brand: "Oakley",
    category: "jaquetas",
    price: 180,
    description:
      "Corta-vento Oakley com pegada streetwear. Proteção contra o vento, leveza e visual urbano marcante.",
    sizes: clothingSizes,
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
    sizes: clothingSizes,
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
  },
  {
    id: "blu-adidas-entrada",
    name: "Blusão de Treino adidas Entrada 22",
    brand: "adidas",
    category: "jaquetas",
    price: 130,
    description:
      "Blusão Entrada 22 da adidas para treinos e ocasiões casuais. Tecido confortável e corte esportivo.",
    sizes: clothingSizes,
  },
  {
    id: "blu-nike-libero-capuz",
    name: "Blusão Nike com Capuz Dri-Fit F.C. Libero",
    brand: "Nike",
    category: "jaquetas",
    price: 160,
    description:
      "Blusão Nike F.C. com tecnologia Dri-Fit que afasta a umidade. Capuz ajustável e estilo futebol-streetwear.",
    sizes: clothingSizes,
  },
  {
    id: "blu-kappa-heavy-1",
    name: "Blusão Kappa Masculino com Capuz Heavy",
    brand: "Kappa",
    category: "jaquetas",
    price: 90,
    description:
      "Blusão Kappa Heavy com capuz, tecido encorpado e logo da marca em destaque. Conforto e atitude italiana.",
    sizes: clothingSizes,
  },
  {
    id: "blu-kappa-heavy-2",
    name: "Blusão Kappa Masculino com Capuz Heavy",
    brand: "Kappa",
    category: "jaquetas",
    price: 90,
    description:
      "Outra opção do clássico blusão Kappa Heavy, ideal para temperaturas mais baixas.",
    sizes: clothingSizes,
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
  },

  // Camisetas
  {
    id: "cam-nike-graphic-seasonal",
    name: "Camiseta Nike Manga Curta Graphic F.C. Seasonal",
    brand: "Nike",
    category: "camisetas",
    price: 125,
    description:
      "Camiseta Nike F.C. com estampa gráfica sazonal. Algodão macio e estilo futebol streetwear.",
    sizes: clothingSizes,
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
  },
];