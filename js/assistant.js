/**
 * ИНТЕРАКТИВНЫЙ ОНЛАЙН-ПОМОЩНИК И КВИЗ-БОТ
 * Помогает клиенту в диалоге подобрать видеонаблюдение, пульт или спутниковое ТВ,
 * показывает карточки товаров прямо в чате и при необходимости переводит в WhatsApp/Telegram.
 */
class AssistantBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.currentStep = "init";
    this.userAnswers = {};
    this.unreadCount = 1;
    this.init();
  }

  init() {
    const config = window.SITE_CONFIG || {};
    const company = config.COMPANY_NAME || "ElectroSat";
    this.messages.push({
      sender: "bot",
      time: this.getCurrentTime(),
      text: `Здравствуйте! 👋 Я онлайн-помощник ${company}. Помогу быстро подобрать видеонаблюдение, пульт или спутниковое оборудование, либо рассчитать стоимость установки.`,
      options: [
        { label: "📹 Подобрать видеонаблюдение", action: "start_cctv" },
        { label: "📺 Найти пульт для ТВ / техники", action: "start_remote" },
        { label: "📡 Спутниковое ТВ (Отау ТВ)", action: "start_satellite" },
        { label: "🛠️ Рассчитать стоимость монтажа", action: "start_installation" },
        { label: "💬 Написать сразу в WhatsApp", action: "open_whatsapp_direct" }
      ]
    });
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  handleUserAction(action, payload = null) {
    if (action === "start_cctv") {
      this.userAnswers.type = "cctv";
      this.addBotMessage(
        "Отлично! Давайте подберем оптимальную систему видеонаблюдения. Для какого объекта вы выбираете камеры?",
        [
          { label: "🏡 Частный дом / дача", action: "cctv_object", payload: "Частный дом / дача" },
          { label: "🏢 Офис / магазин / склад", action: "cctv_object", payload: "Бизнес / офис / склад" },
          { label: "🚪 Квартира / подъезд", action: "cctv_object", payload: "Квартира / подъезд" },
          { label: "☀️ Автономный объект без проводов", action: "cctv_object", payload: "Автономный объект" }
        ]
      );
    } else if (action === "cctv_object") {
      this.userAnswers.object = payload;
      this.addBotMessage(
        `Понял, объект: **${payload}**. Сколько точек видеонаблюдения (камер) вам ориентировочно требуется?`,
        [
          { label: "1–2 камеры (вход / двор)", action: "cctv_cameras_count", payload: "1-2" },
          { label: "3–4 камеры (полный периметр)", action: "cctv_cameras_count", payload: "4" },
          { label: "5–8 камер (большая территория)", action: "cctv_cameras_count", payload: "8" },
          { label: "Нужен выезд мастера на замер", action: "cctv_need_master", payload: "Выезд замерщика" }
        ]
      );
    } else if (action === "cctv_cameras_count") {
      this.userAnswers.cameraCount = payload;
      
      let recommendedProducts = [];
      let recommendationText = "";

      if (payload === "1-2") {
        recommendedProducts = [
          PRODUCTS_DATA.find(p => p.id === "cam-01"),
          PRODUCTS_DATA.find(p => p.id === "cam-02")
        ];
        recommendationText = "Для 1–2 точек идеально подойдут уличная 4K камера с ночным цветом ColorVu или поворотная Wi-Fi PTZ камера:";
      } else if (payload === "4") {
        recommendedProducts = [
          PRODUCTS_DATA.find(p => p.id === "kit-01"),
          PRODUCTS_DATA.find(p => p.id === "kit-02")
        ];
        recommendationText = "Рекомендуем готовый комплект под ключ на 4 камеры с NVR видеорегистратором и жестким диском (архив до 30 дней):";
      } else {
        recommendedProducts = [
          PRODUCTS_DATA.find(p => p.id === "kit-01"),
          PRODUCTS_DATA.find(p => p.id === "cam-04")
        ];
        recommendationText = "Для 5–8 камер лучше всего использовать 8-канальный PoE видеорегистратор и комплект расширяемых 4K камер:";
      }

      this.addBotMessage(recommendationText, [], recommendedProducts.filter(Boolean));

      // Финальное сообщение с возможностью заказать расчет
      setTimeout(() => {
        const summary = `Подбор видеонаблюдения: ${this.userAnswers.object}, количество камер: ${this.userAnswers.cameraCount}`;
        this.addBotMessage(
          "Хотите получить детальный расчет сметы с установкой в WhatsApp или оформить заявку?",
          [
            { label: "🟢 Получить смету в WhatsApp", action: "send_quiz_to_whatsapp", payload: summary },
            { label: "🔵 Написать в Telegram", action: "send_quiz_to_telegram", payload: summary },
            { label: "🔄 Подобрать другое оборудование", action: "restart" }
          ]
        );
      }, 500);

    } else if (action === "cctv_need_master") {
      this.addBotMessage(
        "Отличная идея! Наш инженер бесплатно приедет на объект, замерит расстояния, проверит углы обзора и составит точную смету без наценок.",
        [
          { label: "📞 Вызвать инженера на замер", action: "order_master_call", payload: "Выезд инженера на замер видеонаблюдения" },
          { label: "💬 Написать в WhatsApp", action: "open_whatsapp_direct" }
        ]
      );
    } else if (action === "start_remote") {
      this.userAnswers.type = "remote";
      this.addBotMessage(
        "Какая марка (бренд) у вашего телевизора или техники?",
        [
          { label: "LG Smart TV", action: "remote_brand", payload: "LG" },
          { label: "Samsung Smart TV", action: "remote_brand", payload: "Samsung" },
          { label: "Xiaomi (Mi TV / Stick)", action: "remote_brand", payload: "Xiaomi" },
          { label: "Sony / Philips", action: "remote_brand", payload: "Sony" },
          { label: "TCL / Hisense / Haier / Yasin / Другой", action: "remote_brand", payload: "Universal" },
          { label: "🔍 Ввести точную модель вручную", action: "remote_manual_input" }
        ]
      );
    } else if (action === "remote_brand") {
      const brand = payload;
      let matchedProduct = null;
      let note = "";

      if (brand === "LG") {
        matchedProduct = PRODUCTS_DATA.find(p => p.id === "rem-01");
        note = "Для телевизоров LG Smart TV рекомендуем пульт **Magic Remote MR21GA/MR22GN** с гироскопом-указкой и голосовым поиском. 100% совместим со всеми моделями webOS 2017–2024.";
      } else if (brand === "Samsung") {
        matchedProduct = PRODUCTS_DATA.find(p => p.id === "rem-02");
        note = "Для телевизоров Samsung Smart TV рекомендуем умный пульт **SolarCell** с зарядкой от света и голосом. Подходит для всех серий QLED, Crystal UHD и The Frame.";
      } else if (brand === "Xiaomi") {
        matchedProduct = PRODUCTS_DATA.find(p => p.id === "rem-03");
        note = "Для Xiaomi Mi TV и приставок Mi Box S / Stick подходит оригинальный **Bluetooth пульт XMRM-010** с голосовым Google Ассистентом.";
      } else {
        matchedProduct = PRODUCTS_DATA.find(p => p.id === "rem-04");
        note = "Для редких марок и моделей идеально подходит **универсальный пульт Huayu RM-L1130+X** (поддержка 1000+ брендов, автонастройка).";
      }

      this.addBotMessage(note, [], matchedProduct ? [matchedProduct] : []);

      setTimeout(() => {
        this.addBotMessage(
          "Не уверены на 100%? Отправьте фото вашего старого пульта или наклейки на телевизоре в наш WhatsApp — проверим совместимость за 2 минуты!",
          [
            { label: "🟢 Проверить по фото в WhatsApp", action: "send_quiz_to_whatsapp", payload: `Подбор пульта для марки ${brand}` },
            { label: "🛒 Посмотреть все пульты в каталоге", action: "filter_catalog_remotes" },
            { label: "🔄 В начало", action: "restart" }
          ]
        );
      }, 500);

    } else if (action === "start_satellite") {
      const satProduct1 = PRODUCTS_DATA.find(p => p.id === "sat-01");
      const satProduct2 = PRODUCTS_DATA.find(p => p.id === "sat-02");
      this.addBotMessage(
        "Предлагаем официальные комплекты спутникового ТВ **«Отау ТВ»** (до 150+ каналов без абонплаты) и премиальные 4K ресиверы с профессиональной установкой:",
        [
          { label: "🛠️ Заказать Отау ТВ с установкой под ключ", action: "order_master_call", payload: "Заказ Отау ТВ с монтажом" },
          { label: "💬 Уточнить список каналов в WhatsApp", action: "open_whatsapp_direct" },
          { label: "🔄 В начало", action: "restart" }
        ],
        [satProduct1, satProduct2].filter(Boolean)
      );
    } else if (action === "start_installation") {
      this.addBotMessage(
        "Какая услуга монтажа вас интересует?",
        [
          { label: "📹 Монтаж камер видеонаблюдения", action: "order_master_call", payload: "Монтаж видеонаблюдения" },
          { label: "📡 Установка / настройка антенны Отау ТВ", action: "order_master_call", payload: "Установка спутникового ТВ" },
          { label: "📺 Навес телевизора на кронштейн", action: "order_master_call", payload: "Навес телевизора на стену" },
          { label: "📞 Консультация инженера", action: "open_whatsapp_direct" }
        ]
      );
    } else if (action === "order_master_call") {
      const serviceName = payload || "Монтаж оборудования";
      const config = window.SITE_CONFIG || {};
      const phone = config.WHATSAPP_NUMBER || "77778904567";
      const text = encodeURIComponent(`Здравствуйте! Хочу вызвать мастера / заказать услугу: "${serviceName}". Проконсультируйте по стоимости и дате выезда.`);
      
      this.addBotMessage(
        `Отлично! Передаю вашу заявку на услугу: **${serviceName}**. Нажмите кнопку ниже для подтверждения через WhatsApp или позвоните нам:`,
        [
          { label: `🟢 Написать в WhatsApp (${config.PHONE})`, url: `https://wa.me/${phone}?text=${text}` },
          { label: `📞 Позвонить: ${config.PHONE}`, url: `tel:${config.PHONE_RAW || phone}` },
          { label: "🔄 Вернуться в меню", action: "restart" }
        ]
      );
    } else if (action === "send_quiz_to_whatsapp") {
      const config = window.SITE_CONFIG || {};
      const phone = config.WHATSAPP_NUMBER || "77778904567";
      const text = encodeURIComponent(`Здравствуйте! Нужна консультация с сайта по вопросу:\n${payload || 'Подбор оборудования'}`);
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    } else if (action === "send_quiz_to_telegram") {
      const config = window.SITE_CONFIG || {};
      const tgLink = config.TELEGRAM_LINK || "https://t.me/profivision_kz";
      window.open(tgLink, '_blank');
    } else if (action === "open_whatsapp_direct") {
      const config = window.SITE_CONFIG || {};
      const phone = config.WHATSAPP_NUMBER || "77778904567";
      const text = encodeURIComponent(config.WHATSAPP_GREETING || "Здравствуйте! Хочу проконсультироваться по оборудованию.");
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    } else if (action === "filter_catalog_remotes") {
      if (window.App) {
        window.App.openCatalogWithCategory("remotes");
      }
      this.closeChat();
    } else if (action === "restart") {
      this.userAnswers = {};
      this.init();
      this.render();
    }

    this.render();
  }

  handleUserTextInput(text) {
    if (!text || text.trim().length === 0) return;
    const cleanText = text.trim();

    // Добавляем сообщение пользователя
    this.messages.push({
      sender: "user",
      time: this.getCurrentTime(),
      text: cleanText
    });

    this.render();

    // Проверяем текст на ключевые слова
    const lower = cleanText.toLowerCase();

    setTimeout(() => {
      if (lower.includes("пульт") || lower.includes("lg") || lower.includes("samsung") || lower.includes("телевизор") || lower.includes("тв")) {
        const checkResult = window.RemoteChecker ? window.RemoteChecker.checkCompatibility(cleanText) : null;
        if (checkResult && checkResult.recommendedProduct) {
          this.addBotMessage(
            `По вашему запросу "${cleanText}" найден совместимый пульт: **${checkResult.recommendedProduct.name}**\n${checkResult.tip}`,
            [
              { label: "🟢 Проверить точную модель в WhatsApp", action: "send_quiz_to_whatsapp", payload: `Подбор пульта: ${cleanText}` },
              { label: "🔄 Задать другой вопрос", action: "restart" }
            ],
            [checkResult.recommendedProduct]
          );
        } else {
          this.handleUserAction("start_remote");
        }
      } else if (lower.includes("камер") || lower.includes("видео") || lower.includes("наблюден") || lower.includes("улиц")) {
        this.handleUserAction("start_cctv");
      } else if (lower.includes("отау") || lower.includes("спутник") || lower.includes("тарелк") || lower.includes("антенн")) {
        this.handleUserAction("start_satellite");
      } else if (lower.includes("установк") || lower.includes("монтаж") || lower.includes("мастер") || lower.includes("цен")) {
        this.handleUserAction("start_installation");
      } else {
        // Общий ответ + эскалация
        this.addBotMessage(
          `Спасибо за вопрос! Чтобы дать вам точный ответ по наличию и стоимости для "${cleanText}", рекомендую быстро связаться с нашим дежурным инженером в WhatsApp или выбрать раздел ниже:`,
          [
            { label: "🟢 Написать в WhatsApp", action: "send_quiz_to_whatsapp", payload: `Вопрос с сайта: ${cleanText}` },
            { label: "📹 Видеонаблюдение", action: "start_cctv" },
            { label: "📺 Пульты ДУ", action: "start_remote" },
            { label: "📡 Спутниковое ТВ", action: "start_satellite" },
            { label: "🛠️ Услуги монтажа", action: "start_installation" }
          ]
        );
      }
      this.render();
    }, 400);
  }

  addBotMessage(text, options = [], products = []) {
    this.messages.push({
      sender: "bot",
      time: this.getCurrentTime(),
      text: text,
      options: options,
      products: products
    });
    this.render();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
    }
    this.render();
  }

  openChat() {
    this.isOpen = true;
    this.unreadCount = 0;
    this.render();
  }

  closeChat() {
    this.isOpen = false;
    this.render();
  }

  render() {
    const container = document.getElementById("assistant-widget-container");
    if (!container) return;

    if (!this.isOpen) {
      container.innerHTML = `
        <button id="assistant-toggle-btn" class="assistant-trigger-btn flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border-2 border-white/20">
          <div class="relative">
            <span class="w-7 h-7 flex items-center justify-center bg-white/20 rounded-full">
              <i data-lucide="bot" class="w-4 h-4 text-white"></i>
            </span>
            ${this.unreadCount > 0 ? `
              <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
              <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
            ` : ''}
          </div>
          <span class="text-sm font-semibold pr-1 hidden sm:inline">Помощник ElectroSat</span>
          <span class="text-xs bg-white/25 px-2 py-0.5 rounded-full text-blue-50 font-normal hidden md:inline">Online</span>
        </button>
      `;
      
      const toggleBtn = document.getElementById("assistant-toggle-btn");
      if (toggleBtn) {
        toggleBtn.onclick = () => this.toggleChat();
      }
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Рендер открытого окна чата
    const config = window.SITE_CONFIG || {};
    container.innerHTML = `
      <div class="assistant-window w-[92vw] sm:w-[380px] md:w-[400px] h-[540px] sm:h-[580px] bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 z-50">
        <!-- Шапка чата -->
        <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-blue-900/40">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-inner text-white font-bold text-lg border border-blue-400/30">
                <i data-lucide="bot" class="w-5 h-5"></i>
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-sm tracking-tight">Умный помощник</h4>
                <span class="text-[10px] bg-blue-500/30 text-blue-200 px-1.5 py-0.5 rounded-md font-medium border border-blue-400/20">AI & Подбор</span>
              </div>
              <p class="text-xs text-slate-300">Онлайн • Отвечает за 1 секунду</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button id="assistant-restart-btn" title="Начать сначала" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
            <button id="assistant-close-btn" title="Закрыть" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- Тело сообщений -->
        <div id="assistant-messages-body" class="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-sm">
          ${this.messages.map((m, idx) => `
            <div class="flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} gap-1">
              <div class="max-w-[85%] ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 shadow-sm' : 'bg-white text-slate-800 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 shadow-sm'}">
                <div class="prose prose-sm leading-relaxed">${this.formatMarkdown(m.text)}</div>
                
                ${m.products && m.products.length > 0 ? `
                  <div class="mt-3 space-y-2.5">
                    ${m.products.map(prod => `
                      <div class="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex gap-2.5 items-center hover:border-blue-300 transition-colors">
                        <img src="${prod.images[0]}" alt="${prod.name}" class="w-14 h-14 object-cover rounded-lg bg-white border border-slate-200 flex-shrink-0">
                        <div class="flex-1 min-w-0">
                          <p class="font-semibold text-xs text-slate-900 truncate leading-snug">${prod.name}</p>
                          <div class="flex items-center gap-1.5 mt-1">
                            <span class="text-blue-600 font-bold text-xs">${prod.price.toLocaleString('ru-RU')} ${config.CURRENCY_SYMBOL || '₸'}</span>
                            ${prod.oldPrice ? `<span class="text-slate-400 line-through text-[10px]">${prod.oldPrice.toLocaleString('ru-RU')}</span>` : ''}
                          </div>
                          <div class="flex gap-1.5 mt-2">
                            <button onclick="window.App.openProductModal('${prod.id}')" class="text-[11px] bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-2 py-0.5 rounded-md transition-colors">
                              Подробнее
                            </button>
                            <button onclick="window.Cart.addItem('${prod.id}', 1); window.Assistant.closeChat();" class="text-[11px] bg-blue-600 text-white hover:bg-blue-700 font-medium px-2 py-0.5 rounded-md transition-colors">
                              В корзину
                            </button>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                <span class="block text-[10px] ${m.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'} mt-1">${m.time}</span>
              </div>

              ${m.options && m.options.length > 0 ? `
                <div class="flex flex-wrap gap-1.5 mt-1 max-w-[95%]">
                  ${m.options.map(opt => `
                    ${opt.url ? `
                      <a href="${opt.url}" target="_blank" class="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300/80 px-3 py-1.5 rounded-xl font-medium transition-all transform active:scale-95 shadow-2xs">
                        ${opt.label}
                      </a>
                    ` : `
                      <button data-action="${opt.action}" data-payload="${opt.payload || ''}" class="assistant-opt-btn inline-flex items-center gap-1 text-xs bg-white text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-xl font-medium transition-all transform active:scale-95 shadow-2xs">
                        ${opt.label}
                      </button>
                    `}
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Нижний блок ввода -->
        <div class="p-3 bg-white border-t border-slate-200">
          <form id="assistant-input-form" class="flex items-center gap-2">
            <input 
              id="assistant-text-input" 
              type="text" 
              placeholder="Напишите марку ТВ или вопрос..." 
              class="flex-1 bg-slate-100 focus:bg-white text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              autocomplete="off"
            />
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white p-2.5 rounded-2xl transition-all shadow-md">
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </form>
          <div class="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-400">
            <span>Быстрая связь с мастером:</span>
            <div class="flex gap-2">
              <a href="https://wa.me/${config.WHATSAPP_NUMBER || '77778904567'}" target="_blank" class="text-emerald-600 hover:underline font-medium flex items-center gap-0.5">
                <i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp
              </a>
              <a href="${config.TELEGRAM_LINK || 'https://t.me/profivision_kz'}" target="_blank" class="text-sky-600 hover:underline font-medium flex items-center gap-0.5">
                <i data-lucide="send" class="w-3 h-3"></i> Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Привязываем обработчики событий
    const closeBtn = document.getElementById("assistant-close-btn");
    if (closeBtn) closeBtn.onclick = () => this.closeChat();

    const restartBtn = document.getElementById("assistant-restart-btn");
    if (restartBtn) restartBtn.onclick = () => this.handleUserAction("restart");

    const form = document.getElementById("assistant-input-form");
    const input = document.getElementById("assistant-text-input");
    if (form && input) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const val = input.value;
        input.value = "";
        this.handleUserTextInput(val);
      };
    }

    const optButtons = container.querySelectorAll(".assistant-opt-btn");
    optButtons.forEach(btn => {
      btn.onclick = () => {
        const action = btn.getAttribute("data-action");
        const payload = btn.getAttribute("data-payload");
        this.handleUserAction(action, payload);
      };
    });

    // Автопрокрутка вниз
    const messagesBody = document.getElementById("assistant-messages-body");
    if (messagesBody) {
      messagesBody.scrollTop = messagesBody.scrollHeight;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  formatMarkdown(text) {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
}

window.Assistant = new AssistantBot();
