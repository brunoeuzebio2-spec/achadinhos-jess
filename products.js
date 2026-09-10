// ============================================================
// SEUS ACHADINHOS — edite esta lista sempre que quiser
// ============================================================
// Para ADICIONAR um produto: copie um bloco { ... } inteiro,
// cole antes do "];" lá embaixo e mude os dados.
//
// Para REMOVER um produto: apague o bloco { ... } dele inteiro.
//
// Campos:
//   nome      -> nome do produto
//   preco     -> preço (pode ser "R$27,00" ou uma faixa "R$15,50 - R$16,43")
//   link      -> seu link de afiliado da Shopee (o s.shopee.com.br/... )
//   emoji     -> um emoji que combina com o produto (aparece SE não tiver foto)
//   imagem    -> caminho da foto, ex: "imagens/body-collant.jpg" (opcional)
//                se você preencher "imagem", ela substitui o emoji no card
//   categoria -> nome da categoria pra aparecer nos filtros, ex: "Roupas",
//                "Beleza", "Casa", "Eletrônicos" — escreva do jeito que
//                quer que apareça na tela. Se não preencher, cai em "Outros".
//   destaque  -> true no produto que você quer em destaque no topo (use em
//                SÓ 1 produto por vez — pra trocar o destaque, tire o
//                "destaque: true" do produto antigo e coloque no novo)
//
// Como adicionar uma foto:
//   1. Salve o arquivo da imagem dentro da pasta "imagens/"
//   2. Adicione a linha imagem: "imagens/nome-do-arquivo.jpg" no produto
// ============================================================

const PRODUTOS = [
  {
    nome: "Body Collant Feminino Regata Blusa Decote Quadrado Com Forro — Estilo Blogueira",
    preco: "R$27,00",
    link: "https://s.shopee.com.br/112nqaCC9y",
    emoji: "👚",
    categoria: "Roupas",
    destaque: true
  },
  {
    nome: "Conjunto Feminino Top e Saia Com Tule Suplex Fluit Premium — Moda Gringa Luxo Balada",
    preco: "R$68,02",
    link: "https://s.shopee.com.br/6VNkOvtipl",
    emoji: "🌙",
    categoria: "Roupas"
  },
  {
    nome: "Conjunto Feminino Saia Longa e Cropped Alcinha Com Fenda — Várias Cores, Moda Blogueira",
    preco: "R$39,90 - R$67,58",
    link: "https://s.shopee.com.br/2BElExNxb3",
    emoji: "👗",
    categoria: "Roupas"
  },
  {
    nome: "Vestido Feminino Lovito Férias Nacional Sem Costas — Primavera/Verão",
    preco: "R$56,16 - R$57,90",
    link: "https://s.shopee.com.br/4LJFoxWuEC",
    emoji: "👗",
    categoria: "Roupas"
  },
  {
    nome: "Calça Jeans Wide Leg Pantalona Boca Larga Premium",
    preco: "R$59,90 - R$79,90",
    link: "https://s.shopee.com.br/8fSEyim7zO",
    emoji: "👖",
    categoria: "Roupas"
  },
  {
    nome: "Calça Pantalona Alfaiataria Premium Com Bolso — Promoção",
    preco: "R$29,80 - R$47,60",
    link: "https://s.shopee.com.br/8AVyO0rNBY",
    emoji: "👖",
    categoria: "Roupas"
  },
  {
    nome: "Calça Legging Canelada de Cintura Alta Sem Costura — Academia, Fitness",
    preco: "R$32,99",
    link: "https://s.shopee.com.br/6fhAb2Owcg",
    emoji: "🩱",
    categoria: "Roupas"
  },
  {
    nome: "Calça Legging Arrastão Moda Feminina — Promoção",
    preco: "R$29,95 - R$33,95",
    link: "https://s.shopee.com.br/9peCMsGobg",
    emoji: "🩱",
    categoria: "Roupas"
  },
  {
    nome: "Gecomomo Creme Blush Líquido — 6 Cores, Veludo Liso Mate",
    preco: "R$15,50 - R$16,43",
    link: "https://s.shopee.com.br/AKaSxlFaAZ",
    emoji: "💄",
    categoria: "Beleza"
  },
  {
    nome: "Pijama Feminino Baby Doll Estampado — Confortável, Leve, Ideal Para Presente",
    preco: "R$27,99",
    link: "https://s.shopee.com.br/Ln73dgvTS",
    emoji: "🌙",
    categoria: "Roupas"
  },

  // ---- adicionados depois ----
  {
    nome: "Blusa Feminina Listrada Casual Com Manga Curta — Moda Tricô, Tendência 2025",
    preco: "R$24,99 - R$30,99",
    link: "https://s.shopee.com.br/30ntEozIII",
    emoji: "👚",
    categoria: "Roupas"
  },
  {
    nome: "Camiseta Blusa Feminina Manga Curta Estampa de Gatinho Fofo Subindo Corda — Lançamento",
    preco: "R$23,86 - R$28,45",
    link: "https://s.shopee.com.br/8plgBY3U80",
    emoji: "🐱",
    categoria: "Roupas"
  },
  {
    nome: "Kit 2 T-shirt Feminina Camiseta Sem Estampa 100% Algodão — Várias Cores, Promoção",
    preco: "R$39,99 - R$40,80",
    link: "https://s.shopee.com.br/4LJGpI79Qm",
    emoji: "👚",
    categoria: "Roupas"
  },
  {
    nome: "Camiseta Feminina de Treino Levinha — Algodão Malha Premium",
    preco: "R$19,90 - R$29,90",
    link: "https://s.shopee.com.br/7pt8zkScZE",
    emoji: "🎽",
    categoria: "Roupas"
  },
  {
    nome: "Conjunto Crepe Feminino Com Bolso — Moda Blogueira",
    preco: "R$49,99 - R$56,96",
    link: "https://s.shopee.com.br/6L4LDCkkPe",
    emoji: "👗",
    categoria: "Roupas"
  },
  {
    nome: "Calça Jeans Feminina Cargo Wide Leg Marmorizada — Pantalona Boca Larga, Bolso Lateral",
    preco: "R$69,99 - R$79,90",
    link: "https://s.shopee.com.br/Ln84Cy39u",
    emoji: "👖",
    categoria: "Roupas"
  },
  {
    nome: "Blusa Feminina Cacharrel Manga Longa Gola Alta Listrada — Inverno, Moda Básica Casual",
    preco: "R$28,68 - R$57,62",
    link: "https://s.shopee.com.br/1gIVehVctA",
    emoji: "👚",
    categoria: "Roupas"
  },
  {
    nome: "Kit 2 Blusas ou Individual Dry Fit — Camiseta Yoga, Moda Fitness Esportiva",
    preco: "R$21,55 - R$42,67",
    link: "https://s.shopee.com.br/60RUogNO4A",
    emoji: "🎽",
    categoria: "Roupas"
  },
  {
    nome: "Blusas Gola Alta Femininas Lisas — 100% Algodão",
    preco: "R$28,90 - R$28,99",
    link: "https://s.shopee.com.br/4Vch20a9Wx",
    emoji: "👚",
    categoria: "Roupas"
  },
  {
    nome: "Unidade ou Kit com 3 Blusa Feminina Estilosa T-Shirt Gola Alta — 100% Algodão",
    preco: "R$28,14 - R$69,30",
    link: "https://s.shopee.com.br/9KhwmuCsc1",
    emoji: "👚",
    categoria: "Roupas"
  },
];
