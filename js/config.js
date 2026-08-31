/**
 * ЦЕНТРАЛЬНАЯ КОНФИГУРАЦИЯ И ПЛЕЙСХОЛДЕРЫ
 * Все данные легко заменяются перед запуском проекта.
 */
const SITE_CONFIG = {
  // Название компании
  COMPANY_NAME: "ElectroSat",
  COMPANY_SUBTITLE: "Видеонаблюдение • Спутниковое ТВ • Техника • Пульты",
  
  // Город и зона обслуживания
  CITY: "Сатпаев",
  SERVICE_REGION: "г. Сатпаев, Жезказган и прилегающие районы (выезд мастера)",
  
  // Контактные телефоны
  PHONE: "+7 (705) 220-25-75",
  PHONE_RAW: "+77052202575",
  PHONE_ADDITIONAL: "8 (705) 220-25-75",
  
  // Мессенджеры для быстрой связи и заказов
  WHATSAPP_NUMBER: "77052202575", // номер без + для ссылки wa.me/
  WHATSAPP_GREETING: "Здравствуйте! Хочу проконсультироваться по оборудованию и установке в ElectroSat (г. Сатпаев, ТД Арман).",
  TELEGRAM_USERNAME: "electrosat_kz", 
  TELEGRAM_LINK: "https://t.me/+77052202575",
  
  // Адрес и график работы
  ADDRESS: "г. Сатпаев, ул. Мангилик Ел 20А, ТД «Арман» (бывшая Комарова 20А)",
  ADDRESS_LANDMARK: "Ориентир: ТД «Арман», удобная парковка перед магазином",
  WORKING_HOURS: "Пн–Сб: 11:00 – 19:00, Вс: 11:00 – 17:00",
  WORKING_HOURS_SHORT: "Пн–Сб: 11:00 – 19:00, Вс: 11:00 – 17:00",
  
  // 2ГИС интеграция
  DGIS_LINK: "https://2gis.kz/zhezkazgan/search/%D0%A2%D0%94%20%D0%90%D1%80%D0%BC%D0%B0%D0%BD%20%D0%9C%D0%B0%D0%BD%D0%B3%D0%B8%D0%BB%D0%B8%D0%BA%20%D0%95%D0%BB%2020%D0%90/firm/70000001069371110/67.52803%2C47.905774",
  DGIS_ROUTE_LINK: "https://2gis.kz/zhezkazgan/firm/70000001069371110/tab/route",
  DGIS_COORDS: {
    lat: 47.905774,
    lng: 67.52803
  },
  
  // Валюта и форматирование
  CURRENCY_SYMBOL: "₸",
  CURRENCY_CODE: "KZT",
  LOCALE: "ru-KZ",
  
  // Стоимость услуг монтажа по умолчанию (в валюте сайта)
  INSTALLATION_PRICES: {
    CAMERA_SINGLE: 4500,     // Монтаж 1 камеры
    CAMERA_KIT_4: 18000,     // Комплект на 4 камеры под ключ
    CAMERA_KIT_8: 32000,     // Комплект на 8 камер под ключ
    SATELLITE_DISH: 7000,    // Установка и юстировка спутниковой тарелки
    SATELLITE_TUNING: 4000,  // Настройка ресивера / поиск каналов
    TV_BRACKET: 3500,        // Монтаж кронштейна и навес ТВ
    REMOTE_SETUP: 1500,      // Настройка и подбор пульта
    CALLOUT_MASTER: 0        // Выезд мастера на замер (бесплатно при заказе)
  },
  
  // Ссылки на маркетплейсы магазина по умолчанию
  MARKETPLACES: {
    KASPI_STORE_URL: "https://kaspi.kz",
    OZON_STORE_URL: "https://ozon.kz/seller/ip-mihaylenko/",
    WILDBERRIES_STORE_URL: "https://www.wildberries.ru/seller/250158087"
  },
  
  // Время ответа в мессенджерах
  RESPONSE_TIME: "5–15 минут",

  // ==========================================
  // ИНТЕГРАЦИЯ AI КОНСУЛЬТАНТА (Groq / xAI API)
  // ==========================================
  GROK_API_KEY: "", // Устанавливается автоматически или через меню настроек
  GROK_MODEL: "qwen/qwen3.8-27b",
  GROK_API_URL: "https://api.groq.com/openai/v1/chat/completions",
  GROK_SYSTEM_PROMPT_PREFIX: "Ты — официальный виртуальный AI-консультант магазина ElectroSat в городе Сатпаев (ТД «Арман», ул. Мангилик Ел 20А, бывшая Комарова 20А). Телефон/WhatsApp: +7 (705) 220-25-75."
};

// Экспорт для использования в модулях или глобально
if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}
