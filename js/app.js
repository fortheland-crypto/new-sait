/**
 * ГЛАВНЫЙ КОНТРОЛЛЕР ПРИЛОЖЕНИЯ PROFIVISION
 * Инициализирует рендеринг, фильтрацию, модальные окна, поиск и события.
 */
class MainApp {
  constructor() {
    this.currentCategory = "all";
    this.currentSort = "popular";
    this.searchQuery = "";
    this.selectedBrand = "all";
    this.inStockOnly = false;
    this.withInstallOnly = false;
    this.selectedProduct = null;
    this.catalogViewMode = "grid"; // 'grid' | 'list'
  }

  init() {
    this.injectConfigPlaceholders();
    this.renderHeroAdvantages();
    this.renderCategoryGrid();
    this.renderPopularProducts();
    this.renderServices();
    this.renderAdvantages();
    this.renderPortfolio();
    this.renderReviews();
    this.setupEventListeners();
    this.setupRemoteCheckerWidget();
    this.setup2GISBlock();

    // Рендерим виджет помощника
    if (window.Assistant) {
      window.Assistant.render();
    }

    // Обновляем бейджи корзины
    if (window.Cart) {
      window.Cart.updateBadges();
    }

    // Инициализируем иконки Lucide
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // ==========================================
  // ВНЕДРЕНИЕ ДАННЫХ И ПЛЕЙСХОЛДЕРОВ ИЗ CONFIG
  // ==========================================
  injectConfigPlaceholders() {
    const config = window.SITE_CONFIG || {};

    // Замена по классам и атрибутам data-config
    document.querySelectorAll("[data-config='COMPANY_NAME']").forEach(el => el.textContent = config.COMPANY_NAME);
    document.querySelectorAll("[data-config='COMPANY_SUBTITLE']").forEach(el => el.textContent = config.COMPANY_SUBTITLE);
    document.querySelectorAll("[data-config='CITY']").forEach(el => el.textContent = config.CITY);
    document.querySelectorAll("[data-config='SERVICE_REGION']").forEach(el => el.textContent = config.SERVICE_REGION);
    document.querySelectorAll("[data-config='PHONE']").forEach(el => el.textContent = config.PHONE);
    document.querySelectorAll("[data-config='ADDRESS']").forEach(el => el.textContent = config.ADDRESS);
    document.querySelectorAll("[data-config='ADDRESS_LANDMARK']").forEach(el => el.textContent = config.ADDRESS_LANDMARK);
    document.querySelectorAll("[data-config='WORKING_HOURS']").forEach(el => el.textContent = config.WORKING_HOURS);
    document.querySelectorAll("[data-config='RESPONSE_TIME']").forEach(el => el.textContent = config.RESPONSE_TIME);

    // Телефонные ссылки tel:
    document.querySelectorAll("a[data-config='TEL_LINK']").forEach(el => {
      el.href = `tel:${config.PHONE_RAW || '+77778904567'}`;
    });

    // Ссылки WhatsApp
    const waUrl = `https://wa.me/${config.WHATSAPP_NUMBER || '77778904567'}?text=${encodeURIComponent(config.WHATSAPP_GREETING || 'Здравствуйте!')}`;
    document.querySelectorAll("a[data-config='WA_LINK']").forEach(el => {
      el.href = waUrl;
    });

    // Ссылки Telegram
    document.querySelectorAll("a[data-config='TG_LINK']").forEach(el => {
      el.href = config.TELEGRAM_LINK || 'https://t.me/profivision_kz';
    });

    // Ссылки 2ГИС
    document.querySelectorAll("a[data-config='DGIS_LINK']").forEach(el => {
      el.href = config.DGIS_LINK || 'https://2gis.kz';
    });
  }

  // ==========================================
  // РЕНДЕРИНГ БЛОКОВ ПЕРВОГО ЭКРАНА
  // ==========================================
  renderHeroAdvantages() {
    const container = document.getElementById("hero-advantages-container");
    if (!container) return;

    const items = [
      { icon: "camera", title: "Видеонаблюдение под ключ", subtitle: "Просмотр с телефона и запись" },
      { icon: "radio", title: "Спутниковое ТВ (Телекарта / Отау)", subtitle: "230+ каналов без абонплаты и помех" },
      { icon: "wrench", title: "Монтаж и настройка", subtitle: "Выезд мастера в день заказа" },
      { icon: "shield-check", title: "Официальная гарантия", subtitle: "Сервисное сопровождение" }
    ];

    container.innerHTML = items.map(item => `
      <div class="flex items-center gap-3 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <i data-lucide="${item.icon}" class="w-5 h-5"></i>
        </div>
        <div>
          <h4 class="font-bold text-xs sm:text-sm text-slate-900">${item.title}</h4>
          <p class="text-[11px] text-slate-500">${item.subtitle}</p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // КАТЕГОРИИ
  // ==========================================
  renderCategoryGrid() {
    const container = document.getElementById("categories-grid-container");
    if (!container) return;

    const categories = CATEGORIES_DATA.filter(c => c.id !== "all");

    container.innerHTML = categories.map(cat => `
      <div 
        onclick="window.App.openCatalogWithCategory('${cat.id}')"
        class="group relative bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl p-5 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
      >
        <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-50/50 rounded-full group-hover:scale-125 transition-transform duration-500 -z-0"></div>

        <div class="relative z-10">
          <div class="flex items-start justify-between mb-3">
            <span class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-colors">
              <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
            </span>
            <span class="text-[11px] font-semibold bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700 text-slate-600 px-2.5 py-1 rounded-full transition-colors">
              ${cat.badge}
            </span>
          </div>

          <h3 class="font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
            ${cat.name}
          </h3>
          <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            ${cat.description}
          </p>
        </div>

        <div class="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
          <span>Смотреть каталог (${cat.count})</span>
          <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // ПОПУЛЯРНЫЕ ТОВАРЫ
  // ==========================================
  renderPopularProducts() {
    const container = document.getElementById("popular-products-container");
    if (!container) return;

    let filtered = PRODUCTS_DATA;
    if (this.currentCategory !== "all") {
      if (this.currentCategory === "satellite-telekarta") {
        filtered = PRODUCTS_DATA.filter(p => p.subCategory === "satellite-telekarta" || p.id === "ozon-1829366751" || p.name.toLowerCase().includes("телекарта"));
      } else if (this.currentCategory === "satellite-otau") {
        filtered = PRODUCTS_DATA.filter(p => p.subCategory === "satellite-otau" || p.id === "ozon-4880651840" || p.name.toLowerCase().includes("отау"));
      } else if (this.currentCategory === "remotes") {
        filtered = PRODUCTS_DATA.filter(p => p.category === "remotes" && p.subCategory !== "satellite-remotes" && p.subCategory !== "otau-remotes");
      } else {
        filtered = PRODUCTS_DATA.filter(p => p.category === this.currentCategory || p.subCategory === this.currentCategory);
      }
    }

    const config = window.SITE_CONFIG || {};
    const currency = config.CURRENCY_SYMBOL || "₸";

    container.innerHTML = filtered.map(product => this.createProductCardHtml(product, currency)).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  createProductCardHtml(p, currency) {
    const isFav = window.Cart ? window.Cart.isFavorite(p.id) : false;
    const isComp = window.Cart ? window.Cart.isCompared(p.id) : false;

    // Бейджи маркетплейсов
    const mpBadges = [];
    if (p.marketplaceLinks) {
      if (p.marketplaceLinks.ozon) {
        mpBadges.push(`<a href="${p.marketplaceLinks.ozon}" target="_blank" onclick="event.stopPropagation()" class="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200/80 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1"><span>Ozon</span></a>`);
      }
      if (p.marketplaceLinks.wildberries) {
        mpBadges.push(`<a href="${p.marketplaceLinks.wildberries}" target="_blank" onclick="event.stopPropagation()" class="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/80 px-2 py-0.5 rounded-md hover:bg-purple-100 transition-colors flex items-center gap-1"><span>Wildberries</span></a>`);
      }
    }

    return `
      <div 
        class="product-card group bg-white border border-slate-200/90 hover:border-blue-400 rounded-3xl p-4 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
        onclick="window.App.openProductModal('${p.id}')"
      >
        <!-- Верхние бейджи и кнопки действий -->
        <div class="relative mb-3">
          <div class="w-full h-48 sm:h-52 bg-white rounded-2xl overflow-hidden relative flex items-center justify-center p-3 border border-slate-100">
            <img 
              src="${p.images[0]}" 
              alt="${p.name}" 
              class="max-w-full max-h-full w-auto h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          <!-- Бейджи товара -->
          <div class="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            ${p.badge ? `
              <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm ${p.badgeType === 'hit' ? 'bg-orange-500 text-white' : p.badgeType === 'sale' ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white'}">
                ${p.badge}
              </span>
            ` : ''}
            ${p.requiresInstallation ? `
              <span class="text-[10px] font-medium bg-slate-900/80 backdrop-blur-md text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                <i data-lucide="wrench" class="w-3 h-3 text-amber-400"></i>
                <span>Монтаж</span>
              </span>
            ` : ''}
          </div>

          <!-- Кнопки избранного и сравнения -->
          <div class="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            <button 
              onclick="event.stopPropagation(); window.Cart.toggleFavorite('${p.id}')" 
              title="В избранное"
              class="w-8 h-8 rounded-full ${isFav ? 'bg-rose-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-600 hover:text-rose-500'} shadow-md flex items-center justify-center transition-all transform active:scale-90"
            >
              <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-current' : ''}"></i>
            </button>
            <button 
              onclick="event.stopPropagation(); window.Cart.toggleCompare('${p.id}')" 
              title="Сравнить"
              class="w-8 h-8 rounded-full ${isComp ? 'bg-blue-600 text-white' : 'bg-white/90 backdrop-blur-md text-slate-600 hover:text-blue-600'} shadow-md flex items-center justify-center transition-all transform active:scale-90"
            >
              <i data-lucide="bar-chart-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Информация о товаре -->
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <!-- Рейтинг и категория -->
            <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span class="font-medium text-slate-500">${p.categoryName}</span>
              <div class="flex items-center gap-1 text-amber-500 font-semibold">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                <span>${p.rating}</span>
                <span class="text-slate-400 font-normal">(${p.reviewCount})</span>
              </div>
            </div>

            <!-- Название -->
            <h4 class="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1.5">
              ${p.name}
            </h4>

            <!-- Краткие характеристики -->
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
              ${p.shortSpecs}
            </p>
          </div>

          <!-- Маркетплейсы наличие -->
          ${mpBadges.length > 0 ? `
            <div class="flex items-center gap-1.5 flex-wrap mb-3 pt-2 border-t border-slate-100">
              <span class="text-[10px] text-slate-400 font-medium">Маркетплейсы:</span>
              ${mpBadges.join('')}
            </div>
          ` : ''}

          <!-- Цена и кнопки -->
          <div class="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <div class="flex items-baseline justify-between">
              <div>
                <span class="font-black text-lg sm:text-xl text-slate-900">${p.price.toLocaleString('ru-RU')} ${currency}</span>
                ${p.oldPrice ? `
                  <span class="text-xs text-slate-400 line-through ml-1.5">${p.oldPrice.toLocaleString('ru-RU')}</span>
                ` : ''}
              </div>
              <span class="text-[11px] font-medium ${p.inStock ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md' : 'text-slate-400'}">
                ${p.inStock ? '● В наличии' : 'Под заказ'}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button 
                onclick="event.stopPropagation(); window.Cart.addItem('${p.id}', 1)"
                class="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
                <span>В корзину</span>
              </button>

              ${p.requiresInstallation ? `
                <button 
                  onclick="event.stopPropagation(); window.Cart.addItem('${p.id}', 1, true)"
                  class="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-medium text-xs py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                  title="Заказать товар с профессиональным монтажом"
                >
                  <i data-lucide="wrench" class="w-3.5 h-3.5 text-amber-400"></i>
                  <span>С монтажом</span>
                </button>
              ` : `
                <button 
                  onclick="event.stopPropagation(); window.App.openQuickOrderModal('${p.id}')"
                  class="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-medium text-xs py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                >
                  <span>В 1 клик</span>
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // УСЛУГИ («Подберём и установим под ключ»)
  // ==========================================
  renderServices() {
    const container = document.getElementById("services-grid-container");
    if (!container) return;

    container.innerHTML = SERVICES_DATA.map(srv => `
      <div class="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
              <i data-lucide="${srv.icon}" class="w-6 h-6"></i>
            </div>
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              ${srv.priceText}
            </span>
          </div>

          <h3 class="font-bold text-lg text-slate-900 mb-2 leading-snug">
            ${srv.title}
          </h3>
          <p class="text-xs text-slate-500 mb-4 leading-relaxed">
            ${srv.description}
          </p>

          <ul class="space-y-2 mb-6">
            ${srv.features.map(f => `
              <li class="flex items-center gap-2 text-xs text-slate-700">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">${srv.badge}</span>
          <button 
            onclick="window.App.openServiceModal('${srv.id}')"
            class="bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Оставить заявку</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // ПРЕИМУЩЕСТВА («Почему нам доверяют»)
  // ==========================================
  renderAdvantages() {
    const container = document.getElementById("advantages-grid-container");
    if (!container) return;

    container.innerHTML = ADVANTAGES_DATA.map(adv => `
      <div class="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:shadow-lg transition-all flex items-start gap-4">
        <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <i data-lucide="${adv.icon}" class="w-6 h-6"></i>
        </div>
        <div>
          <h4 class="font-bold text-base text-slate-900 mb-1.5">${adv.title}</h4>
          <p class="text-xs text-slate-500 leading-relaxed">${adv.text}</p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // ПОРТФОЛИО И ОТЗЫВЫ
  // ==========================================
  renderPortfolio() {
    const container = document.getElementById("portfolio-grid-container");
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.map(item => `
      <div class="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group">
        <div class="h-48 relative overflow-hidden bg-slate-100">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-lg">
            ${item.category}
          </div>
          <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
            ${item.date}
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-sm text-slate-900 mb-2 leading-snug">${item.title}</h4>
            <p class="text-xs text-slate-600 mb-3 leading-relaxed">
              <strong>Задача:</strong> ${item.tasks}
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 text-xs text-emerald-700 bg-emerald-50/70 p-2.5 rounded-xl font-medium flex items-center gap-2">
            <i data-lucide="check" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
            <span>${item.result}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderReviews() {
    const container = document.getElementById("reviews-grid-container");
    if (!container) return;

    container.innerHTML = REVIEWS_DATA.map(rev => `
      <div class="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <img src="${rev.avatar}" alt="${rev.author}" class="w-11 h-11 rounded-full object-cover border-2 border-blue-100">
              <div>
                <h5 class="font-bold text-sm text-slate-900">${rev.author}</h5>
                <span class="text-[11px] text-slate-400">${rev.city} • ${rev.date}</span>
              </div>
            </div>
            <div class="flex text-amber-400">
              ${Array(rev.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-current"></i>').join('')}
            </div>
          </div>

          <div class="mb-3">
            <span class="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
              ${rev.project}
            </span>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed italic">
            «${rev.text}»
          </p>
        </div>

        <div class="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i>
          <span>Проверенный заказ</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // ВИДЖЕТ ПРОВЕРКИ СОВМЕСТИМОСТИ ПУЛЬТОВ
  // ==========================================
  setupRemoteCheckerWidget() {
    const input = document.getElementById("remote-checker-input");
    const resultBox = document.getElementById("remote-checker-result");
    const checkBtn = document.getElementById("remote-checker-btn");

    if (!input || !resultBox) return;

    const performCheck = () => {
      const query = input.value.trim();
      if (!query) {
        resultBox.classList.add("hidden");
        return;
      }

      const result = window.RemoteChecker ? window.RemoteChecker.checkCompatibility(query) : null;
      if (!result) return;

      const config = window.SITE_CONFIG || {};
      const waLink = window.RemoteChecker.getWhatsAppCheckLink(query);

      resultBox.innerHTML = `
        <div class="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 text-left animate-in fade-in duration-300">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
            </span>
            <h5 class="font-bold text-sm text-slate-900">
              ${result.status === "found" ? `Найдена совместимость для ${result.brand}` : 'Универсальное решение'}
            </h5>
          </div>

          <p class="text-xs text-slate-600 mb-3 leading-relaxed">
            ${result.tip}
          </p>

          ${result.recommendedProduct ? `
            <div class="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 items-center mb-3">
              <img src="${result.recommendedProduct.images[0]}" alt="" class="w-14 h-14 object-cover rounded-lg border flex-shrink-0">
              <div class="flex-1 min-w-0">
                <h6 class="font-semibold text-xs text-slate-900 truncate">${result.recommendedProduct.name}</h6>
                <span class="text-blue-600 font-bold text-xs">${result.recommendedProduct.price.toLocaleString('ru-RU')} ${config.CURRENCY_SYMBOL || '₸'}</span>
                <div class="flex gap-2 mt-1.5">
                  <button onclick="window.App.openProductModal('${result.recommendedProduct.id}')" class="text-[11px] bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-md hover:bg-blue-100">
                    Подробнее
                  </button>
                  <button onclick="window.Cart.addItem('${result.recommendedProduct.id}', 1)" class="text-[11px] bg-blue-600 text-white font-medium px-2 py-0.5 rounded-md hover:bg-blue-700">
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ` : ''}

          <div class="flex flex-wrap gap-2 pt-2 border-t border-blue-100 text-xs">
            <a href="${waLink}" target="_blank" class="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl font-medium transition-all shadow-xs">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>Спросить специалиста в WhatsApp</span>
            </a>
            <button onclick="window.App.openCatalogWithCategory('remotes')" class="text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-xl font-medium underline">
              Все пульты в каталоге
            </button>
          </div>
        </div>
      `;

      resultBox.classList.remove("hidden");
      if (window.lucide) window.lucide.createIcons();
    };

    if (checkBtn) checkBtn.onclick = performCheck;
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performCheck();
      }
    });
  }

  // ==========================================
  // КАРТА И 2ГИС БЛОК
  // ==========================================
  setup2GISBlock() {
    const config = window.SITE_CONFIG || {};
    const dgisLink = config.DGIS_LINK || "https://2gis.kz";
    const lng = config.DGIS_COORDS?.lng || 67.52803;
    const lat = config.DGIS_COORDS?.lat || 47.905774;
    const routeLink = `https://2gis.kz/zhezkazgan/routeSearch/rsType/car/to/${lng},${lat}`;

    document.querySelectorAll("a[data-action='open-2gis-route']").forEach(el => el.href = routeLink);
    document.querySelectorAll("a[data-action='open-2gis-card']").forEach(el => el.href = dgisLink);
    document.querySelectorAll("a[data-config='DGIS_LINK']").forEach(el => el.href = dgisLink);
  }

  // ==========================================
  // МОДАЛЬНЫЕ ОКНА И ШТОРКИ
  // ==========================================
  openProductModal(productId) {
    const p = PRODUCTS_DATA.find(prod => prod.id === productId);
    if (!p) return;

    this.selectedProduct = p;
    const modal = document.getElementById("product-detail-modal");
    const container = document.getElementById("product-detail-content");
    if (!modal || !container) return;

    const config = window.SITE_CONFIG || {};
    const currency = config.CURRENCY_SYMBOL || "₸";
    const isFav = window.Cart ? window.Cart.isFavorite(p.id) : false;
    const isComp = window.Cart ? window.Cart.isCompared(p.id) : false;

    // Кнопки маркетплейсов (Ozon и Wildberries)
    const mpButtons = [];
    if (p.marketplaceLinks) {
      if (p.marketplaceLinks.ozon) {
        mpButtons.push(`
          <a href="${p.marketplaceLinks.ozon}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-sm">
            <span class="font-black text-sm">Ozon</span>
            <span>Купить на Ozon</span>
          </a>
        `);
      }
      if (p.marketplaceLinks.wildberries) {
        mpButtons.push(`
          <a href="${p.marketplaceLinks.wildberries}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-sm">
            <span class="font-black text-sm">WB</span>
            <span>Купить на WB</span>
          </a>
        `);
      }
    }

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
        <!-- Галерея фото -->
        <div>
          <div class="w-full h-64 sm:h-80 bg-white rounded-2xl overflow-hidden border border-slate-200 mb-3 relative flex items-center justify-center p-4">
            <img id="product-main-img" src="${p.images[0]}" alt="${p.name}" class="max-w-full max-h-full object-contain mx-auto">
            ${p.badge ? `
              <span class="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg text-white ${p.badgeType === 'hit' ? 'bg-orange-500' : 'bg-blue-600'}">
                ${p.badge}
              </span>
            ` : ''}
          </div>

          ${p.images.length > 1 ? `
            <div class="flex gap-2 overflow-x-auto pb-1">
              ${p.images.map((img, idx) => `
                <button 
                  type="button"
                  onclick="document.getElementById('product-main-img').src='${img}'"
                  class="w-16 h-16 rounded-xl border-2 border-slate-200 hover:border-blue-500 p-1 flex-shrink-0 bg-white flex items-center justify-center cursor-pointer transition-all"
                >
                  <img src="${img}" class="max-w-full max-h-full object-contain mx-auto" />
                </button>
              `).join('')}
            </div>
          ` : ''}

          <!-- Гарантия и доставка -->
          <div class="mt-4 space-y-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-700">
            <div class="flex items-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4 text-blue-600 flex-shrink-0"></i>
              <span>${p.warranty}</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="truck" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
              <span>${p.deliveryInfo}</span>
            </div>
          </div>
        </div>

        <!-- Детали и заказ -->
        <div class="flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Артикул: <strong class="text-slate-700 font-mono">${p.model || p.id}</strong></span>
              <div class="flex items-center gap-1 text-amber-500 font-semibold">
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <span>${p.rating} (${p.reviewCount} отзывов)</span>
              </div>
            </div>

            <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">${p.name}</h2>
            <p class="text-xs text-slate-600 mb-4 leading-relaxed">${p.description}</p>

            <!-- Блок совместимости (если это пульт) -->
            ${p.compatibility ? `
              <div class="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 mb-4 text-xs">
                <div class="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-blue-600"></i>
                  <span>Проверка совместимости:</span>
                </div>
                <p class="text-slate-700 mb-1.5"><strong>Бренд:</strong> ${p.compatibility.brand} (${p.compatibility.supportedYears || 'Все годы'})</p>
                <p class="text-slate-600 text-[11px] mb-2 leading-snug"><strong>Поддерживаемые серии:</strong> ${p.compatibility.supportedTypes.join(', ')}</p>
                <div class="flex items-center justify-between pt-2 border-t border-blue-100">
                  <span class="text-[11px] text-slate-500">Не уверены в совместимости?</span>
                  <a href="${window.RemoteChecker.getWhatsAppCheckLink(p.name)}" target="_blank" class="text-emerald-700 font-bold text-[11px] hover:underline flex items-center gap-1">
                    <i data-lucide="message-circle" class="w-3 h-3"></i> Спросить в WhatsApp
                  </a>
                </div>
              </div>
            ` : ''}

            <!-- Характеристики таблица -->
            <div class="mb-4">
              <h4 class="font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">Характеристики:</h4>
              <div class="bg-slate-50 rounded-xl p-2.5 text-xs space-y-1.5 max-h-40 overflow-y-auto">
                ${Object.entries(p.fullSpecs || {}).map(([key, val]) => `
                  <div class="flex justify-between py-1 border-b border-slate-200/60 last:border-0">
                    <span class="text-slate-500">${key}:</span>
                    <span class="font-semibold text-slate-800 text-right ml-2">${val}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Блок покупки -->
          <div class="pt-4 border-t border-slate-200 space-y-3">
            <div class="flex items-baseline justify-between">
              <div>
                <span class="text-2xl font-black text-slate-900">${p.price.toLocaleString('ru-RU')} ${currency}</span>
                ${p.oldPrice ? `<span class="text-sm text-slate-400 line-through ml-2">${p.oldPrice.toLocaleString('ru-RU')}</span>` : ''}
              </div>
              <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                ${p.inStock ? '● В наличии в магазине' : 'Под заказ'}
              </span>
            </div>

            <!-- Чекбокс монтажа -->
            ${p.requiresInstallation ? `
              <label class="flex items-center justify-between bg-blue-50/60 border border-blue-200/80 p-3 rounded-xl cursor-pointer">
                <div class="flex items-center gap-2">
                  <input type="checkbox" id="modal-install-checkbox" class="w-4 h-4 text-blue-600 rounded border-slate-300">
                  <span class="text-xs font-medium text-slate-800">Добавить профессиональную установку</span>
                </div>
                <span class="text-xs font-bold text-blue-600">+${(p.installationPrice || 4500).toLocaleString('ru-RU')} ${currency}</span>
              </label>
            ` : ''}

            <!-- Прямая покупка -->
            <div class="grid grid-cols-2 gap-2">
              <button 
                onclick="
                  const withInst = document.getElementById('modal-install-checkbox') ? document.getElementById('modal-install-checkbox').checked : false;
                  window.Cart.addItem('${p.id}', 1, withInst);
                  document.getElementById('product-detail-modal').classList.add('hidden');
                  window.App.openCartDrawer();
                "
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md active:scale-98"
              >
                <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                <span>В корзину</span>
              </button>

              <button 
                onclick="window.App.openQuickOrderModal('${p.id}')"
                class="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all active:scale-98"
              >
                <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i>
                <span>Купить в 1 клик</span>
              </button>
            </div>

            <!-- Маркетплейсы -->
            ${mpButtons.length > 0 ? `
              <div class="pt-2">
                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Купить на маркетплейсе:</div>
                <div class="flex gap-2 flex-wrap">
                  ${mpButtons.join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // БЫСТРЫЙ ЗАКАЗ В 1 КЛИК
  // ==========================================
  openQuickOrderModal(productId) {
    const p = PRODUCTS_DATA.find(prod => prod.id === productId);
    if (!p) return;

    const modal = document.getElementById("quick-order-modal");
    const titleEl = document.getElementById("quick-order-product-title");
    const priceEl = document.getElementById("quick-order-product-price");
    const config = window.SITE_CONFIG || {};

    if (titleEl) titleEl.textContent = p.name;
    if (priceEl) priceEl.textContent = `${p.price.toLocaleString('ru-RU')} ${config.CURRENCY_SYMBOL || '₸'}`;

    const form = document.getElementById("quick-order-form");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("quick-order-name").value;
        const phone = document.getElementById("quick-order-phone").value;
        const channel = document.querySelector('input[name="quick-channel"]:checked')?.value || "WhatsApp";

        const text = encodeURIComponent(
          `⚡ *БЫСТРЫЙ ЗАКАЗ В 1 КЛИК*\n` +
          `Товар: ${p.name}\n` +
          `Цена: ${p.price.toLocaleString('ru-RU')} ${config.CURRENCY_SYMBOL || '₸'}\n` +
          `Клиент: ${name}\n` +
          `Телефон: ${phone}\n` +
          `Связь: ${channel}`
        );

        if (channel === "WhatsApp") {
          window.open(`https://wa.me/${config.WHATSAPP_NUMBER || '77778904567'}?text=${text}`, '_blank');
        } else {
          window.open(config.TELEGRAM_LINK || 'https://t.me/profivision_kz', '_blank');
        }

        modal.classList.add("hidden");
        this.showToast("Заявка сформирована! Менеджер ответит в течение 5 минут.");
      };
    }

    if (modal) modal.classList.remove("hidden");
  }

  // ==========================================
  // МОДАЛЬНОЕ ОКНО ЗАКАЗА УСЛУГИ
  // ==========================================
  openServiceModal(serviceId) {
    const srv = SERVICES_DATA.find(s => s.id === serviceId);
    if (!srv) return;

    const modal = document.getElementById("service-order-modal");
    const titleEl = document.getElementById("service-order-title");
    const descEl = document.getElementById("service-order-desc");
    const config = window.SITE_CONFIG || {};

    if (titleEl) titleEl.textContent = srv.title;
    if (descEl) descEl.textContent = `${srv.priceText} • ${srv.description}`;

    const form = document.getElementById("service-order-form");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("service-order-name").value;
        const phone = document.getElementById("service-order-phone").value;
        const address = document.getElementById("service-order-address").value;
        const comment = document.getElementById("service-order-comment").value;

        const text = encodeURIComponent(
          `🛠️ *ЗАЯВКА НА УСЛУГУ*\n` +
          `Услуга: ${srv.title}\n` +
          `Тариф: ${srv.priceText}\n` +
          `---------------------------------\n` +
          `Клиент: ${name}\n` +
          `Телефон: ${phone}\n` +
          `Адрес: ${address || 'Не указан'}\n` +
          `Комментарий: ${comment || '—'}`
        );

        window.open(`https://wa.me/${config.WHATSAPP_NUMBER || '77778904567'}?text=${text}`, '_blank');
        modal.classList.add("hidden");
        this.showToast("Заявка на монтаж отправлена в WhatsApp!");
      };
    }

    if (modal) modal.classList.remove("hidden");
  }

  // ==========================================
  // КАТАЛОГ С ФИЛЬТРАМИ
  // ==========================================
  openCatalogWithCategory(catId) {
    this.currentCategory = catId;
    this.renderPopularProducts();

    // Обновляем активные кнопки табов на главной
    document.querySelectorAll(".category-tab-btn").forEach(btn => {
      const btnCat = btn.getAttribute("data-category");
      if (btnCat === catId) {
        btn.classList.add("bg-blue-600", "text-white");
        btn.classList.remove("bg-white", "text-slate-700");
      } else {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-white", "text-slate-700");
      }
    });

    // Прокручиваем к каталогу
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (drawer) {
      if (window.Cart) window.Cart.renderCartDrawer();
      drawer.classList.remove("hidden");
    }
  }

  closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (drawer) drawer.classList.add("hidden");
  }

  openCheckoutModal() {
    this.closeCartDrawer();
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    const totals = window.Cart ? window.Cart.getTotals() : { grandTotal: 0 };
    const config = window.SITE_CONFIG || {};
    const currency = config.CURRENCY_SYMBOL || "₸";

    // Обновляем сумму в шапке окна оплаты
    const totalEl = document.getElementById("checkout-grand-total");
    if (totalEl) {
      totalEl.textContent = `${totals.grandTotal.toLocaleString('ru-RU')} ${currency}`;
    }

    const cardPayBtnText = document.getElementById("card-pay-btn-text");
    if (cardPayBtnText) {
      cardPayBtnText.textContent = `Оплатить ${totals.grandTotal.toLocaleString('ru-RU')} ${currency} онлайн`;
    }

    // Рендерим ссылки на маркетплейсы
    this.renderCheckoutMarketplaceLinks();
    this.switchPaymentTab('card');

    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  // Переключение вкладок способов оплаты
  switchPaymentTab(tabName) {
    if (window.Cart) window.Cart.currentPaymentMethod = tabName;

    // Скрываем все вкладки
    document.querySelectorAll(".payment-pane").forEach(pane => pane.classList.add("hidden"));
    
    // Сбрасываем стили кнопок
    document.querySelectorAll(".payment-tab-btn").forEach(btn => {
      btn.className = "payment-tab-btn flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all text-slate-600 hover:text-slate-900";
    });

    const activePane = document.getElementById(`payment-pane-${tabName}`);
    const activeBtn = document.getElementById(`tab-btn-${tabName}`);

    if (activePane) activePane.classList.remove("hidden");
    if (activeBtn) {
      if (tabName === "card") {
        activeBtn.className = "payment-tab-btn flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all bg-white text-blue-600 shadow-xs border border-blue-200";
      } else if (tabName === "cash") {
        activeBtn.className = "payment-tab-btn flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all bg-white text-emerald-600 shadow-xs border border-emerald-200";
      } else if (tabName === "marketplaces") {
        activeBtn.className = "payment-tab-btn flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all bg-white text-purple-700 shadow-xs border border-purple-200";
        this.renderCheckoutMarketplaceLinks();
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  renderCheckoutMarketplaceLinks() {
    const container = document.getElementById("checkout-marketplace-links");
    if (!container) return;

    const cart = window.Cart ? window.Cart.cart : [];
    const products = window.PRODUCTS_DATA || [];
    const config = window.SITE_CONFIG || {};
    const currency = config.CURRENCY_SYMBOL || "₸";

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="p-3 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
          В корзине пока нет товаров. Выберите товар в каталоге.
        </div>
      `;
      return;
    }

    container.innerHTML = cart.map(item => {
      const p = products.find(prod => prod.id === item.productId);
      if (!p) return "";
      const ozonLink = p.marketplaceLinks?.ozon || "https://ozon.kz/seller/ip-mihaylenko/";
      const wbLink = p.marketplaceLinks?.wildberries || "https://www.wildberries.ru/seller/250158087";

      return `
        <div class="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-2xs">
          <div class="flex items-center gap-2 min-w-0">
            <img src="${p.images[0]}" alt="" class="w-10 h-10 object-contain rounded-lg border flex-shrink-0 bg-white">
            <div class="min-w-0">
              <h6 class="text-xs font-bold text-slate-900 truncate">${p.name}</h6>
              <span class="text-blue-600 font-bold text-xs">${(p.price * item.quantity).toLocaleString('ru-RU')} ${currency} (${item.quantity} шт.)</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <a href="${ozonLink}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
              <span>Ozon</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
            <a href="${wbLink}" target="_blank" class="bg-purple-700 hover:bg-purple-800 text-white font-bold text-[11px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
              <span>WB</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Форматирование номера карты
  formatCardNumber(input) {
    let val = input.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    input.value = formatted.slice(0, 19);
    const preview = document.getElementById("card-preview-number");
    if (preview) {
      preview.textContent = formatted || "•••• •••• •••• ••••";
    }
  }

  // Форматирование срока действия карты
  formatCardExp(input) {
    let val = input.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    input.value = val.slice(0, 5);
    const preview = document.getElementById("card-preview-exp");
    if (preview) {
      preview.textContent = val || "MM/YY";
    }
  }



  // Обработка оплаты онлайн картой
  handleCardPayment(e) {
    e.preventDefault();
    const btn = document.getElementById("card-pay-btn");
    const btnText = document.getElementById("card-pay-btn-text");

    const cardData = {
      cardNumber: document.getElementById("card-number")?.value,
      exp: document.getElementById("card-exp")?.value,
      cvv: document.getElementById("card-cvv")?.value,
      holder: document.getElementById("card-holder")?.value
    };

    const customerData = {
      name: cardData.holder,
      phone: document.getElementById("card-phone")?.value,
      paymentMethod: 'card'
    };

    if (btn && btnText) {
      btn.disabled = true;
      btn.classList.add("opacity-75", "cursor-wait");
      btnText.textContent = "Проверка 3D-Secure платежа...";
    }

    window.Cart.processCardPayment(cardData, customerData).finally(() => {
      if (btn && btnText) {
        btn.disabled = false;
        btn.classList.remove("opacity-75", "cursor-wait");
      }
    });
  }

  // Обработка заказа с самовывозом / наличными в ТД Арман
  handleCashCheckout(e) {
    e.preventDefault();
    const name = document.getElementById("cash-name")?.value;
    const phone = document.getElementById("cash-phone")?.value;
    const comment = document.getElementById("cash-comment")?.value;

    const customerData = {
      name,
      phone,
      comment,
      deliveryType: 'pickup',
      paymentMethod: 'cash',
      contactMethod: 'WhatsApp'
    };

    window.Cart.sendOrderViaWhatsApp(customerData);
  }

  openFavoritesModal() {
    const modal = document.getElementById("favorites-modal");
    const container = document.getElementById("favorites-modal-items");
    if (!modal || !container) return;

    const favs = window.Cart ? window.Cart.favorites : [];
    const config = window.SITE_CONFIG || {};

    if (favs.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3">
            <i data-lucide="heart" class="w-8 h-8"></i>
          </div>
          <h5 class="font-bold text-slate-800 mb-1">Список избранного пуст</h5>
          <p class="text-xs text-slate-500">Нажимайте на сердечко у товаров, чтобы сохранить их.</p>
        </div>
      `;
    } else {
      const items = PRODUCTS_DATA.filter(p => favs.includes(p.id));
      container.innerHTML = items.map(p => `
        <div class="flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-xl transition-colors">
          <div class="flex items-center gap-3">
            <img src="${p.images[0]}" alt="${p.name}" class="w-12 h-12 object-cover rounded-lg border">
            <div>
              <h6 class="font-semibold text-xs text-slate-900 cursor-pointer hover:text-blue-600" onclick="window.App.openProductModal('${p.id}')">${p.name}</h6>
              <span class="text-blue-600 font-bold text-xs">${p.price.toLocaleString('ru-RU')} ${config.CURRENCY_SYMBOL || '₸'}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.Cart.addItem('${p.id}', 1)" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 text-xs font-medium">
              <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="window.Cart.toggleFavorite('${p.id}'); window.App.openFavoritesModal();" class="text-slate-400 hover:text-red-500 p-2">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  openCompareModal() {
    const modal = document.getElementById("compare-modal");
    const container = document.getElementById("compare-modal-content");
    if (!modal || !container) return;

    const compIds = window.Cart ? window.Cart.compareList : [];
    const config = window.SITE_CONFIG || {};

    if (compIds.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3">
            <i data-lucide="bar-chart-2" class="w-8 h-8"></i>
          </div>
          <h5 class="font-bold text-slate-800 mb-1">Нет товаров для сравнения</h5>
          <p class="text-xs text-slate-500">Добавляйте товары к сравнению с помощью кнопки с графиком на карточке.</p>
        </div>
      `;
    } else {
      const items = PRODUCTS_DATA.filter(p => compIds.includes(p.id));
      container.innerHTML = `
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="p-3 bg-slate-50 font-bold text-slate-700 w-36">Параметр</th>
                ${items.map(p => `
                  <th class="p-3 bg-white min-w-[180px] max-w-[220px]">
                    <img src="${p.images[0]}" class="w-20 h-20 object-cover rounded-xl mx-auto mb-2 border">
                    <h6 class="font-bold text-slate-900 leading-snug line-clamp-2">${p.name}</h6>
                    <span class="text-blue-600 font-black text-sm block mt-1">${p.price.toLocaleString('ru-RU')} ${config.CURRENCY_SYMBOL || '₸'}</span>
                    <button onclick="window.Cart.addItem('${p.id}', 1)" class="w-full bg-blue-600 text-white font-medium py-1.5 rounded-lg mt-2 hover:bg-blue-700">В корзину</button>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr>
                <td class="p-3 bg-slate-50 font-semibold text-slate-600">Категория</td>
                ${items.map(p => `<td class="p-3">${p.categoryName}</td>`).join('')}
              </tr>
              <tr>
                <td class="p-3 bg-slate-50 font-semibold text-slate-600">Бренд</td>
                ${items.map(p => `<td class="p-3">${p.brand || '—'}</td>`).join('')}
              </tr>
              <tr>
                <td class="p-3 bg-slate-50 font-semibold text-slate-600">Монтаж</td>
                ${items.map(p => `<td class="p-3">${p.requiresInstallation ? `Доступен (+${p.installationPrice} ${config.CURRENCY_SYMBOL})` : 'Не требуется'}</td>`).join('')}
              </tr>
              <tr>
                <td class="p-3 bg-slate-50 font-semibold text-slate-600">Гарантия</td>
                ${items.map(p => `<td class="p-3">${p.warranty}</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }

    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  closeCompareModal() {
    const modal = document.getElementById("compare-modal");
    if (modal) modal.classList.add("hidden");
  }

  refreshProductCards() {
    this.renderPopularProducts();
  }

  // ==========================================
  // TOAST УВЕДОМЛЕНИЯ
  // ==========================================
  showToast(message) {
    const toast = document.getElementById("app-toast");
    const textEl = document.getElementById("app-toast-text");
    if (!toast || !textEl) return;

    textEl.textContent = message;
    toast.classList.remove("hidden", "translate-y-12", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("translate-y-0", "opacity-100");
      toast.classList.add("translate-y-12", "opacity-0");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 3200);
  }

  // ==========================================
  // ОБРАБОТЧИКИ СОБЫТИЙ
  // ==========================================
  setupEventListeners() {
    // Табы категорий
    document.querySelectorAll(".category-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        this.openCatalogWithCategory(cat);
      });
    });

    // Живой поиск
    const searchInputs = document.querySelectorAll(".header-search-input");
    searchInputs.forEach(input => {
      input.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase().trim();
        this.filterProductsBySearch(val);
      });
    });

    // Форма чекаута
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.onsubmit = (e) => {
        e.preventDefault();
        const customerData = {
          name: document.getElementById("checkout-name")?.value,
          phone: document.getElementById("checkout-phone")?.value,
          address: document.getElementById("checkout-address")?.value,
          comment: document.getElementById("checkout-comment")?.value,
          contactMethod: document.querySelector('input[name="checkout-channel"]:checked')?.value || "WhatsApp"
        };

        if (customerData.contactMethod === "WhatsApp") {
          window.Cart.sendOrderViaWhatsApp(customerData);
        } else if (customerData.contactMethod === "Telegram") {
          window.Cart.sendOrderViaTelegram(customerData);
        } else {
          window.Cart.requestCallback(customerData);
        }
      };
    }

    // Закрытие модалок по клику на backdrop
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });

    // Кнопки закрытия модалок
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-backdrop") || btn.closest(".drawer-backdrop");
        if (modal) modal.classList.add("hidden");
      });
    });
  }

  filterProductsBySearch(query) {
    const container = document.getElementById("popular-products-container");
    if (!container) return;

    const config = window.SITE_CONFIG || {};
    const currency = config.CURRENCY_SYMBOL || "₸";

    let filtered = PRODUCTS_DATA;
    if (query) {
      filtered = PRODUCTS_DATA.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.shortSpecs.toLowerCase().includes(query) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.model && p.model.toLowerCase().includes(query))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-200">
          <i data-lucide="search-x" class="w-12 h-12 text-slate-300 mx-auto mb-2"></i>
          <h4 class="font-bold text-slate-800">По запросу «${query}» ничего не найдено</h4>
          <p class="text-xs text-slate-500 mt-1">Попробуйте изменить формулировку или спросите нашего онлайн-помощника.</p>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map(product => this.createProductCardHtml(product, currency)).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // НАСТРОЙКИ САЙТА И ПЛЕЙСХОЛДЕРОВ
  // ==========================================
  openSettingsModal() {
    const modal = document.getElementById("settings-modal");
    if (!modal) return;

    const config = window.SITE_CONFIG || {};

    const nameInp = document.getElementById("cfg-company-name");
    const cityInp = document.getElementById("cfg-city");
    const currInp = document.getElementById("cfg-currency");
    const phoneInp = document.getElementById("cfg-phone");
    const waInp = document.getElementById("cfg-whatsapp");
    const tgInp = document.getElementById("cfg-telegram");
    const addrInp = document.getElementById("cfg-address");
    const hrsInp = document.getElementById("cfg-hours");
    const grokKeyInp = document.getElementById("cfg-grok-key");

    if (nameInp) nameInp.value = config.COMPANY_NAME || "";
    if (cityInp) cityInp.value = config.CITY || "";
    if (currInp) currInp.value = config.CURRENCY_SYMBOL || "₸";
    if (phoneInp) phoneInp.value = config.PHONE || "";
    if (waInp) waInp.value = config.WHATSAPP_NUMBER || "";
    if (tgInp) tgInp.value = config.TELEGRAM_LINK || "";
    if (addrInp) addrInp.value = config.ADDRESS || "";
    if (hrsInp) hrsInp.value = config.WORKING_HOURS || "";
    if (grokKeyInp) grokKeyInp.value = localStorage.getItem("pv_grok_key") || config.GROK_API_KEY || "";

    const form = document.getElementById("settings-form");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        config.COMPANY_NAME = nameInp.value;
        config.CITY = cityInp.value;
        config.CURRENCY_SYMBOL = currInp.value;
        config.PHONE = phoneInp.value;
        config.PHONE_RAW = phoneInp.value.replace(/[^0-9+]/g, '');
        config.WHATSAPP_NUMBER = waInp.value;
        config.TELEGRAM_LINK = tgInp.value;
        config.ADDRESS = addrInp.value;
        config.WORKING_HOURS = hrsInp.value;

        if (grokKeyInp && grokKeyInp.value.trim()) {
          const key = grokKeyInp.value.trim();
          config.GROK_API_KEY = key;
          localStorage.setItem("pv_grok_key", key);
          if (window.Assistant) window.Assistant.setApiKey(key);
        }

        window.SITE_CONFIG = config;
        this.injectConfigPlaceholders();
        this.renderPopularProducts();
        if (window.Cart) window.Cart.updateBadges();

        modal.classList.add("hidden");
        this.showToast("Настройки сайта и ключ Grok AI успешно сохранены!");
      };
    }

    modal.classList.remove("hidden");
  }
}

window.App = new MainApp();
document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
