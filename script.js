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

function slideHTML(produto) {
  return `
    <div class="hero-slide">
      <div class="hero-card">
        <div class="hero-card__swatch">${renderSwatch(produto)}</div>
        <div class="hero-card__body">
          <p class="hero-card__label">achadinho em destaque</p>
          <h3 class="hero-card__name">${escapeHTML(produto.nome)}</h3>
          <p class="hero-card__price">${escapeHTML(produto.preco)}</p>
          <a class="btn hero-card__cta" href="${produto.link}" target="_blank" rel="noopener sponsored">
            Ver na Shopee
          </a>
        </div>
      </div>
    </div>`;
}

function renderHero(destaques) {
  const hero = document.getElementById('destaque');
  if (!destaques.length) { hero.style.display = 'none'; return; }

  const total = destaques.length;
  const varios = total > 1;

  hero.innerHTML = `
    <div class="hero-slider" role="region" aria-roledescription="carrossel" aria-label="Achadinhos em destaque">
      <div class="hero-viewport">
        <div class="hero-track">${destaques.map(slideHTML).join('')}</div>
      </div>
      ${varios ? `
        <button class="hero-arrow hero-arrow--prev" aria-label="Slide anterior">‹</button>
        <button class="hero-arrow hero-arrow--next" aria-label="Próximo slide">›</button>
        <div class="hero-dots">
          ${destaques.map((_, i) => `<button class="hero-dot" aria-label="Ir para o slide ${i + 1}"></button>`).join('')}
        </div>` : ''}
    </div>
  `;
  ativarFallbackDeFotos(hero);

  const track = hero.querySelector('.hero-track');
  const slides = hero.querySelectorAll('.hero-slide');
  const dots = hero.querySelectorAll('.hero-dot');
  let atual = 0;
  let timer = null;

  function ir(i) {
    atual = (i + total) % total;
    track.style.transform = `translateX(-${atual * 100}%)`;
    slides.forEach((sl, n) => {
      const ativo = n === atual;
      sl.setAttribute('aria-hidden', ativo ? 'false' : 'true');
      sl.querySelectorAll('a').forEach(a => a.tabIndex = ativo ? 0 : -1);
    });
    dots.forEach((d, n) => {
      d.classList.toggle('hero-dot--ativo', n === atual);
      d.setAttribute('aria-current', n === atual ? 'true' : 'false');
    });
  }

  ir(0);
  if (!varios) return;

  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const parar = () => { clearInterval(timer); timer = null; };
  const iniciar = () => {
    if (reduzir) return;
    parar();
    timer = setInterval(() => ir(atual + 1), 5000);
  };

  hero.querySelector('.hero-arrow--prev').addEventListener('click', () => { ir(atual - 1); iniciar(); });
  hero.querySelector('.hero-arrow--next').addEventListener('click', () => { ir(atual + 1); iniciar(); });
  dots.forEach((d, n) => d.addEventListener('click', () => { ir(n); iniciar(); }));

  // pausa quando o mouse ou o foco estão no slider
  const slider = hero.querySelector('.hero-slider');
  slider.addEventListener('mouseenter', parar);
  slider.addEventListener('mouseleave', iniciar);
  slider.addEventListener('focusin', parar);
  slider.addEventListener('focusout', iniciar);

  // arrastar com o dedo no celular
  let x0 = null;
  slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; parar(); }, { passive: true });
  slider.addEventListener('touchend', e => {
    if (x0 !== null) {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) ir(atual + (dx < 0 ? 1 : -1));
    }
    x0 = null;
    iniciar();
  });

  iniciar();
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

  // todos os produtos com destaque: true viram slides (máx. 5).
  // se nenhum tiver, o primeiro da lista vira o destaque.
  let destaques = lista.filter(p => p.destaque).slice(0, 5);
  if (!destaques.length && lista.length) destaques = [lista[0]];
  const resto = lista.filter(p => !destaques.includes(p));

  renderHero(destaques);
  renderUpdated();

  let categoriaAtiva = 'Todos';

  function aplicarFiltro(categoria) {
    categoriaAtiva = categoria;
    const filtrados = categoria === 'Todos'
      ? resto
      : resto.filter(p => (p.categoria || 'Outros') === categoria);
    renderGrid(filtrados);
    renderFiltros(resto, categoriaAtiva, aplicarFiltro);
  }

  aplicarFiltro('Todos');
})();
