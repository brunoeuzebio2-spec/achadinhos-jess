// Monta a página a partir da lista em products.js.
// Você não precisa mexer neste arquivo — só no products.js (e nem isso,
// se for só pra trocar fotos: basta nomear os arquivos 1, 2, 3... e
// colocar na pasta imagens/).

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Cada produto tenta carregar automaticamente uma foto em imagens/N.*
// (N = posição do produto no products.js, começando em 1).
// Testa .jpg, .jpeg, .png e .webp nessa ordem; se nenhuma existir,
// mostra o emoji do produto no lugar. Se o produto tiver um campo
// "imagem" definido manualmente, essa foto tem prioridade.
const EXTENSOES = ['jpg', 'jpeg', 'png', 'webp'];

function renderSwatch(produto) {
  const emojiSeguro = escapeHTML(produto.emoji || '✨');
  if (produto.imagem) {
    return `<img class="swatch-img" src="${produto.imagem}" data-emoji="${emojiSeguro}" alt="${escapeHTML(produto.nome)}" loading="lazy">`;
  }
  return `<img class="swatch-img" data-auto="imagens/${produto._num}" data-emoji="${emojiSeguro}" alt="${escapeHTML(produto.nome)}" loading="lazy">`;
}

function ativarFallbackDeFotos(container) {
  container.querySelectorAll('.swatch-img').forEach(img => {
    const mostrarEmoji = () => {
      const span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.textContent = img.dataset.emoji || '✨';
      img.replaceWith(span);
    };

    if (img.dataset.auto) {
      let i = 0;
      const tentarProxima = () => {
        if (i >= EXTENSOES.length) { mostrarEmoji(); return; }
        img.src = `${img.dataset.auto}.${EXTENSOES[i]}`;
        i++;
      };
      img.addEventListener('error', tentarProxima);
      tentarProxima();
    } else {
      img.addEventListener('error', mostrarEmoji, { once: true });
    }
  });
}

function renderFiltros(lista, categoriaAtiva, aoClicar) {
  const nav = document.getElementById('filtros');
  const categorias = ['Todos', ...new Set(lista.map(p => p.categoria || 'Outros'))];

  nav.innerHTML = categorias.map(cat => `
    <button class="filtro-pill${cat === categoriaAtiva ? ' filtro-pill--ativo' : ''}" data-categoria="${escapeHTML(cat)}">
      ${escapeHTML(cat)}
    </button>
  `).join('');

  nav.querySelectorAll('.filtro-pill').forEach(btn => {
    btn.addEventListener('click', () => aoClicar(btn.dataset.categoria));
  });
}

function renderHero(produto) {
  const hero = document.getElementById('destaque');
  if (!produto) { hero.style.display = 'none'; return; }

  hero.innerHTML = `
    <div class="hero-card">
      <div class="hero-card__swatch">${renderSwatch(produto)}</div>
      <div class="hero-card__body">
        <p class="hero-card__label">achadinho da semana</p>
        <h3 class="hero-card__name">${escapeHTML(produto.nome)}</h3>
        <p class="hero-card__price">${escapeHTML(produto.preco)}</p>
        <a class="btn hero-card__cta" href="${produto.link}" target="_blank" rel="noopener sponsored">
          Ver na Shopee
        </a>
      </div>
    </div>
  `;
  ativarFallbackDeFotos(hero);
}

function renderGrid(produtos) {
  const grid = document.getElementById('grid');
  grid.innerHTML = produtos.map(p => `
    <article class="card">
      <div class="card__swatch">${renderSwatch(p)}</div>
      <div class="card__body">
        <p class="card__name">${escapeHTML(p.nome)}</p>
        <p class="card__price">${escapeHTML(p.preco)}</p>
        <a class="btn card__cta" href="${p.link}" target="_blank" rel="noopener sponsored">
          Ver na Shopee
        </a>
      </div>
    </article>
  `).join('');
  ativarFallbackDeFotos(grid);
}

function renderUpdated() {
  const el = document.getElementById('atualizado');
  const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  el.textContent = `página atualizada em ${hoje}`;
}

(function init() {
  const lista = (typeof PRODUTOS !== 'undefined') ? PRODUTOS : [];
  lista.forEach((p, i) => { p._num = i + 1; }); // numera na ordem do products.js

  const destaque = lista.find(p => p.destaque) || lista[0];
  const resto = lista.filter(p => p !== destaque);

  renderHero(destaque);
  renderUpdated();

  let categoriaAtiva = 'Todos';

  function aplicarFiltro(categoria) {
    categoriaAtiva = categoria;
    const filtrados = categoria === 'Todos'
      ? resto
      : resto.filter(p => (p.categoria || 'Outros') === categoria);
    renderGrid(filtrados);
    renderFiltros(lista, categoriaAtiva, aplicarFiltro);
  }

  aplicarFiltro('Todos');
})();
