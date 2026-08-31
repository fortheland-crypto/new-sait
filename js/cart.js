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
          <div class="w-20 h-20 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <i data-lucide="shopping-cart" class="w-10 h-10"></i>
          </div>
          <h4 class="text-lg font-bold text-slate-800 mb-1">Ваша корзина пуста</h4>
          <p class="text-slate-500 text-xs max-w-xs mx-auto mb-6">
            В каталоге представлены оригинальные пульты ДУ для LG, Samsung, Sony, Philips, ARG, Отау ТВ, Телекарта и настенные полки.
          </p>
          <div class="flex flex-col gap-2 max-w-xs mx-auto">
            <button onclick="window.App.closeCartDrawer(); window.App.openCatalogWithCategory('all');" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm">
              Перейти в каталог товаров
            </button>
            <a href="https://ozon.kz/seller/ip-mihaylenko/" target="_blank" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5">
              <span>Открыть наш Ozon Магазин</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
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
        <div class="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs hover:border-slate-300 transition-all flex flex-col gap-3">
          <div class="flex gap-3 items-start">
            <img 
              src="${p.images[0]}" 
              alt="${p.name}" 
              class="w-16 h-16 min-w-[4rem] min-h-[4rem] max-w-[4rem] max-h-[4rem] object-contain rounded-xl border border-slate-100 bg-white p-1 flex-shrink-0 cursor-pointer"
              onclick="window.App.openProductModal('${p.id}')"
            >
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-1">
                <h5 
                  class="text-xs font-bold text-slate-900 line-clamp-2 leading-snug hover:text-blue-600 cursor-pointer" 
                  onclick="window.App.openProductModal('${p.id}')"
                >
                  ${p.name}
                </h5>
                <button 
                  type="button"
                  onclick="event.stopPropagation(); window.Cart.removeItem('${p.id}')" 
                  title="Удалить товар" 
                  class="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors flex-shrink-0"
                >
                  <i data-lucide="trash-2" class="w-4 h-4 text-rose-500"></i>
                </button>
              </div>

              <!-- Маркетплейс прямые ссылки для этого товара -->
              <div class="flex items-center gap-1.5 mt-1.5">
                <a 
                  href="${ozonUrl}" 
                  target="_blank" 
                  onclick="event.stopPropagation()" 
                  class="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200 transition-colors"
                >
                  <span>Купить на Ozon</span>
                  <i data-lucide="external-link" class="w-2.5 h-2.5"></i>
                </a>
                <a 
                  href="${wbUrl}" 
                  target="_blank" 
                  onclick="event.stopPropagation()" 
                  class="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded-md border border-purple-200 transition-colors"
                >
                  <span>WB</span>
                  <i data-lucide="external-link" class="w-2.5 h-2.5"></i>
                </a>
              </div>

              <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                <!-- Управление количеством -->
                <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button 
                    type="button"
                    onclick="event.stopPropagation(); window.Cart.updateQuantity('${p.id}', ${item.quantity - 1})" 
                    class="px-2.5 py-1 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
                  >
                    –
                  </button>
                  <span class="px-2.5 py-0.5 text-xs font-bold text-slate-900 bg-white min-w-[24px] text-center">${item.quantity}</span>
                  <button 
                    type="button"
                    onclick="event.stopPropagation(); window.Cart.updateQuantity('${p.id}', ${item.quantity + 1})" 
                    class="px-2.5 py-1 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                <!-- Цена -->
                <div class="text-right">
                  <span class="font-extrabold text-xs sm:text-sm text-slate-900">${itemSubtotal.toLocaleString('ru-RU')} ${currency}</span>
                  ${item.quantity > 1 ? `<span class="block text-[10px] text-slate-400 font-medium">${p.price.toLocaleString('ru-RU')} ${currency}/шт</span>` : ''}
                </div>
              </div>
            </div>
          </div>

          <!-- Опция монтажа/настройки -->
          ${p.requiresInstallation ? `
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700">
                <input 
                  type="checkbox" 
                  ${item.withInstallation ? 'checked' : ''} 
                  onchange="window.Cart.toggleInstallation('${p.id}')"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                >
                <span>Монтаж мастером</span>
              </label>
              <span class="text-xs font-medium ${item.withInstallation ? 'text-blue-600 font-bold' : 'text-slate-400'}">
                +${instPrice.toLocaleString('ru-RU')} ${currency}
              </span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="p-4 bg-white border-t border-slate-200 shadow-lg space-y-3">
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>Товары (${itemsCount} шт.):</span>
              <span class="font-bold text-slate-900">${itemsTotal.toLocaleString('ru-RU')} ${currency}</span>
            </div>
            ${installationTotal > 0 ? `
              <div class="flex justify-between text-blue-700 font-medium">
                <span>Монтаж и настройка:</span>
                <span>+${installationTotal.toLocaleString('ru-RU')} ${currency}</span>
              </div>
            ` : ''}
            <div class="flex justify-between text-slate-600">
              <span>Самовывоз (ТД «Арман»):</span>
              <span class="text-emerald-600 font-bold">Бесплатно</span>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-200 flex justify-between items-baseline">
            <span class="font-extrabold text-sm text-slate-900">ИТОГО К ОПЛАТЕ:</span>
            <span class="font-black text-xl text-blue-600">${grandTotal.toLocaleString('ru-RU')} ${currency}</span>
          </div>

          <!-- Кнопка перехода к способам оплаты -->
          <div class="space-y-2 pt-1">
            <button 
              type="button"
              onclick="window.App.openCheckoutModal()" 
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all transform active:scale-98 text-sm"
            >
              <i data-lucide="credit-card" class="w-5 h-5"></i>
              <span>Выбрать способ оплаты и оформить</span>
            </button>

            <!-- Быстрый заказ в WhatsApp -->
            <button 
              type="button"
              onclick="window.Cart.quickWhatsAppOrder()" 
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-xs"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>Быстрый заказ через WhatsApp</span>
            </button>
          </div>

          <!-- Прямой переход на Ozon Магазин -->
          <div class="pt-2 text-center border-t border-slate-100">
            <a 
              href="https://ozon.kz/seller/ip-mihaylenko/" 
              target="_blank" 
              class="text-[11px] text-slate-500 hover:text-blue-600 font-medium inline-flex items-center gap-1"
            >
              <span>Или закажите напрямую в приложении Ozon</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
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
        <div class="text-center py-2">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
            <i data-lucide="check-circle" class="w-10 h-10"></i>
          </div>

          <span class="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
            ✓ Оплата успешно принята
          </span>

          <h3 class="text-xl font-black text-slate-900 mt-2 mb-1">Электронный чек заказа</h3>
          <p class="text-xs text-slate-500 mb-4">Номер заказа: <strong class="text-blue-600 font-mono text-sm font-bold">#${order.orderId}</strong></p>

          <!-- Бланк чека -->
          <div class="bg-slate-50 border border-slate-300 rounded-2xl p-4 text-left mb-4 text-xs font-mono text-slate-800 space-y-2 shadow-inner">
            <div class="text-center font-bold pb-2 border-b border-dashed border-slate-300">
              МАГАЗИН ELECTROSAT<br>
              <span class="text-[10px] font-normal text-slate-500">г. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман»</span>
            </div>

            <div class="flex justify-between pt-1">
              <span>Транзакция:</span>
              <span class="font-bold">${order.transactionId || 'TXN-OK-2026'}</span>
            </div>
            <div class="flex justify-between">
              <span>Дата и время:</span>
              <span>${dateStr}</span>
            </div>
            <div class="flex justify-between">
              <span>Карта:</span>
              <span>•••• ${order.cardLast4 || '4400'} (Visa/Mastercard)</span>
            </div>
            <div class="flex justify-between">
              <span>Покупатель:</span>
              <span>${order.customerData?.name || 'Клиент'}</span>
            </div>

            <div class="pt-2 border-t border-dashed border-slate-300 flex justify-between font-black text-sm text-slate-900">
              <span>ИТОГО ОПЛАЧЕНО:</span>
              <span class="text-emerald-700">${order.grandTotal.toLocaleString('ru-RU')} ${order.currency}</span>
            </div>
            <div class="text-[10px] text-center text-slate-400 pt-1">
              Чек сформирован автоматически. Товар забронирован.
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-left flex items-start gap-2.5">
            <i data-lucide="clock" class="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5"></i>
            <div class="text-xs text-blue-900 leading-snug">
              Менеджер магазина свяжется с вами по телефону <strong>${order.customerData?.phone || '+7 (705) 220-25-75'}</strong> для согласования получения.
            </div>
          </div>

          <div class="space-y-2">
            <a 
              href="https://wa.me/${config.WHATSAPP_NUMBER || '77052202575'}?text=${encodeURIComponent(`Здравствуйте! Я оплатил заказ #${order.orderId} на сумму ${order.grandTotal} ${order.currency}. Чек: ${order.transactionId}`)}" 
              target="_blank" 
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 text-xs"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>Отправить чек в WhatsApp магазина</span>
            </a>

            <button 
              onclick="document.getElementById('thankyou-modal').classList.add('hidden')" 
              class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 rounded-xl transition-colors"
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
        <div class="text-center py-2">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
            <i data-lucide="check-circle-2" class="w-10 h-10"></i>
          </div>
          <span class="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
            Заказ успешно сформирован
          </span>
          <h3 class="text-xl font-black text-slate-900 mt-2 mb-1">Спасибо за заказ в ElectroSat!</h3>
          <p class="text-slate-500 text-xs mb-4">Номер вашей заявки: <strong class="text-blue-600 font-mono text-sm font-bold">#${order.orderId}</strong></p>

          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-left mb-4 max-h-48 overflow-y-auto text-[11px] font-mono text-slate-700 leading-relaxed whitespace-pre-wrap select-all">
${order.text}
          </div>

          <div class="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-left flex items-start gap-2.5">
            <i data-lucide="map-pin" class="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5"></i>
            <div class="text-xs text-blue-900 leading-snug">
              <strong class="font-bold block mb-0.5">Самовывоз: г. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман»</strong>
              Режим работы: Пн–Сб 11:00–19:00, Вс 11:00–17:00.
            </div>
          </div>

          <div class="space-y-2">
            <a href="https://wa.me/${config.WHATSAPP_NUMBER || '77052202575'}?text=${encodeURIComponent(order.text)}" target="_blank" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 text-xs">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>Открыть и подтвердить в WhatsApp</span>
            </a>
            <button onclick="window.Cart.copyOrderText()" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors">
              <i data-lucide="copy" class="w-4 h-4"></i>
              <span>Скопировать текст заказа</span>
            </button>
            <button onclick="document.getElementById('thankyou-modal').classList.add('hidden')" class="w-full text-slate-500 hover:text-slate-700 text-xs py-1.5">
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
