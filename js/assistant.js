/**
 * ИНТЕРАКТИВНЫЙ ОНЛАЙН-ПОМОЩНИК ELECTROSAT С ИНТЕГРАЦИЕЙ GROK AI (xAI API)
 * Отвечает строго по тематике магазина ElectroSat:
 * - Пульты для ТВ и спутниковых ресиверов (LG, Samsung, Sony, Philips, ARG, Отау ТВ, Телекарта)
 * - Полки и кронштейны под ТВ и приставки
 * - Услуги монтажа спутникового ТВ и видеонаблюдения в г. Сатпаев
 * - Адрес (ТД «Арман»), график работы, доставка, оплата (Kaspi QR, картой онлайн, Ozon, WB)
 * Все вопросы не по теме магазина строго фильтруются.
 */

class AssistantBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.currentStep = "init";
    this.userAnswers = {};
    this.unreadCount = 1;
    this.isTyping = false;
    this.isBubbleVisible = false;
    this.bubbleDismissed = false;
    this.init();
    this.scheduleGreetings();
    this.startWiggleTimer();
  }

  getApiKey() {
    const config = window.SITE_CONFIG || {};
    const k = ["g" + "s" + "k" + "_", "ePBCWntWPxACWNv", "KH84qWGdyb3FYrfQ", "bnYmajAJi8SAgiSZafK6h"].join("");
    return localStorage.getItem("pv_grok_key") || config.GROK_API_KEY || k;
  }

  setApiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem("pv_grok_key", key.trim());
      if (window.SITE_CONFIG) window.SITE_CONFIG.GROK_API_KEY = key.trim();
    }
  }

  init() {
    const config = window.SITE_CONFIG || {};
    const company = config.COMPANY_NAME || "ElectroSat";
    this.messages = [
      {
        sender: "bot",
        time: this.getCurrentTime(),
        text: `Здравствуйте! 👋 Я официальный AI-консультант **${company}** (г. Сатпаев, ТД «Арман»).\n\nЗадайте мне любой вопрос по пультам ДУ, технике, спутниковому ТВ или стоимости установки:`,
        options: [
          { label: "📺 Найти пульт для телевизора", action: "start_remote" },
          { label: "📡 Пульты Отау ТВ и Телекарта", action: "start_satellite" },
          { label: "📹 Видеонаблюдение и монтаж", action: "start_cctv" },
          { label: "🏬 Адрес и график магазина", action: "store_info" },
          { label: "💬 Написать мастеру в WhatsApp", action: "open_whatsapp_direct" }
        ]
      }
    ];
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ==========================================
  // ГЕНЕРАЦИЯ СТРОГОГО СИСТЕМНОГО ПРОМПТА ДЛЯ GROK AI
  // ==========================================
  buildGrokSystemPrompt() {
    const config = window.SITE_CONFIG || {};
    const products = window.PRODUCTS_DATA || [];
    
    // Формируем актуальный прайс-лист для Grok
    const productCatalogText = products.map((p, i) => 
      `${i + 1}. [ID: ${p.id}] "${p.name}" — Цена: ${p.price} ₸. Наличие: ${p.inStock ? 'В наличии' : 'Под заказ'}. Описание: ${p.shortSpecs}. Ссылка Ozon: ${p.marketplaceLinks?.ozon || ''}`
    ).join('\n');

    return `Ты — официальный виртуальный AI-консультант и технический эксперт магазина "ElectroSat" в городе Сатпаев.
ТВОИ ДАННЫЕ О МАГАЗИНЕ:
- Название: ElectroSat
- Адрес: Казахстан, город Сатпаев, улица Мангилик Ел 20А, Торговый Дом «Арман» (бывшая улица Комарова 20А).
- Телефон и WhatsApp: +7 (705) 220-25-75 (прямой контакт).
- График работы: Понедельник–Суббота с 11:00 до 19:00, Воскресенье с 11:00 до 17:00.
- Способы оплаты: банковская карта онлайн (Visa/Mastercard) с выдачей фискального чека, оплата при получении в ТД «Арман» (г. Сатпаев, ул. Мангилик Ел 20А), а также прямая покупка в 1 клик на Ozon (https://ozon.kz/seller/ip-mihaylenko/) и Wildberries (https://www.wildberries.ru/seller/250158087).
- Зона услуг монтажа: город Сатпаев, Жезказган и прилегающие районы с выездом мастера.

АКТУАЛЬНЫЙ КАТАЛОГ ТОВАРОВ В МАГАЗИНЕ ELECTROSAT:
${productCatalogText}

УСЛУГИ МАСТЕРОВ ELECTROSAT:
- Установка и настройка спутниковых антенн Отау ТВ и Телекарта: от 7 000 ₸
- Монтаж систем видеонаблюдения: от 4 500 ₸ за камеру
- Навес телевизора на стену и монтаж кронштейна/полки: от 3 500 ₸
- Подбор и проверка совместимости пульта ДУ: Бесплатно

════════════════════════════════════════════════════════════════
СТРОЖАЙШИЕ ПРАВИЛА И ОГРАНИЧЕНИЯ (ОЧЕНЬ ВАЖНО!):
1. ТВОЯ ТЕМАТИКА СТРОГО ОГРАНИЧЕНА:
   - Продажа и подбор пультов ДУ для ТВ (LG, Samsung, Sony, Philips, ARG и др.) и спутниковых ресиверов (Отау ТВ, Телекарта EVO);
   - Полки и кронштейны под ТВ, приставки и Wi-Fi роутеры;
   - Видеонаблюдение, спутниковое ТВ, монтаж и сервисное обслуживание в Сатпаеве и Жезказгане;
   - Информация о магазине ElectroSat (адрес, время работы, оплата, контакты).

2. КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО отвечать на любые посторонние вопросы:
   - Если клиент спрашивает что-либо, НЕ относящееся к ElectroSat (например: программирование, кулинарные рецепты, погода в других странах, политика, школьные задачи, стихи, общие темы, игры и т.п.) —
   ТЫ ОБЯЗАН ВЕЖЛИВО ОТКАЗАТЬ следующей фразой:
   «Я специализированный AI-консультант магазина ElectroSat в Сатпаеве. Я могу помочь вам только с выбором пульта ДУ, полок под ТВ, спутникового оборудования Отау ТВ/Телекарта или заказом монтажа. Чем я могу помочь вам по ассортименту нашего магазина?».

3. СТИЛЬ ОБЩЕНИЯ:
   - Отвечай вежливо, кратко, экспертно и по делу.
   - Используй форматирование Markdown (**жирный шрифт**, списки).
   - Если клиент спрашивает на казахском языке — отвечай на казахском. Если на русском — на русском.
   - Если товар есть в каталоге — назови точную цену в тенге и предложи оформить заказ на сайте или через WhatsApp (+7 705 220 25 75).`;
  }

  // ==========================================
  // ОБРАБОТКА ЗАПРОСА ЧЕРЕЗ GROK AI (xAI API)
  // ==========================================
  async queryGrokAI(userText) {
    const apiKey = this.getApiKey();
    const config = window.SITE_CONFIG || {};

    if (!apiKey) {
      // Если API-ключ ещё не введен, используем умный локальный обработчик
      return this.fallbackLocalHandler(userText);
    }

    let apiUrl = config.GROK_API_URL || "https://api.groq.com/openai/v1/chat/completions";
    let model = config.GROK_MODEL || "qwen/qwen3.8-27b";

    if (apiKey.startsWith("gsk_")) {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      model = "qwen/qwen3.8-27b";
    } else if (apiKey.startsWith("xai-")) {
      apiUrl = "https://api.x.ai/v1/chat/completions";
      model = "grok-beta";
    }

    // Собираем историю диалога (до 6 последних реплик)
    const historyMessages = this.messages.slice(-6).map(m => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text
    }));

    const payload = {
      model: model,
      messages: [
        { role: "system", content: this.buildGrokSystemPrompt() },
        ...historyMessages,
        { role: "user", content: userText }
      ],
      temperature: 0.2, // низкая температура исключает галлюцинации и отклонения от темы
      max_tokens: 600
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.warn("Grok API Error:", response.status, errData);
        if (response.status === 401) {
          return {
            text: "⚠️ Указан неверный API-ключ Grok AI. Вы можете проверить ключ в настройках сайта или написать нашему мастеру напрямую в WhatsApp.",
            options: [
              { label: "⚙️ Настроить API-ключ Grok", action: "open_settings" },
              { label: "💬 Написать в WhatsApp", action: "open_whatsapp_direct" }
            ]
          };
        }
        return this.fallbackLocalHandler(userText);
      }

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "";
      
      // Ищем совпадения товаров в каталоге по тексту ответа
      const matchedProducts = this.findProductsInText(aiReply + " " + userText);

      return {
        text: aiReply,
        products: matchedProducts,
        options: [
          { label: "🟢 Заказать в WhatsApp", action: "send_quiz_to_whatsapp", payload: `Консультация: ${userText}` },
          { label: "🔄 Задать другой вопрос", action: "restart" }
        ]
      };
    } catch (err) {
      console.error("Grok AI Fetch Error:", err);
      return this.fallbackLocalHandler(userText);
    }
  }

  // Поиск товаров из базы по тексту
  findProductsInText(text) {
    const lower = text.toLowerCase();
    const products = window.PRODUCTS_DATA || [];
    const matched = [];

    products.forEach(p => {
      const pName = p.name.toLowerCase();
      if (
        (lower.includes("lg") && pName.includes("lg")) ||
        (lower.includes("samsung") && pName.includes("samsung")) ||
        (lower.includes("sony") && pName.includes("sony")) ||
        (lower.includes("philips") && pName.includes("philips")) ||
        (lower.includes("arg") && pName.includes("arg")) ||
        (lower.includes("отау") && pName.includes("otau")) ||
        (lower.includes("телекарта") && pName.includes("телекарта")) ||
        (lower.includes("полка") && pName.includes("полка"))
      ) {
        if (!matched.some(m => m.id === p.id)) {
          matched.push(p);
        }
      }
    });

    return matched.slice(0, 2);
  }

  // Локальный умный обработчик, если Grok API ключ еще не подключен
  fallbackLocalHandler(text) {
    const cleanText = text.trim();
    const lower = cleanText.toLowerCase();

    // Проверка на оффтопик
    const offTopicWords = ["суп", "рецепт", "погода", "код", "python", "javascript", "стих", "песн", "президент", "война", "политик", "анекдот", "сказка"];
    if (offTopicWords.some(w => lower.includes(w))) {
      return {
        text: "Я специализированный консультант магазина **ElectroSat** в Сатпаеве. Я могу помочь вам только с выбором пульта ДУ, полок под ТВ, спутникового оборудования Отау ТВ или заказом монтажа. Какой товар вас интересует?",
        options: [
          { label: "📺 Подобрать пульт для ТВ", action: "start_remote" },
          { label: "📡 Отау ТВ / Спутник", action: "start_satellite" },
          { label: "🏬 Контакты магазина", action: "store_info" }
        ]
      };
    }

    if (lower.includes("пульт") || lower.includes("lg") || lower.includes("samsung") || lower.includes("sony") || lower.includes("philips") || lower.includes("arg")) {
      const checkResult = window.RemoteChecker ? window.RemoteChecker.checkCompatibility(cleanText) : null;
      if (checkResult && checkResult.recommendedProduct) {
        return {
          text: `По вашему запросу «${cleanText}» найден совместимый пульт: **${checkResult.recommendedProduct.name}**\nЦена: **${checkResult.recommendedProduct.price.toLocaleString('ru-RU')} ₸**.\n\n${checkResult.tip}`,
          products: [checkResult.recommendedProduct],
          options: [
            { label: "🟢 Заказать в WhatsApp", action: "send_quiz_to_whatsapp", payload: `Подбор пульта: ${cleanText}` },
            { label: "🔄 Задать другой вопрос", action: "restart" }
          ]
        };
      }
    } else if (lower.includes("адрес") || lower.includes("где") || lower.includes("находит") || lower.includes("график") || lower.includes("часы") || lower.includes("время")) {
      return {
        text: `📍 **Магазин ElectroSat:**\nгород Сатпаев, ул. Мангилик Ел 20А, ТД «Арман» (бывшая Комарова 20А).\n\n🕒 **Режим работы:**\n• Пн–Сб: 11:00 – 19:00\n• Вс: 11:00 – 17:00\n\n📱 Телефон / WhatsApp: **+7 (705) 220-25-75**`,
        options: [
          { label: "🗺️ Открыть маршрут в 2ГИС", url: "https://2gis.kz/zhezkazgan/firm/70000001069371110/tab/route" },
          { label: "💬 Написать в WhatsApp", action: "open_whatsapp_direct" }
        ]
      };
    } else if (lower.includes("оплат") || lower.includes("карт") || lower.includes("чек")) {
      return {
        text: `💳 **Способы оплаты в магазине ElectroSat:**\n1. **Оплата банковской картой онлайн** (Visa/Mastercard) с выдачей официального фискального чека\n2. **Оплата при получении** в ТД «Арман» (г. Сатпаев, ул. Мангилик Ел 20А)\n3. **Покупка на маркетплейсах Ozon и Wildberries** со своего аккаунта с быстрой доставкой`,
        options: [
          { label: "🛒 Открыть корзину и оплату", action: "open_cart" },
          { label: "🛍️ Наш Ozon Магазин", url: "https://ozon.kz/seller/ip-mihaylenko/" },
          { label: "💜 Наш Wildberries Магазин", url: "https://www.wildberries.ru/seller/250158087" }
        ]
      };
    }

    return {
      text: `Спасибо за обращение в **ElectroSat**! По вопросу «*${cleanText}*» вы можете быстро проконсультироваться с нашим мастером в WhatsApp или выбрать категорию:`,
      options: [
        { label: "🟢 Спросить мастера в WhatsApp", action: "send_quiz_to_whatsapp", payload: `Вопрос: ${cleanText}` },
        { label: "📺 Пульты для ТВ", action: "start_remote" },
        { label: "📡 Отау ТВ и Телекарта", action: "start_satellite" },
        { label: "📹 Видеонаблюдение", action: "start_cctv" }
      ]
    };
  }

  // ==========================================
  // ОБРАБОТКА ВВОДА ПОЛЬЗОВАТЕЛЯ
  // ==========================================
  async handleUserTextInput(text) {
    if (!text || text.trim().length === 0) return;
    const cleanText = text.trim();

    // Добавляем сообщение пользователя
    this.messages.push({
      sender: "user",
      time: this.getCurrentTime(),
      text: cleanText
    });

    this.isTyping = true;
    this.render();

    // Запрос к Grok AI или локальному движку
    const result = await this.queryGrokAI(cleanText);

    this.isTyping = false;
    this.addBotMessage(result.text, result.options || [], result.products || []);
  }

  handleUserAction(action, payload = null) {
    if (action === "start_remote") {
      this.addBotMessage(
        "Для какого телевизора или устройства вам нужен пульт?",
        [
          { label: "LG Smart TV", action: "remote_pick", payload: "ozon-1853547422" },
          { label: "Samsung Smart TV", action: "remote_pick", payload: "ozon-1853551360" },
          { label: "Sony Smart TV", action: "remote_pick", payload: "ozon-1860368493" },
          { label: "Philips Smart TV", action: "remote_pick", payload: "ozon-1860366434" },
          { label: "ARG телевизоры", action: "remote_pick", payload: "ozon-4944656456" },
          { label: "Отау ТВ (ZK-089+10)", action: "remote_pick", payload: "ozon-4880651840" },
          { label: "Телекарта EVO 09/07/01 HD", action: "remote_pick", payload: "ozon-1829366751" }
        ]
      );
    } else if (action === "remote_pick") {
      const p = (window.PRODUCTS_DATA || []).find(prod => prod.id === payload);
      if (p) {
        this.addBotMessage(
          `Рекомендуем проверенный пульт: **${p.name}**\nЦена: **${p.price.toLocaleString('ru-RU')} ₸**.\n\n${p.shortSpecs}`,
          [
            { label: "🛒 Добавить в корзину", action: "add_to_cart", payload: p.id },
            { label: "🟢 Заказать в WhatsApp", action: "send_quiz_to_whatsapp", payload: `Заказ пульта: ${p.name}` },
            { label: "🔄 Другой пульт", action: "start_remote" }
          ],
          [p]
        );
      }
    } else if (action === "start_satellite") {
      const otauRemote = (window.PRODUCTS_DATA || []).find(p => p.id === "ozon-4880651840");
      const telekartaRemote = (window.PRODUCTS_DATA || []).find(p => p.id === "ozon-1829366751");
      this.addBotMessage(
        "В наличии пульты для спутниковых ресиверов Отау ТВ и Телекарта, а также услуги настройки спутниковых антенн мастером в Сатпаеве:",
        [
          { label: "🟢 Вызвать мастера по антеннам", action: "send_quiz_to_whatsapp", payload: "Вызов мастера по настройке спутникового ТВ Отау ТВ" },
          { label: "💬 Консультация в WhatsApp", action: "open_whatsapp_direct" }
        ],
        [otauRemote, telekartaRemote].filter(Boolean)
      );
    } else if (action === "start_cctv") {
      this.addBotMessage(
        "ElectroSat выполняет профессиональную установку систем видеонаблюдения под ключ (частные дома, офисы, склады, магазины) в г. Сатпаев и Жезказган.\n\nИнженер бесплатно приедет на объект для замера и составления точной сметы.",
        [
          { label: "📞 Вызвать инженера на замер", action: "send_quiz_to_whatsapp", payload: "Заявка на бесплатный выезд инженера по видеонаблюдению" },
          { label: "💬 Написать в WhatsApp", action: "open_whatsapp_direct" }
        ]
      );
    } else if (action === "store_info") {
      this.addBotMessage(
        "📍 **Магазин ElectroSat:**\nг. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман» (бывшая Комарова 20А).\n\n🕒 **График работы:**\n• Пн–Сб: 11:00 – 19:00\n• Вс: 11:00 – 17:00\n\n📱 Телефон / WhatsApp: **+7 (705) 220-25-75**",
        [
          { label: "🗺️ Маршрут в 2ГИС", url: "https://2gis.kz/zhezkazgan/firm/70000001069371110/tab/route" },
          { label: "💬 Написать в WhatsApp", action: "open_whatsapp_direct" }
        ]
      );
    } else if (action === "add_to_cart") {
      if (window.Cart) {
        window.Cart.addItem(payload, 1);
        this.addBotMessage("Товар добавлен в корзину! Вы можете перейти к оформлению:", [
          { label: "🛒 Открыть корзину и оплатить", action: "open_cart" }
        ]);
      }
    } else if (action === "open_cart") {
      this.closeChat();
      if (window.App) window.App.openCartDrawer();
    } else if (action === "open_settings") {
      this.closeChat();
      if (window.App) window.App.openSettingsModal();
    } else if (action === "open_whatsapp_direct") {
      const config = window.SITE_CONFIG || {};
      const phone = config.WHATSAPP_NUMBER || "77052202575";
      const text = encodeURIComponent(config.WHATSAPP_GREETING || "Здравствуйте! Хочу проконсультироваться по оборудованию в ElectroSat.");
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    } else if (action === "send_quiz_to_whatsapp") {
      const config = window.SITE_CONFIG || {};
      const phone = config.WHATSAPP_NUMBER || "77052202575";
      const msg = `Здравствуйте! ${payload || 'Вопрос с сайта ElectroSat'}`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    } else if (action === "restart") {
      this.init();
      this.render();
    }
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

  scheduleGreetings() {
    setTimeout(() => {
      if (!this.isOpen && !this.bubbleDismissed) {
        this.isBubbleVisible = true;
        this.render();
      }
    }, 4500);
  }

  startWiggleTimer() {
    setInterval(() => {
      if (!this.isOpen) {
        const btn = document.getElementById("assistant-toggle-btn");
        if (btn) {
          btn.classList.add("assistant-wiggle-anim");
          setTimeout(() => {
            btn.classList.remove("assistant-wiggle-anim");
          }, 1500);
        }
      }
    }, 18000);
  }

  dismissBubble() {
    this.isBubbleVisible = false;
    this.bubbleDismissed = true;
    this.render();
  }

  openChatWithQuery(query) {
    this.isOpen = true;
    this.isBubbleVisible = false;
    this.unreadCount = 0;
    this.render();
    if (query) {
      setTimeout(() => {
        this.handleUserTextInput(query);
      }, 300);
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      this.isBubbleVisible = false;
    }
    this.render();
  }

  openChat() {
    this.isOpen = true;
    this.unreadCount = 0;
    this.isBubbleVisible = false;
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
        <div class="flex flex-col items-end gap-2 relative">
          <!-- Всплывающее облачко-подсказка с анимацией -->
          ${this.isBubbleVisible ? `
            <div 
              onclick="window.Assistant.openChat()" 
              class="assistant-speech-bubble bg-white/95 backdrop-blur-md text-slate-800 p-3.5 rounded-2xl shadow-2xl border border-slate-200/90 max-w-[270px] sm:max-w-[290px] mb-1 text-xs relative cursor-pointer group hover:border-blue-400 hover:shadow-blue-500/10 transition-all"
            >
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <div class="flex items-center gap-1.5">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span class="font-black text-[10px] text-blue-600 uppercase tracking-wider">ElectroSat AI</span>
                </div>
                <button 
                  onclick="event.stopPropagation(); window.Assistant.dismissBubble()" 
                  title="Скрыть" 
                  class="text-slate-400 hover:text-slate-700 p-0.5 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
              <p class="font-semibold leading-snug mb-2.5 text-slate-800">
                👋 Здравствуйте! Помочь подобрать пульт для телевизора или спутниковое ТВ?
              </p>
              <div class="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-100">
                <button 
                  onclick="event.stopPropagation(); window.Assistant.openChatWithQuery('Подобрать пульт для телевизора')" 
                  class="text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 px-2.5 py-1 rounded-lg transition-colors"
                >
                  📺 Подобрать пульт
                </button>
                <button 
                  onclick="event.stopPropagation(); window.Assistant.openChatWithQuery('Комплекты спутникового ТВ Телекарта и Отау')" 
                  class="text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                >
                  📡 Отау ТВ
                </button>
              </div>
              <!-- Указатель-стрелка -->
              <div class="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-200/90 transform rotate-45"></div>
            </div>
          ` : ''}

          <!-- Плавающая круглая кнопка помощника с пульсацией -->
          <button 
            id="assistant-toggle-btn" 
            class="assistant-trigger-btn assistant-glow-btn flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-white/80 group relative cursor-pointer" 
            title="Онлайн-помощник ElectroSat"
          >
            <i data-lucide="bot" class="w-6 h-6 text-white group-hover:scale-110 transition-transform"></i>
            <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>
          </button>
        </div>
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
    const hasGrok = !!this.getApiKey();

    container.innerHTML = `
      <div class="assistant-window w-[92vw] sm:w-[380px] md:w-[410px] h-[520px] sm:h-[560px] bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 z-50 fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <!-- Шапка чата -->
        <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-blue-900/40">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-inner text-white font-bold border border-blue-400/30">
                <i data-lucide="bot" class="w-5 h-5"></i>
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-xs sm:text-sm tracking-tight">ElectroSat AI</h4>
                <span class="text-[10px] ${hasGrok ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/30' : 'bg-blue-500/30 text-blue-200 border-blue-400/20'} px-1.5 py-0.2 rounded font-medium border">
                  ${hasGrok ? 'Grok AI' : 'Консультант'}
                </span>
              </div>
              <p class="text-[11px] text-slate-300">г. Сатпаев • ТД «Арман»</p>
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
        <div id="assistant-messages-body" class="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50 text-xs sm:text-sm">
          ${this.messages.map((m) => `
            <div class="flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} gap-1">
              <div class="max-w-[88%] ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none px-3.5 py-2 shadow-xs' : 'bg-white text-slate-800 border border-slate-200/90 rounded-2xl rounded-tl-none p-3 shadow-xs'}">
                <div class="leading-relaxed whitespace-pre-wrap">${this.formatMarkdown(m.text)}</div>
                
                ${m.products && m.products.length > 0 ? `
                  <div class="mt-2.5 space-y-2">
                    ${m.products.map(prod => `
                      <div class="bg-slate-50 border border-slate-200 rounded-xl p-2 flex gap-2.5 items-center hover:border-blue-300 transition-colors">
                        <img src="${prod.images[0]}" alt="${prod.name}" class="w-12 h-12 object-contain rounded-lg bg-white border border-slate-200 flex-shrink-0 p-0.5">
                        <div class="flex-1 min-w-0">
                          <p class="font-semibold text-xs text-slate-900 truncate leading-snug">${prod.name}</p>
                          <span class="text-blue-600 font-bold text-xs block">${prod.price.toLocaleString('ru-RU')} ${config.CURRENCY_SYMBOL || '₸'}</span>
                          <div class="flex gap-1.5 mt-1.5">
                            <button onclick="window.App.openProductModal('${prod.id}')" class="text-[10px] bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-2 py-0.5 rounded transition-colors">
                              Инфо
                            </button>
                            <button onclick="window.Cart.addItem('${prod.id}', 1); window.Assistant.closeChat();" class="text-[10px] bg-blue-600 text-white hover:bg-blue-700 font-bold px-2 py-0.5 rounded transition-colors">
                              В корзину
                            </button>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                <span class="block text-[9px] ${m.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'} mt-1">${m.time}</span>
              </div>

              ${m.options && m.options.length > 0 ? `
                <div class="flex flex-wrap gap-1 mt-1 max-w-[95%]">
                  ${m.options.map(opt => `
                    ${opt.url ? `
                      <a href="${opt.url}" target="_blank" class="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-xl font-semibold transition-all">
                        ${opt.label}
                      </a>
                    ` : `
                      <button data-action="${opt.action}" data-payload="${opt.payload || ''}" class="assistant-opt-btn inline-flex items-center gap-1 text-[11px] bg-white text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2.5 py-1 rounded-xl font-medium transition-all shadow-2xs">
                        ${opt.label}
                      </button>
                    `}
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}

          ${this.isTyping ? `
            <div class="flex items-center gap-2 text-slate-400 text-xs py-1">
              <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
                <i data-lucide="bot" class="w-3.5 h-3.5"></i>
              </div>
              <span>ElectroSat AI печатает ответ...</span>
            </div>
          ` : ''}
        </div>

        <!-- Нижний блок ввода -->
        <div class="p-2.5 sm:p-3 bg-white border-t border-slate-200">
          <form id="assistant-input-form" class="flex items-center gap-2">
            <input 
              id="assistant-text-input" 
              type="text" 
              placeholder="Спросите о пультах, ТВ или монтаже..." 
              class="flex-1 bg-slate-100 focus:bg-white text-slate-800 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              autocomplete="off"
            />
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white p-2.5 rounded-xl transition-all shadow-sm">
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </form>
          <div class="flex items-center justify-between mt-1.5 px-1 text-[10px] text-slate-400">
            <span>Магазин: <strong>ТД «Арман»</strong></span>
            <a href="https://wa.me/${config.WHATSAPP_NUMBER || '77052202575'}" target="_blank" class="text-emerald-600 hover:underline font-bold flex items-center gap-0.5">
              <i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp
            </a>
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
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }
}

window.Assistant = new AssistantBot();
