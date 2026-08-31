/**
 * КАТАЛОГ ТОВАРОВ МАГАЗИНА ELECTROSAT
 * Реальные товары из магазина на Ozon (ИП Михайленко)
 */

const PRODUCTS_DATA = [
  // ==========================================
  // 1. ПУЛЬТЫ ДЛЯ ТЕЛЕВИЗОРОВ И СПУТНИКОВЫХ РЕСИВЕРОВ
  // ==========================================
  {
    id: "ozon-1829366751",
    sku: "1829366751",
    name: "Пульт для ресиверов Телекарта EVO 09 HD / EVO 07 HD / EVO 01",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "satellite-remotes",
    brand: "HUAYU",
    model: "EVO-09 HD / EVO-07 HD / EVO-01",
    price: 2078,
    oldPrice: 2800,
    badge: "Хит продаж",
    badgeType: "hit",
    inStock: true,
    stockCount: 79,
    rating: 4.9,
    reviewCount: 1133,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-5/12321993605.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-p/12321993409.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-n/12321993191.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-i/12321993366.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-4/12321993316.jpg"
    ],
    shortSpecs: "Для ресиверов Телекарта EVO 09/07/01 HD • Ударопрочный пластик • Питание 2x AAA • Не требует настройки",
    description: "Качественный пульт дистанционного управления для спутниковых цифровых приемников Телекарта моделей EVO 09 HD, EVO 07 HD и EVO 01. Полностью заменяет оригинальный пульт, работает сразу после установки батареек без дополнительного программирования.",
    fullSpecs: {
      "Совместимые ресиверы": "Телекарта EVO 09 HD, EVO 07 HD, EVO 01",
      "Тип сигнала": "Инфракрасный (IR)",
      "Радиус действия": "До 10 метров",
      "Корпус": "Качественный ABS-пластик с износостойкими кнопками",
      "Элементы питания": "2x AAA (мизинчиковые)"
    },
    compatibility: {
      brand: "Телекарта",
      supportedTypes: ["Спутниковые ресиверы HD"],
      supportedYears: "2015–2024",
      sampleModels: ["EVO 09 HD", "EVO 07 HD", "EVO 01", "EVO 02"],
      compatibleReplacements: "Оригинальный пульт Телекарта EVO"
    },
    warranty: "6 месяцев гарантии / обмен при несовместимости",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман») / Быстрая доставка",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/pult-dlya-resiverov-telekarta-evo-09-hd-evo-07-hd-evo-01-1829366751/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-1853547422",
    sku: "1853547422",
    name: "LG / Универсальный пульт для всех телевизоров LG",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "lg-remotes",
    brand: "HUAYU",
    model: "RM-L1162 / LG Universal",
    price: 1958,
    oldPrice: 3105,
    badge: "Распродажа",
    badgeType: "sale",
    inStock: true,
    stockCount: 7,
    rating: 4.9,
    reviewCount: 17,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-9/11914726941.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-q/11914726778.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-5/11914726649.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-t/11914726817.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-a/11883488194.jpg"
    ],
    shortSpecs: "Подходит ко всем ТВ LG (Smart TV / 3D / LED / LCD) • Кнопки Smart, Netflix, Prime • Без кодов",
    description: "Универсальный полнофункциональный пульт для любых телевизоров LG. Поддерживает все современные функции Smart TV, 3D, меню настроек и медиаплеер. Не требует предварительной настройки — вставил батарейки и управляй.",
    fullSpecs: {
      "Совместимость": "Все модели LG Smart TV, LED, LCD, OLED, NanoCell",
      "Поддерживаемые коды": "AKB75095307, AKB75375604, AKB74915324, AKB73715601 и др.",
      "Тип подключения": "Инфракрасный (IR)",
      "Материал": "Ударопрочный ABS-пластик, силиконовые кнопки",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "LG",
      supportedTypes: ["OLED", "NanoCell", "QNED", "4K Ultra HD", "Smart TV", "LCD / LED"],
      supportedYears: "2008–2024",
      sampleModels: [
        "32LM6300", "43UP7500", "50UQ8000", "55NANO80", "55OLED C1/C2/C3",
        "43LM5700", "49UM7020", "55UN7300", "65UP7700", "32LK6190"
      ],
      compatibleReplacements: "Заменяет любые классические пульты LG AKB серии"
    },
    warranty: "6 месяцев гарантии / проверка на месте",
    deliveryInfo: "Самовывоз сегодня / Доставка по городу",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/lg-universalnyy-pult-dlya-vseh-televizorov-lg-1853547422/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-4944656456",
    sku: "4944656456",
    name: "Пульт для телевизора ARG, универсальный, черный",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "arg-remotes",
    brand: "ARG",
    model: "ARG-TV-UNI",
    price: 2185,
    oldPrice: 3510,
    badge: "Распродажа",
    badgeType: "sale",
    inStock: true,
    stockCount: 7,
    rating: 5.0,
    reviewCount: 3,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-s/12143009260.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-2/12143010026.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-g/11953779280.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-6/12143757822.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-c/12143764488.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-s/12143757880.jpg"
    ],
    shortSpecs: "Совместим со всеми телевизорами ARG • Кнопки Smart, YouTube, Меню • Удобный хват",
    description: "Универсальный пульт дистанционного управления для популярных в Казахстане телевизоров марки ARG (Smart TV и стандартных моделей). Выполнен из прочного пластика с четким тактильным кликом клавиш.",
    fullSpecs: {
      "Бренд ТВ": "ARG",
      "Тип сигнала": "Инфракрасный (IR)",
      "Радиус действия": "До 10 м",
      "Функционал": "Полный доступ ко всем функциям Smart TV и меню",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "ARG",
      supportedTypes: ["LED, Smart TV, Android TV марки ARG"],
      supportedYears: "2016–2024",
      sampleModels: ["ARG 32", "ARG 40", "ARG 43 Smart", "ARG 50 4K", "ARG 55 UHD"],
      compatibleReplacements: "Заменяет оригинальный пульт ARG"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии в магазине ElectroSat",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/pult-dlya-televizora-arg-universalnyy-chernyy-4944656456/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-1860368493",
    sku: "1860368493",
    name: "Пульт Sony универсальный для телевизоров",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "sony-remotes",
    brand: "HUAYU",
    model: "RM-L1165 / Sony Universal",
    price: 2058,
    oldPrice: 2900,
    badge: "Выгодно",
    badgeType: "sale",
    inStock: true,
    stockCount: 6,
    rating: 4.7,
    reviewCount: 7,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-6/11995198998.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-u/11995198410.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-n/11995199231.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-3/11995199895.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-t/11995199633.jpg"
    ],
    shortSpecs: "Для всех телевизоров Sony Bravia (Smart TV / 4K / OLED / LCD) • Кнопки Netflix, Home, Google Play",
    description: "Универсальный пульт дистанционного управления для телевизоров Sony Bravia. Совместим практически со всеми моделями Sony от классических LCD до новейших 4K Android TV и Google TV.",
    fullSpecs: {
      "Совместимость": "Все телевизоры Sony Bravia, LCD, LED, OLED",
      "Поддерживаемые серии пультов": "RMT-TX100D, RMT-TX102D, RMT-TX200E, RMT-TX300E, RM-ED047 и др.",
      "Тип подключения": "Инфракрасный (IR)",
      "Материал": "ABS пластик премиум качества",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Sony",
      supportedTypes: ["Bravia OLED", "Bravia 4K HDR", "Android TV", "Full HD LED"],
      supportedYears: "2010–2024",
      sampleModels: [
        "KDL-32WD756", "KDL-40WD653", "KD-43X81J", "KD-50X85J", "KD-55X90J",
        "XR-55A80J", "KDL-48W655D", "KD-65X80K"
      ],
      compatibleReplacements: "Заменяет любой пульт Sony серии RMT и RM"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии во всех филиалах",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/pult-sony-universalnyy-dlya-televizorov-1860368493/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-4880651840",
    sku: "4880651840",
    name: "Пульт ДУ для OTAU TV ZK-089+10 замена оригинального пульта",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "otau-remotes",
    brand: "OTAU TV",
    model: "ZK-089+10",
    price: 1793,
    oldPrice: 2500,
    badge: "Хит продаж",
    badgeType: "hit",
    inStock: true,
    stockCount: 11,
    rating: 5.0,
    reviewCount: 1,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-9/11950394445.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-d/11950394233.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-0/11950395084.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-a/11950487434.jpg"
    ],
    shortSpecs: "Специально для приемников Отау ТВ ZK-089+10 • Точное соответствие раскладки • Быстрый отклик",
    description: "Оригинальный пульт дистанционного управления для приемников спутникового и эфирного телевидения «Отау ТВ» (OTAU TV) модели ZK-089+10. Четкая маркировка на кнопках, надежный передатчик сигнала.",
    fullSpecs: {
      "Назначение": "Ресиверы и тюнеры OTAU TV",
      "Модель приемника": "ZK-089+10, Otau HD",
      "Тип сигнала": "Инфракрасный (IR)",
      "Питание": "2x AAA батарейки"
    },
    compatibility: {
      brand: "Отау ТВ",
      supportedTypes: ["Спутниковые и эфирные ресиверы Отау ТВ"],
      supportedYears: "Все года выпуска",
      sampleModels: ["ZK-089+10", "ZK-089", "OTAU TV HD"],
      compatibleReplacements: "Заменяет заводской пульт Отау ТВ"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/pult-du-dlya-otau-tv-zk-089-10-zamena-originalnogo-pulta-4880651840/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-1860366434",
    sku: "1860366434",
    name: "Универсальный пульт для всех телевизоров PHILIPS / ФИЛИПС",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "philips-remotes",
    brand: "HUAYU",
    model: "RM-L1225 / Philips Universal",
    price: 1957,
    oldPrice: 2800,
    badge: "Выгодно",
    badgeType: "sale",
    inStock: true,
    stockCount: 9,
    rating: 4.4,
    reviewCount: 6,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-u/12067740930.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-4/12067741588.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-u/12067741362.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-i/12067742862.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-4/12067739896.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-s/12067741720.jpg"
    ],
    shortSpecs: "Подходит ко всем ТВ Philips (Ambilight / Smart TV / Android TV / 4K) • Кнопки Smart, Netflix, Ambilight",
    description: "Универсальный пульт дистанционного управления для всех типов телевизоров Philips. Поддерживает управление подсветкой Ambilight, приложениями Smart TV, доступ к меню и переключение источников сигнала.",
    fullSpecs: {
      "Совместимость": "Все телевизоры Philips (LED, LCD, OLED, Ambilight)",
      "Тип подключения": "Инфракрасный (IR)",
      "Материал": "Качественный ABS пластик",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Philips",
      supportedTypes: ["Ambilight OLED", "The One 4K", "Android TV", "Saphi Smart TV"],
      supportedYears: "2005–2024",
      sampleModels: [
        "43PUS7505", "50PUS8506", "55OLED706", "58PUS8505", "65PUS8807",
        "32PHS6605", "43PFS5505", "50PUS7607"
      ],
      compatibleReplacements: "Заменяет любые пульты Philips"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии в магазине",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/universalnyy-pult-dlya-vseh-televizorov-philips-filips-1860366434/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-1853551360",
    sku: "1853551360",
    name: "Samsung / универсальный пульт для телевизоров Samsung",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "samsung-remotes",
    brand: "HUAYU",
    model: "RM-L1088 / Samsung Universal",
    price: 1957,
    oldPrice: 5401,
    badge: "Распродажа -63%",
    badgeType: "sale",
    inStock: true,
    stockCount: 4,
    rating: 5.0,
    reviewCount: 3,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-z/11992239827.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-f/11992240635.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-n/11992239959.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-i/11992238586.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-m/11992240138.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-6/11992235082.jpg"
    ],
    shortSpecs: "Для всех моделей Samsung (Smart Hub, 4K UHD, QLED, Crystal UHD, LED) • Кнопки Smart, Netflix, Меню",
    description: "Универсальный пульт управления для любых телевизоров Samsung. Работает сразу из коробки без ввода сложных кодов. Отличная замена сломанному или потерянному оригинальному пульту Samsung.",
    fullSpecs: {
      "Совместимость": "Все телевизоры Samsung (QLED, Crystal UHD, LED, LCD, Smart Hub)",
      "Поддерживаемые серии пультов": "BN59-01199F, BN59-01259B, BN59-01315B, BN59-01175N и др.",
      "Тип подключения": "Инфракрасный (IR)",
      "Материал": "ABS пластик, эргономичный корпус",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Samsung",
      supportedTypes: ["QLED", "Crystal UHD", "Neo QLED", "Smart TV", "LED / LCD"],
      supportedYears: "2006–2024",
      sampleModels: [
        "UE32T4500", "UE43AU7100", "UE50AU8000", "UE55CU7100", "QE55Q60A",
        "UE43TU7002", "UE50TU8500", "UE55RU7100", "UE65BU8000"
      ],
      compatibleReplacements: "Заменяет любой пульт Samsung серии BN59 и AA59"
    },
    warranty: "6 месяцев гарантии / обмен при несовместимости",
    deliveryInfo: "Самовывоз сегодня / Доставка по городу",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/samsung-universalnyy-pult-dlya-televizorov-samsung-1853551360/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },

  // ==========================================
  // 2. ПОЛКИ, КРОНШТЕЙНЫ И ТВ АКСЕССУАРЫ
  // ==========================================
  {
    id: "ozon-1856887821",
    sku: "1856887821",
    name: "Стеклянная полка под телевизор для ресивера, ТВ приставки, Wi-Fi роутера, медиаплеера",
    category: "appliances",
    categoryName: "Полки и ТВ аксессуары",
    subCategory: "tv-shelves",
    brand: "ElectroSat",
    model: "Glass-Shelf-Wall PRO",
    price: 3658,
    oldPrice: 4900,
    badge: "Хит продаж",
    badgeType: "hit",
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 10,
    requiresInstallation: true,
    installationPrice: 2000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-1/13088469565.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-8/11937900788.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-l/7378357197.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-g/11953779280.jpg"
    ],
    shortSpecs: "Настенная полка из закалённого стекла 5 мм • Нагрузка до 10 кг • Кабель-канал • Полный крепёж в комплекте",
    description: "Стильная настенная стеклянная полка для установки под настенным телевизором. Идеально размещает цифровые ресиверы Отау ТВ и Телекарта, смарт ТВ-приставки, Wi-Fi роутеры, игровые консоли и медиаплееры. Изготовлена из закаленного ударопрочного стекла с закругленными полированными углами.",
    fullSpecs: {
      "Материал полки": "Ударопрочное закаленное стекло (Safety Glass 5 мм)",
      "Материал кронштейна": "Металлический профиль с порошковой покраской",
      "Максимальная нагрузка": "До 10 кг",
      "Кабель-менеджмент": "Встроенный скрытый кабель-канал",
      "Комплектация": "Стеклянная полка, металлический кронштейн, дюбели, винты, инструкция"
    },
    warranty: "24 месяца гарантии",
    deliveryInfo: "В наличии в г. Сатпаев / Монтаж под ключ",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/steklyannaya-polka-pod-televizor-dlya-resivera-tv-pristavki-wi-fi-routera-mediapleera-1856887821/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  }
];

// Категории для фильтров и каталога магазина
const CATEGORIES_DATA = [
  {
    id: "all",
    name: "Все товары на Ozon",
    icon: "layers",
    count: PRODUCTS_DATA.length
  },
  {
    id: "remotes",
    name: "Пульты для ТВ и техники",
    icon: "tv",
    count: PRODUCTS_DATA.filter(p => p.category === "remotes").length
  },
  {
    id: "satellite",
    name: "Пульты для ресиверов (Отау / Телекарта)",
    icon: "radio",
    count: PRODUCTS_DATA.filter(p => p.subCategory === "satellite-remotes" || p.subCategory === "otau-remotes").length
  },
  {
    id: "appliances",
    name: "Полки и ТВ аксессуары",
    icon: "monitor",
    count: PRODUCTS_DATA.filter(p => p.category === "appliances").length
  }
];

// Экспорт для использования в модулях или глобально
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.CATEGORIES_DATA = CATEGORIES_DATA;
}
