# Achadinhos — Jess Nocturna

## Como colocar no ar (Netlify)

1. Acesse https://app.netlify.com/drop
2. Descompacte o arquivo `achadinhos-jess-nocturna.zip`
3. Arraste a pasta descompactada pra dentro da página do Netlify
4. Pronto — em segundos você recebe um link tipo `nome-aleatorio.netlify.app`

(Se quiser, dá pra criar conta de graça no Netlify e trocar esse endereço por um nome escolhido por você, tipo `achadinhosdajess.netlify.app`, nas configurações do site.)

## Como adicionar, editar ou remover um produto

Abra o arquivo **products.js**. Cada produto é um bloco assim:

```js
{
  nome: "Nome do produto",
  preco: "R$29,90",
  link: "https://s.shopee.com.br/xxxxx",
  emoji: "👗",
},
```

- **Adicionar**: copie um bloco inteiro, cole antes do `];` no final do arquivo, e mude os dados.
- **Editar**: só muda o texto dentro das aspas.
- **Remover**: apague o bloco inteiro (do `{` até o `},`).
- **Destaque**: coloque `destaque: true` em UM produto pra ele aparecer no topo da página. Se nenhum tiver isso, o primeiro da lista vira o destaque automaticamente.

Depois de editar, salve o arquivo e suba de novo no Netlify (pode arrastar a pasta de novo em app.netlify.com/drop, ou conectar com o GitHub pra atualizar automaticamente — te explico se quiser).

## Como adicionar as fotos (sem editar nenhum código!)

O site já vem preparado pra reconhecer as fotos sozinho. Você só precisa:

1. Nomear cada foto com o **número do produto** (veja a lista abaixo)
2. Colocar o arquivo dentro da pasta `imagens/`
3. Subir a pasta de novo no Netlify

Pronto — a foto aparece automaticamente no lugar do emoji. Não precisa abrir nem editar o `products.js` pra isso.

**Numeração dos seus 10 produtos atuais:**

| Nº | Produto | Nome do arquivo |
|----|---------|------------------|
| 1  | Body Collant Regata Blusa | `1.jpg` |
| 2  | Conjunto Top e Saia com Tule | `2.jpg` |
| 3  | Conjunto Saia Longa e Cropped | `3.jpg` |
| 4  | Vestido Lovito Sem Costas | `4.jpg` |
| 5  | Calça Jeans Wide Leg | `5.jpg` |
| 6  | Calça Pantalona Alfaiataria | `6.jpg` |
| 7  | Calça Legging Canelada | `7.jpg` |
| 8  | Calça Legging Arrastão | `8.jpg` |
| 9  | Blush Líquido Gecomomo | `9.jpg` |
| 10 | Pijama Baby Doll | `10.jpg` |

Pode ser `.jpg`, `.jpeg`, `.png` ou `.webp` — qualquer um desses funciona, o site testa sozinho. Se faltar alguma foto, o emoji continua aparecendo no lugar normalmente, sem quebrar nada.

**Dica:** se um dia você reordenar ou adicionar produtos no `products.js`, a numeração muda (ela segue a ordem de cima pra baixo do arquivo). Nesse caso, é só renomear as fotos seguindo a nova ordem.

## Como editar textos, preços e links (quando precisar)

O arquivo `products.js` é um arquivo de texto simples — só não abre com duplo clique porque o computador tenta "executar" em vez de "abrir pra editar". Pra editar:

- **Windows:** clique com o botão direito no arquivo → "Abrir com" → "Bloco de Notas"
- **Mac:** clique com o botão direito → "Abrir com" → "TextEdit"

Mas o jeito mais fácil: **me manda o texto dos produtos aqui no chat** (igual você fez da primeira vez, copiando da Shopee) e eu já te devolvo o `products.js` prontinho, é só você substituir o arquivo antigo pelo novo na pasta.

## Estrutura dos arquivos

- `index.html` — estrutura da página
- `style.css` — visual (cores, fontes, layout)
- `products.js` — sua lista de produtos (o único arquivo que você deve editar no dia a dia)
- `script.js` — monta a página automaticamente a partir do products.js
