/**
 * МОДУЛЬ КОРЗИНЫ, ОПЛАТЫ, ИЗБРАННОГО И ОФОРМЛЕНИЯ ЗАКАЗОВ ДЛЯ ELECTROSAT
 * Поддерживает:
 * 1. Оплату онлайн картой (Visa / Mastercard / Kaspi Gold) с генерацией фискального чека
 * 2. Оплату через Kaspi QR / Kaspi переводы
 * 3. Прямой переход и покупку на маркетплейсах Ozon и Wildberries
 * 4. Заказ и подтверждение через WhatsApp и Telegram
 * 5. Оплату при получении / самовывоз в г. Сатпаев (ТД «Арман»)
 */

class CartManager {
  constructor() {
    this.cart = this.sanitizeCart(this.loadFromStorage("pv_cart", []));
    this.favorites = this.loadFromStorage("pv_favorites", []);
    this.compareList = this.loadFromStorage("pv_compare", []);
    this.lastOrder = null;
    this.currentPaymentMethod = "card"; // 'card' | 'cash' | 'marketplaces'
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Storage read error", e);
      return fallback;
    }
  }

  saveToStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }

  // Очистка от невалидных/устаревших ID товаров
  sanitizeCart(cartArray) {
    if (!Array.isArray(cartArray)) return [];
    const validProducts = window.PRODUCTS_DATA || [];
    if (validProducts.length === 0) return cartArray;
    return cartArray.filter(item => validProducts.some(p => p.id === item.productId));
  }

  // ==========================================
  // КОРЗИНА (Cart)
  // ==========================================
  addItem(productId, quantity = 1, withInstallation = false) {
    const products = window.PRODUCTS_DATA || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    this.cart = this.sanitizeCart(this.cart);
    const existing = this.cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
      if (withInstallation) existing.withInstallation = true;
    } else {
      this.cart.push({
        productId,
        quantity,
        withInstallation: withInstallation && product.requiresInstallation
      });
    }

    this.saveToStorage("pv_cart", this.cart);
    this.updateBadges();
    this.notify(`«${product.name.slice(0, 28)}...» добавлен в корзину!`);
    
    // Если шторка открыта — обновляем её
    const drawer = document.getElementById("cart-drawer");
    if (drawer && !drawer.classList.contains("hidden")) {
      this.renderCartDrawer();
    }
  }

  removeItem(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveToStorage("pv_cart", this.cart);
    this.updateBadges();
    this.renderCartDrawer();
    this.notify("Товар удалён из корзины");
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveToStorage("pv_cart", this.cart);
      this.updateBadges();
      this.renderCartDrawer();
    }
  }

  toggleInstallation(productId) {
    const item = this.cart.find(item => item.productId === productId);
    if (item) {
      item.withInstallation = !item.withInstallation;
      this.saveToStorage("pv_cart", this.cart);
      this.renderCartDrawer();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage("pv_cart", this.cart);
    this.updateBadges();
    this.renderCartDrawer();
    this.notify("Корзина очищена");
  }

  getTotals() {
    this.cart = this.sanitizeCart(this.cart);
    const products = window.PRODUCTS_DATA || [];
    let itemsTotal = 0;
    let installationTotal = 0;
    let itemsCount = 0;

    this.cart.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        itemsCount += item.quantity;
        itemsTotal += product.price * item.quantity;
        if (item.withInstallation && product.installationPrice) {
          installationTotal += product.installationPrice * item.quantity;
        }
      }
    });

    const grandTotal = itemsTotal + installationTotal;

    return {
      itemsCount,
      itemsTotal,
      installationTotal,
      grandTotal
    };
  }

  // ==========================================
  // ИЗБРАННОЕ (Favorites / Wishlist)
  // ==========================================
  toggleFavorite(productId) {
    const idx = this.favorites.indexOf(productId);
    const products = window.PRODUCTS_DATA || [];
    const product = products.find(p => p.id === productId);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      this.notify(`Товар удалён из избранного`);
    } else {
      this.favorites.push(productId);
      this.notify(`«${product?.name.slice(0, 25)}...» в избранном! ❤️`);
    }
    this.saveToStorage("pv_favorites", this.favorites);
    this.updateBadges();
    if (window.App) window.App.refreshProductCards();
  }

  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  // ==========================================
  // СРАВНЕНИЕ (Compare)
  // ==========================================
  toggleCompare(productId) {
    const idx = this.compareList.indexOf(productId);
    if (idx > -1) {
      this.compareList.splice(idx, 1);
      this.notify(`Товар удалён из сравнения`);
    } else {
      if (this.compareList.length >= 4) {
        alert("Для сравнения можно выбрать не более 4 товаров одновременно.");
        return;
      }
      this.compareList.push(productId);
      this.notify(`Товар добавлен к сравнению! ⚖️`);
    }
    this.saveToStorage("pv_compare", this.compareList);
    this.updateBadges();
    if (window.App) window.App.refreshProductCards();
  }

  isCompared(productId) {
    return this.compareList.includes(productId);
  }

  clearCompare() {
    this.compareList = [];
    this.saveToStorage("pv_compare", this.compareList);
    this.updateBadges();
    if (window.App) {
      window.App.refreshProductCards();
      window.App.closeCompareModal();
    }
  }

  // ==========================================
  // ОБНОВЛЕНИЕ СЧЕТЧИКОВ НА САЙТЕ
  // ==========================================
  updateBadges() {
    const { itemsCount } = this.getTotals();
    const favCount = this.favorites.length;
    const compCount = this.compareList.length;

    // Счетчики корзины
    document.querySelectorAll(".cart-count-badge").forEach(badge => {
      badge.textContent = itemsCount;
      badge.classList.toggle("hidden", itemsCount === 0);
    });

    // Счетчики избранного
    document.querySelectorAll(".fav-count-badge").forEach(badge => {
      badge.textContent = favCount;
      badge.classList.toggle("hidden", favCount === 0);
    });

    // Счетчики сравнения
    document.querySelectorAll(".compare-count-badge").forEach(badge => {
      badge.textContent = compCount;
      badge.classList.toggle("hidden", compCount === 0);
    });
  }

  notify(message) {
    if (window.App && typeof window.App.showToast === "function") {
      window.App.showToast(message);
    }
  }

  // ==========================================
  // РЕНДЕРИНГ ШТОРКИ КОРЗИНЫ
  // ==========================================
  renderCartDrawer() {
    const container = document.getElementById("cart-drawer-items");
    const summaryContainer = document.getElementById("cart-drawer-summary");
    if (!container) return;

    this.cart = this.sanitizeCart(this.cart);
    const products = window.PRODUCTS_DATA || [];
    const config = window.SITE_CONFIG || {};
    const currency = config.CURRENCY_SYMBOL || "₸";
    const { itemsTotal, installationTotal, grandTotal, itemsCount } = this.getTotals();

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-20 h-20 bg-surface-container-low text-text-muted rounded-3xl flex items-center justify-center mx-auto mb-4 border border-border-subtle">
            <span class="material-symbols-outlined text-[36px]">shopping_cart</span>
          </div>
          <h4 class="text-lg font-bold text-text-primary mb-1">Ваша корзина пуста</h4>
          <p class="text-text-muted text-xs max-w-xs mx-auto mb-6">
            В каталоге представлены оригинальные пульты ДУ для LG, Samsung, Sony, Philips, ARG, Отау ТВ, Телекарта и настенные полки.
          </p>
          <div class="flex flex-col gap-2 max-w-xs mx-auto">
            <button onclick="window.App.closeCartDrawer(); window.App.openCatalogWithCategory('all');" class="w-full bg-primary hover:bg-blue-600 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm">
              Перейти в каталог товаров
            </button>
            <a href="https://ozon.kz/seller/ip-mihaylenko/" target="_blank" class="w-full bg-surface-container-low hover:bg-surface-container text-text-primary border border-border-subtle font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5">
              <span>Открыть наш Ozon Магазин</span>
              <span class="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      `;
      if (summaryContainer) summaryContainer.innerHTML = "";
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = this.cart.map(item => {
      const p = products.find(prod => prod.id === item.productId);
      if (!p) return "";
      const itemSubtotal = p.price * item.quantity;
      const instPrice = (p.installationPrice || 0) * item.quantity;
      const ozonUrl = p.marketplaceLinks?.ozon || "https://ozon.kz/seller/ip-mihaylenko/";
      const wbUrl = p.marketplaceLinks?.wildberries || "https://www.wildberries.ru/seller/250158087";

      return `
        <div class="bg-surface-card border border-border-subtle rounded-2xl p-3.5 shadow-xl hover:border-primary/40 transition-all flex flex-col gap-3">
          <div class="flex gap-3 items-start">
            <img 
              src="${p.images[0]}" 
              alt="${p.name}" 
              class="w-16 h-16 min-w-[4rem] min-h-[4rem] max-w-[4rem] max-h-[4rem] object-contain rounded-xl border border-border-subtle bg-surface-container-lowest p-1 flex-shrink-0 cursor-pointer"
              onclick="window.App.openProductModal('${p.id}')"
            >
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-1">
                <h5 
                  class="text-xs font-bold text-text-primary line-clamp-2 leading-snug hover:text-primary cursor-pointer" 
                  onclick="window.App.openProductModal('${p.id}')"
                >
                  ${p.name}
                </h5>
                <button 
                  type="button"
                  onclick="event.stopPropagation(); window.Cart.removeItem('${p.id}')" 
                  title="Удалить товар" 
                  class="text-text-muted hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition-colors flex-shrink-0"
                >
                  <span class="material-symbols-outlined text-[18px] text-rose-400">delete</span>
                </button>
              </div>

              <!-- Маркетплейс прямые ссылки для этого товара -->
              <div class="flex items-center gap-1.5 mt-1.5">
                <a 
                  href="${ozonUrl}" 
                  target="_blank" 
                  onclick="event.stopPropagation()" 
                  class="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-0.5 rounded-md border border-blue-500/30 transition-colors"
                >
                  <span>Купить на Ozon</span>
                  <span class="material-symbols-outlined text-[12px]">open_in_new</span>
                </a>
                <a 
                  href="${wbUrl}" 
                  target="_blank" 
                  onclick="event.stopPropagation()" 
                  class="inline-flex items-center gap-1 text-[10px] font-bold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-500/30 transition-colors"
                >
                  <span>WB</span>
                  <span class="material-symbols-outlined text-[12px]">open_in_new</span>
                </a>
              </div>

              <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-border-subtle">
                <!-- Управление количеством -->
                <div class="flex items-center border border-border-subtle rounded-lg overflow-hidden bg-surface-container-low">
                  <button 
                    type="button"
                    onclick="event.stopPropagation(); window.Cart.updateQuantity('${p.id}', ${item.quantity - 1})" 
                    class="px-2.5 py-1 text-text-primary hover:bg-surface-container text-xs font-bold transition-colors"
                  >
                    –
                  </button>
                  <span class="px-2.5 py-0.5 text-xs font-bold text-text-primary bg-surface-card min-w-[24px] text-center">${item.quantity}</span>
                  <button 
                    type="button"
                    onclick="event.stopPropagation(); window.Cart.updateQuantity('${p.id}', ${item.quantity + 1})" 
                    class="px-2.5 py-1 text-text-primary hover:bg-surface-container text-xs font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                <!-- Цена -->
                <div class="text-right">
                  <span class="font-extrabold text-xs sm:text-sm text-text-primary">${itemSubtotal.toLocaleString('ru-RU')} ${currency}</span>
                  ${item.quantity > 1 ? `<span class="block text-[10px] text-text-muted font-medium">${p.price.toLocaleString('ru-RU')} ${currency}/шт</span>` : ''}
                </div>
              </div>
            </div>
          </div>

          <!-- Опция монтажа/настройки -->
          ${p.requiresInstallation ? `
            <div class="pt-2 border-t border-border-subtle flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer select-none text-xs text-text-muted">
                <input 
                  type="checkbox" 
                  ${item.withInstallation ? 'checked' : ''} 
                  onchange="window.Cart.toggleInstallation('${p.id}')"
                  class="rounded border-border-subtle text-primary bg-surface-container-low focus:ring-primary w-4 h-4 cursor-pointer"
                >
                <span class="text-text-primary">Монтаж мастером</span>
              </label>
              <span class="text-xs font-medium ${item.withInstallation ? 'text-primary font-bold' : 'text-text-muted'}">
                +${instPrice.toLocaleString('ru-RU')} ${currency}
              </span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="p-4 bg-surface-card border-t border-border-subtle shadow-lg space-y-3">
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between text-text-muted">
              <span>Товары (${itemsCount} шт.):</span>
              <span class="font-bold text-text-primary">${itemsTotal.toLocaleString('ru-RU')} ${currency}</span>
            </div>
            ${installationTotal > 0 ? `
              <div class="flex justify-between text-primary font-medium">
                <span>Монтаж и настройка:</span>
                <span>+${installationTotal.toLocaleString('ru-RU')} ${currency}</span>
              </div>
            ` : ''}
            <div class="flex justify-between text-text-muted">
              <span>Самовывоз (ТД «Арман»):</span>
              <span class="text-whatsapp-green font-bold">Бесплатно</span>
            </div>
          </div>

          <div class="pt-2 border-t border-border-subtle flex justify-between items-baseline">
            <span class="font-extrabold text-sm text-text-primary">ИТОГО К ОПЛАТЕ:</span>
            <span class="font-black text-xl text-primary">${grandTotal.toLocaleString('ru-RU')} ${currency}</span>
          </div>

          <!-- Кнопка перехода к способам оплаты -->
          <div class="space-y-2 pt-1">
            <button 
              type="button"
              onclick="window.App.openCheckoutModal()" 
              class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all transform active:scale-98 text-sm"
            >
              <span class="material-symbols-outlined text-[18px]">credit_card</span>
              <span>Выбрать способ оплаты и оформить</span>
            </button>

            <!-- Быстрый заказ в WhatsApp -->
            <button 
              type="button"
              onclick="window.Cart.quickWhatsAppOrder()" 
              class="w-full bg-whatsapp-green hover:bg-emerald-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-xs"
            >
              <span class="material-symbols-outlined text-[16px]">chat</span>
              <span>Быстрый заказ через WhatsApp</span>
            </button>
          </div>

          <!-- Прямой переход на Ozon Магазин -->
          <div class="pt-2 text-center border-t border-border-subtle">
            <a 
              href="https://ozon.kz/seller/ip-mihaylenko/" 
              target="_blank" 
              class="text-[11px] text-text-muted hover:text-primary font-medium inline-flex items-center gap-1"
            >
              <span>Или закажите напрямую в приложении Ozon</span>
              <span class="material-symbols-outlined text-[12px]">open_in_new</span>
            </a>
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // ГЕНЕРАЦИЯ СООБЩЕНИЯ ЗАКАЗА
  // ==========================================
  generateOrderText(customerData = {}) {
    const config = window.SITE_CONFIG || {};
    const currency = config.CURRENCY_SYMBOL || "₸";
    const orderId = "ES-" + Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Date().toLocaleString("ru-RU", { 
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const { itemsTotal, installationTotal, grandTotal } = this.getTotals();
    const payMethodName = {
      card: "Банковская карта (Оплачено онлайн)",
      cash: "Оплата при получении (Самовывоз / Курьер)",
      marketplaces: "Покупка на Ozon / WB"
    }[customerData.paymentMethod || this.currentPaymentMethod] || "Банковская карта (Онлайн)";

    let text = `📦 *ЗАКАЗ В МАГАЗИН ELECTROSAT №${orderId}*\n`;
    text += `📅 Дата: ${dateStr}\n`;
    text += `💳 *Способ оплаты:* ${payMethodName}\n`;
    text += `---------------------------------\n`;
    text += `👤 *Клиент:* ${customerData.name || 'Покупатель'}\n`;
    text += `📱 *Телефон:* ${customerData.phone || config.PHONE || '87052202575'}\n`;
    if (customerData.deliveryType === 'pickup') {
      text += `🏬 *Получение:* Самовывоз (г. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман»)\n`;
    } else if (customerData.address) {
      text += `📍 *Адрес доставки:* ${customerData.address}\n`;
    }
    if (customerData.comment) {
      text += `📝 *Комментарий:* ${customerData.comment}\n`;
    }
    text += `---------------------------------\n`;
    text += `🛒 *СОСТАВ ЗАКАЗА:*\n\n`;

    const products = window.PRODUCTS_DATA || [];
    this.cart.forEach((item, idx) => {
      const p = products.find(prod => prod.id === item.productId);
      if (p) {
        const itemSum = p.price * item.quantity;
        text += `${idx + 1}. *${p.name}*\n`;
        text += `   • Кол-во: ${item.quantity} шт. × ${p.price.toLocaleString('ru-RU')} ${currency} = *${itemSum.toLocaleString('ru-RU')} ${currency}*\n`;
        if (p.marketplaceLinks?.ozon) {
          text += `   • Ozon: ${p.marketplaceLinks.ozon}\n`;
        }
        if (item.withInstallation && p.installationPrice) {
          const instSum = p.installationPrice * item.quantity;
          text += `   • 🛠️ _Установка:_ +${instSum.toLocaleString('ru-RU')} ${currency}\n`;
        }
        text += `\n`;
      }
    });

    text += `---------------------------------\n`;
    text += `💵 Товары: ${itemsTotal.toLocaleString('ru-RU')} ${currency}\n`;
    if (installationTotal > 0) {
      text += `🛠️ Монтаж: ${installationTotal.toLocaleString('ru-RU')} ${currency}\n`;
    }
    text += `💰 *ИТОГО К ОПЛАТЕ: ${grandTotal.toLocaleString('ru-RU')} ${currency}*\n`;
    text += `---------------------------------\n`;
    text += `Магазин: ElectroSat, г. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман»\n`;
    text += `Телефон / WhatsApp: +7 (705) 220-25-75`;

    return {
      orderId,
      text,
      grandTotal,
      currency,
      customerData,
      payMethodName
    };
  }

  // Быстрый заказ корзины через WhatsApp без ввода формы
  quickWhatsAppOrder() {
    if (this.cart.length === 0) {
      alert("Корзина пуста. Добавьте товары для заказа.");
      return;
    }
    const order = this.generateOrderText({ name: "Клиент с сайта", paymentMethod: "card" });
    this.lastOrder = order;
    const config = window.SITE_CONFIG || {};
    const phone = config.WHATSAPP_NUMBER || "77052202575";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(order.text)}`;
    window.open(url, '_blank');
    this.showThankYouScreen(order);
  }

  // ==========================================
  // ОПЛАТА ОНЛАЙН КАРТОЙ (Эмуляция платежного шлюза)
  // ==========================================
  processCardPayment(cardData, customerData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = this.generateOrderText({ ...customerData, paymentMethod: "card" });
        order.isPaid = true;
        order.cardLast4 = (cardData.cardNumber || "4400").replace(/\s/g, '').slice(-4);
        order.transactionId = "TXN-" + Math.floor(10000000 + Math.random() * 90000000);
        this.lastOrder = order;
        this.clearCart();
        this.showFiscalReceiptScreen(order);
        resolve(order);
      }, 1200);
    });
  }

  // ==========================================
  // ЭКРАН ФИСКАЛЬНОГО ЧЕКА ОБ ОПЛАТЕ
  // ==========================================
  showFiscalReceiptScreen(order) {
    const checkoutModal = document.getElementById("checkout-modal");
    if (checkoutModal) checkoutModal.classList.add("hidden");

    const thankYouModal = document.getElementById("thankyou-modal");
    if (!thankYouModal) return;

    const config = window.SITE_CONFIG || {};
    const container = document.getElementById("thankyou-modal-content");
    const dateStr = new Date().toLocaleString("ru-RU", { 
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });

    if (container) {
      container.innerHTML = `
        <div class="text-center py-2 text-text-primary">
          <div class="w-16 h-16 bg-whatsapp-green/20 text-whatsapp-green rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce border border-whatsapp-green/30">
            <span class="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <span class="text-xs font-bold uppercase tracking-wider bg-whatsapp-green/10 text-whatsapp-green px-3 py-1 rounded-full border border-whatsapp-green/30">
            ✓ Оплата успешно принята
          </span>

          <h3 class="text-xl font-black text-text-primary mt-3 mb-1">Электронный чек заказа</h3>
          <p class="text-xs text-text-muted mb-4">Номер заказа: <strong class="text-primary font-mono text-sm font-bold">#${order.orderId}</strong></p>

          <!-- Бланк чека -->
          <div class="bg-surface-container-lowest border border-border-subtle rounded-2xl p-4 text-left mb-4 text-xs font-mono text-text-primary space-y-2 shadow-inner">
            <div class="text-center font-bold pb-2 border-b border-dashed border-border-subtle text-text-primary">
              МАГАЗИН ELECTROSAT<br>
              <span class="text-[10px] font-normal text-text-muted">г. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман»</span>
            </div>

            <div class="flex justify-between pt-1 text-text-muted">
              <span>Транзакция:</span>
              <span class="font-bold text-text-primary">${order.transactionId || 'TXN-OK-2026'}</span>
            </div>
            <div class="flex justify-between text-text-muted">
              <span>Дата и время:</span>
              <span class="text-text-primary">${dateStr}</span>
            </div>
            <div class="flex justify-between text-text-muted">
              <span>Карта:</span>
              <span class="text-text-primary">•••• ${order.cardLast4 || '4400'} (Visa/Mastercard)</span>
            </div>
            <div class="flex justify-between text-text-muted">
              <span>Покупатель:</span>
              <span class="text-text-primary">${order.customerData?.name || 'Клиент'}</span>
            </div>

            <div class="pt-2 border-t border-dashed border-border-subtle flex justify-between font-black text-sm text-text-primary">
              <span>ИТОГО ОПЛАЧЕНО:</span>
              <span class="text-whatsapp-green">${order.grandTotal.toLocaleString('ru-RU')} ${order.currency}</span>
            </div>
            <div class="text-[10px] text-center text-text-muted pt-1">
              Чек сформирован автоматически. Товар забронирован.
            </div>
          </div>

          <div class="bg-primary/10 border border-primary/20 rounded-xl p-3 mb-4 text-left flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">schedule</span>
            <div class="text-xs text-text-primary leading-snug">
              Менеджер магазина свяжется с вами по телефону <strong class="text-primary">${order.customerData?.phone || '+7 (705) 220-25-75'}</strong> для согласования получения.
            </div>
          </div>

          <div class="space-y-2">
            <a 
              href="https://wa.me/${config.WHATSAPP_NUMBER || '77052202575'}?text=${encodeURIComponent(`Здравствуйте! Я оплатил заказ #${order.orderId} на сумму ${order.grandTotal} ${order.currency}. Чек: ${order.transactionId}`)}" 
              target="_blank" 
              class="w-full bg-whatsapp-green hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 text-xs"
            >
              <span class="material-symbols-outlined text-[18px]">chat</span>
              <span>Отправить чек в WhatsApp магазина</span>
            </a>

            <button 
              onclick="document.getElementById('thankyou-modal').classList.add('hidden')" 
              class="w-full bg-surface-container-low hover:bg-surface-container text-text-primary border border-border-subtle text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              Вернуться на главную страницу
            </button>
          </div>
        </div>
      `;
    }

    thankYouModal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // ЭКРАН УСПЕШНОГО ЗАКАЗА ЧЕРЕЗ KASPI / НАЛИЧНЫЕ
  // ==========================================
  showThankYouScreen(order) {
    const checkoutModal = document.getElementById("checkout-modal");
    if (checkoutModal) checkoutModal.classList.add("hidden");

    const thankYouModal = document.getElementById("thankyou-modal");
    if (!thankYouModal) return;

    const config = window.SITE_CONFIG || {};
    const container = document.getElementById("thankyou-modal-content");
    if (container) {
      container.innerHTML = `
        <div class="text-center py-2 text-text-primary">
          <div class="w-16 h-16 bg-whatsapp-green/20 text-whatsapp-green rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce border border-whatsapp-green/30">
            <span class="material-symbols-outlined text-[36px]">check_circle</span>
          </div>
          <span class="text-xs font-bold uppercase tracking-wider bg-whatsapp-green/10 text-whatsapp-green px-3 py-1 rounded-full border border-whatsapp-green/30">
            Заказ успешно сформирован
          </span>
          <h3 class="text-xl font-black text-text-primary mt-3 mb-1">Спасибо за заказ в ElectroSat!</h3>
          <p class="text-text-muted text-xs mb-4">Номер вашей заявки: <strong class="text-primary font-mono text-sm font-bold">#${order.orderId}</strong></p>

          <div class="bg-surface-container-lowest border border-border-subtle rounded-2xl p-3.5 text-left mb-4 max-h-48 overflow-y-auto text-[11px] font-mono text-text-muted leading-relaxed whitespace-pre-wrap select-all">
${order.text}
          </div>

          <div class="bg-primary/10 border border-primary/20 rounded-xl p-3 mb-4 text-left flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">location_on</span>
            <div class="text-xs text-text-primary leading-snug">
              <strong class="font-bold block mb-0.5 text-text-primary">Самовывоз: г. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман»</strong>
              Режим работы: Пн–Сб 11:00–19:00, Вс 11:00–17:00.
            </div>
          </div>

          <div class="space-y-2">
            <a href="https://wa.me/${config.WHATSAPP_NUMBER || '77052202575'}?text=${encodeURIComponent(order.text)}" target="_blank" class="w-full bg-whatsapp-green hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 text-xs">
              <span class="material-symbols-outlined text-[18px]">chat</span>
              <span>Открыть и подтвердить в WhatsApp</span>
            </a>
            <button onclick="window.Cart.copyOrderText()" class="w-full bg-surface-container-low hover:bg-surface-container text-text-primary border border-border-subtle font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors">
              <span class="material-symbols-outlined text-[16px]">content_copy</span>
              <span>Скопировать текст заказа</span>
            </button>
            <button onclick="document.getElementById('thankyou-modal').classList.add('hidden')" class="w-full text-text-muted hover:text-text-primary text-xs py-1.5">
              Закрыть окно
            </button>
          </div>
        </div>
      `;
    }

    thankYouModal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  copyOrderText() {
    if (this.lastOrder && navigator.clipboard) {
      navigator.clipboard.writeText(this.lastOrder.text).then(() => {
        this.notify("Текст заказа скопирован в буфер обмена!");
      });
    }
  }
}

window.Cart = new CartManager();
