/**
 * МОДУЛЬ ПРОВЕРКИ СОВМЕСТИМОСТИ ПУЛЬТОВ ДУ
 * Позволяет пользователю мгновенно узнать, какой пульт из каталога Ozon подходит для его техники.
 */
const REMOTE_COMPATIBILITY_DB = [
  {
    brand: "LG",
    keywords: ["lg", "элджи", "эл джи", "nanocell", "oled", "qned", "webos", "akb"],
    recommendedProductId: "ozon-1853547422",
    recommendedProductName: "LG / Универсальный пульт для всех телевизоров LG",
    matchTypes: ["OLED", "NanoCell", "QNED", "UHD 4K", "Smart TV webOS", "LCD/LED LG"],
    tip: "Универсальный пульт HUAYU для всех моделей LG. Поддерживает кнопки Smart, Netflix, Prime и все функции оригинального пульта без настройки.",
    commonModels: ["OLED55C1", "50NANO866", "43UP7500", "55UQ8000", "50UR8000", "43LM5772", "32LM6300"]
  },
  {
    brand: "Samsung",
    keywords: ["samsung", "самсунг", "qled", "crystal", "the frame", "neo qled", "smart hub", "bn59"],
    recommendedProductId: "ozon-1853551360",
    recommendedProductName: "Samsung / универсальный пульт для телевизоров Samsung",
    matchTypes: ["Neo QLED", "QLED 4K/8K", "Crystal UHD", "The Frame", "Smart Hub", "LCD/LED Samsung"],
    tip: "Универсальный пульт HUAYU RM-L1088 для любых телевизоров Samsung. Работает сразу из коробки, поддерживает Smart Hub и Netflix.",
    commonModels: ["UE43AU7100", "UE50AU8000", "UE55CU7100", "QE55Q60A", "QE65Q70B", "UE32T4500", "UE50TU8500"]
  },
  {
    brand: "ARG",
    keywords: ["arg", "арг"],
    recommendedProductId: "ozon-4944656456",
    recommendedProductName: "Пульт для телевизора ARG, универсальный, черный",
    matchTypes: ["ARG Smart TV", "ARG Android TV", "ARG LED TV"],
    tip: "Специализированный пульт для телевизоров ARG. 100% совместимость со всеми моделями ARG диагональю от 24 до 65 дюймов.",
    commonModels: ["ARG 32 Smart", "ARG 40 LED", "ARG 43 4K", "ARG 50 UHD", "ARG 55"]
  },
  {
    brand: "Sony",
    keywords: ["sony", "сони", "bravia", "бравия", "android tv", "rmt", "rm-ed"],
    recommendedProductId: "ozon-1860368493",
    recommendedProductName: "Пульт Sony универсальный для телевизоров",
    matchTypes: ["Bravia Smart TV", "Android TV Sony", "LCD/LED Sony Bravia"],
    tip: "Универсальный пульт HUAYU для телевизоров Sony Bravia. Поддерживает все команды и навигацию по меню Android TV.",
    commonModels: ["KD-55X85J", "KD-43X75K", "XR-55A80J", "KDL-40W650D", "KDL-32WD756"]
  },
  {
    brand: "Philips",
    keywords: ["philips", "филипс", "ambilight", "saphi"],
    recommendedProductId: "ozon-1860366434",
    recommendedProductName: "Универсальный пульт для всех телевизоров PHILIPS / ФИЛИПС",
    matchTypes: ["Philips Smart TV", "Android TV Philips", "Ambilight TV"],
    tip: "Полнофункциональный пульт HUAYU RM-L1225 для Philips. Поддерживает управление подсветкой Ambilight и функции Smart TV.",
    commonModels: ["50PUS8506", "43PUS7505", "55OLED706", "32PFS6805", "58PUS8505"]
  },
  {
    brand: "Отау ТВ (OTAU TV)",
    keywords: ["otau", "отау", "otau tv", "zk-089", "отау тв", "kazsat"],
    recommendedProductId: "ozon-4880651840",
    recommendedProductName: "Пульт ДУ для OTAU TV ZK-089+10 замена оригинального пульта",
    matchTypes: ["OTAU TV ZK-089+10", "Ресиверы Отау ТВ", "Эфирные тюнеры OTAU"],
    tip: "Оригинальный пульт для цифровых спутниковых и эфирных приемников OTAU TV ZK-089+10.",
    commonModels: ["ZK-089+10", "ZK-089", "OTAU TV HD"]
  },
  {
    brand: "Xiaomi",
    keywords: ["xiaomi", "сяоми", "mi tv", "redmi", "mitv", "mi box", "mi stick"],
    recommendedProductId: "ozon-1853547422",
    recommendedProductName: "Пульт для Xiaomi Mi TV / Android TV",
    matchTypes: ["Xiaomi Mi TV 4A/4S/P1/A2", "Redmi TV", "Xiaomi TV Box & Stick"],
    tip: "Пульт с поддержкой Bluetooth и голосового поиска для всех телевизоров и приставок Xiaomi/Redmi.",
    commonModels: ["Mi TV 4S 43/55", "Mi TV P1 32/43/55", "Mi TV A2", "Xiaomi TV Stick 4K"]
  },
  {
    brand: "TCL",
    keywords: ["tcl", "тсл", "android tv tcl", "google tv tcl"],
    recommendedProductId: "ozon-1853547422",
    recommendedProductName: "Универсальный пульт для телевизоров TCL",
    matchTypes: ["TCL Smart TV", "TCL Android TV", "TCL Google TV", "TCL 4K UHD"],
    tip: "Совместимый пульт для современных телевизоров TCL всех диагоналей от 32 до 65 дюймов.",
    commonModels: ["TCL 32S5200", "TCL 43P635", "TCL 50P735", "TCL 55C735", "TCL 65C835"]
  },
  {
    brand: "DEXP",
    keywords: ["dexp", "дексп"],
    recommendedProductId: "ozon-4944656456",
    recommendedProductName: "Пульт универсальный для телевизоров DEXP",
    matchTypes: ["DEXP LED TV", "DEXP Smart TV", "DEXP Android TV"],
    tip: "Универсальный пульт для телевизоров DEXP. Работает без дополнительной настройки.",
    commonModels: ["DEXP H32D7000", "DEXP F43D7000", "DEXP U50E9000", "DEXP U55E9000"]
  },
  {
    brand: "Телекарта",
    keywords: ["telekarta", "телекарта", "evo", "evo 09", "evo 07", "evo 01", "эво"],
    recommendedProductId: "ozon-1829366751",
    recommendedProductName: "Пульт для ресиверов Телекарта EVO 09 HD / EVO 07 HD / EVO 01",
    matchTypes: ["Телекарта EVO 09 HD", "Телекарта EVO 07 HD", "Телекарта EVO 01/02"],
    tip: "Пульт для спутниковых HD ресиверов Телекарта серии EVO. Работает сразу без программирования.",
    commonModels: ["EVO 09 HD", "EVO 07 HD", "EVO 01", "EVO 02"]
  }
];

class RemoteChecker {
  constructor() {
    this.db = REMOTE_COMPATIBILITY_DB;
  }

  /**
   * Проверка совместимости по введенному тексту (бренд / модель)
   */
  checkCompatibility(query) {
    if (!query || query.trim().length === 0) {
      return { status: "empty", message: "Введите марку или модель вашей техники" };
    }

    const cleanQuery = query.toLowerCase().trim();
    
    // Ищем точное или частичное совпадение по брендам и ключевым словам
    for (const item of this.db) {
      const match = item.keywords.some(kw => cleanQuery.includes(kw));
      if (match) {
        // Найден подходящий бренд
        const product = (window.PRODUCTS_DATA || []).find(p => p.id === item.recommendedProductId);
        return {
          status: "found",
          brand: item.brand,
          recommendedProduct: product,
          tip: item.tip,
          matchTypes: item.matchTypes,
          sampleModels: item.commonModels,
          query: query
        };
      }
    }

    // Если точный бренд не распознан, предлагаем универсальный пульт + консультацию мастера
    const defaultProduct = (window.PRODUCTS_DATA || [])[0];
    return {
      status: "universal",
      brand: "Проверка по модели",
      recommendedProduct: defaultProduct,
      tip: "У нас в наличии пульты для LG, Samsung, Sony, Philips, ARG, Xiaomi, TCL, DEXP, Отау ТВ и Телекарта! Отправьте нам фото старого пульта или шильдика ТВ в WhatsApp, и мы подберем 100% совместимый вариант за 2 минуты.",
      query: query
    };
  }

  /**
   * Генерация ссылки на WhatsApp с предзаполненным вопросом о модели
   */
  getWhatsAppCheckLink(brandOrModel) {
    const config = window.SITE_CONFIG || {};
    const phone = config.WHATSAPP_NUMBER || "77052202575";
    const text = encodeURIComponent(
      `Здравствуйте! Помогите, пожалуйста, подобрать пульт для техники: "${brandOrModel || 'Телевизор / Ресивер'}". Есть ли в наличии совместимый пульт в магазине ElectroSat (ТД Арман)?`
    );
    return `https://wa.me/${phone}?text=${text}`;
  }
}

window.RemoteChecker = new RemoteChecker();

// Глобальная функция для клика по чипам брендов
window.fillRemoteBrand = function(brand) {
  const input = document.getElementById("remote-checker-input");
  const btn = document.getElementById("remote-checker-btn");
  if (input) {
    input.value = brand;
    if (btn) {
      btn.click();
    }
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
