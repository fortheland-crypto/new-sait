/**
 * КАТАЛОГ ТОВАРОВ МАГАЗИНА ELECTROSAT
 * Полный ассортимент товаров из магазинов на Ozon и Wildberries (ИП Михайленко)
 */

const PRODUCTS_DATA = [
  // ==========================================
  // 1. ОРИГИНАЛЬНЫЕ ПУЛЬТЫ ДЛЯ ТВ И СПУТНИКОВЫХ РЕСИВЕРОВ С OZON
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
    badge: "Хит Ozon",
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
      "Совместимые ресиверы": "Телекарта EVO 09 HD, EVO 07 HD, EVO 01, EVO 02",
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
    name: "LG / Универсальный пульт для всех телевизоров LG Smart TV",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "lg-remotes",
    brand: "HUAYU",
    model: "RM-L1162 / LG Universal",
    price: 1958,
    oldPrice: 3105,
    badge: "Хит Ozon",
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
      "https://ir.ozone.ru/s3/multimedia-1-t/11914726817.jpg"
    ],
    shortSpecs: "Подходит ко всем ТВ LG (Smart TV / 3D / LED / LCD) • Кнопки Smart, Netflix, Prime • Без кодов",
    description: "Универсальный полнофункциональный пульт для любых телевизоров LG. Поддерживает все современные функции Smart TV, 3D, меню настроек и медиаплеер. Не требует предварительной настройки — вставил батарейки и управляй.",
    fullSpecs: {
      "Совместимость": "Все модели LG Smart TV, LED, LCD, OLED, NanoCell, QNED",
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
    id: "ozon-1853551360",
    sku: "1853551360",
    name: "Samsung / универсальный пульт для телевизоров Samsung",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "samsung-remotes",
    brand: "HUAYU",
    model: "RM-L1088 / Samsung Smart",
    price: 1957,
    oldPrice: 3200,
    badge: "Хит Ozon",
    badgeType: "hit",
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 7,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-z/11992239827.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-f/11992240635.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-n/11992239959.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-i/11992238586.jpg"
    ],
    shortSpecs: "Для всех моделей телевизоров Samsung (Smart TV, Crystal UHD, QLED, Neo QLED) • Прямой доступ к Smart Hub",
    description: "Универсальный надежный пульт ДУ для всех моделей телевизоров Samsung от кинескопных до новейших QLED и Smart TV 4K/8K. Работает сразу без настройки.",
    fullSpecs: {
      "Совместимость": "Все телевизоры Samsung (Smart TV, LED, LCD, QLED, Neo QLED)",
      "Заменяемые модели": "BN59-01259D, BN59-01259E, BN59-01241A, BN59-01199F, BN59-01315B и др.",
      "Тип сигнала": "Инфракрасный",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Samsung",
      supportedTypes: ["QLED", "Crystal UHD", "Neo QLED", "The Frame", "Smart TV", "LED Full HD"],
      supportedYears: "2006–2024",
      sampleModels: [
        "UE43AU7100", "UE50AU8000", "QE55Q60A", "UE32T5300", "QE65Q70T",
        "UE40NU7100", "UE49MU6100", "UE55TU8500", "QE50Q67A"
      ],
      compatibleReplacements: "Заменяет любые классические пульты Samsung BN59 серии"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/samsung-universalnyy-pult-dlya-televizorov-samsung-1853551360/",
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
    badge: "Хит Ozon",
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
      "https://ir.ozone.ru/s3/multimedia-1-6/12143757822.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-c/12143764488.jpg"
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
      sampleModels: ["ARG 32 Smart", "ARG 43 Smart 4K", "ARG 50 UHD", "ARG 55 Android TV"],
      compatibleReplacements: "Заменяет любые штатные пульты ARG"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/pult-dlya-televizora-arg-universalnyy-chernyy-4944656456/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-1860368493",
    sku: "1860368493",
    name: "Пульт Sony универсальный для телевизоров Sony Bravia",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "sony-remotes",
    brand: "HUAYU",
    model: "RM-L1185 / Sony Bravia",
    price: 2058,
    oldPrice: 2900,
    badge: "Хит Ozon",
    badgeType: "hit",
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 3,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-6/11995198998.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-u/11995198410.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-n/11995199231.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-3/11995199895.jpg"
    ],
    shortSpecs: "Для телевизоров Sony Bravia (LED, LCD, OLED, Android TV) • Кнопки Netflix, Google Play, Sync Menu",
    description: "Универсальный пульт дистанционного управления для любых телевизоров Sony Bravia. Обеспечивает мгновенный доступ ко всем функциям Smart TV, меню Home и переключению входов. Высокое качество сборки.",
    fullSpecs: {
      "Совместимость": "Все телевизоры Sony Bravia (Smart TV, Android TV, Google TV)",
      "Заменяемые пульты": "RMT-TX100D, RMT-TX102D, RMT-TX200E, RMT-TX300E, RMF-TX500E (ИК функции) и др.",
      "Тип подключения": "Инфракрасный (IR)",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Sony",
      supportedTypes: ["Bravia OLED", "Bravia XR", "Android TV", "Google TV", "LED Full HD/4K"],
      supportedYears: "2006–2024",
      sampleModels: [
        "KD-43X81J", "KD-55X85J", "XR-55A80J", "KDL-32W605D", "KD-49XG7005",
        "KDL-40W650D", "KD-50X80K", "KD-65X90J"
      ],
      compatibleReplacements: "Заменяет любые классические пульты Sony RMT серии"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "Самовывоз сегодня / Доставка по городу",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/pult-sony-universalnyy-dlya-televizorov-1860368493/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "ozon-4880651840",
    sku: "4880651840",
    name: "Пульт ДУ для OTAU TV ZK-089+10 (замена оригинала Отау ТВ)",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "otau-remotes",
    brand: "OTAU TV",
    model: "ZK-089+10",
    price: 1793,
    oldPrice: 2500,
    badge: "Хит Ozon",
    badgeType: "hit",
    inStock: true,
    stockCount: 6,
    rating: 5.0,
    reviewCount: 3,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-9/11950394445.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-d/11950394233.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-0/11950395084.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-a/11950487434.jpg"
    ],
    shortSpecs: "Для спутниковых и эфирных ресиверов OTAU TV (Отау ТВ) ZK-089+10 • 100% замена оригинала • Без кодов",
    description: "Пульт дистанционного управления для национального спутникового и эфирного телевидения Отау ТВ. Подходит для популярных моделей ресиверов OTAU TV ZK-089+10. Не требует настройки, работает сразу после установки элементов питания.",
    fullSpecs: {
      "Совместимость": "Ресиверы OTAU TV ZK-089+10 и аналогичные спутниковые приёмники Отау ТВ",
      "Тип сигнала": "Инфракрасный",
      "Корпус": "ABS-пластик, устойчивый к падениям",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Отау ТВ",
      supportedTypes: ["Спутниковые ресиверы Отау ТВ DVB-S2", "Эфирные приемники DVB-T2"],
      supportedYears: "2014–2024",
      sampleModels: ["ZK-089+10", "ZK-089", "OTAU HD-100", "OTAU DVB-S2"],
      compatibleReplacements: "Оригинальный пульт Отау ТВ"
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
    name: "Универсальный пульт для всех телевизоров Philips (Филипс)",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "philips-remotes",
    brand: "HUAYU",
    model: "RM-L1220 / Philips Smart",
    price: 1957,
    oldPrice: 3200,
    badge: "Хит Ozon",
    badgeType: "sale",
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 3,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-u/12067740930.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-4/12067741588.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-u/12067741362.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-i/12067742862.jpg"
    ],
    shortSpecs: "Для всех телевизоров Philips (Smart TV, Android TV, Ambilight, LED, LCD) • Кнопки Netflix, Ambilight, Меню",
    description: "Универсальный пульт для любых телевизоров Philips. Поддерживает фирменные функции Philips Smart TV, подсветку Ambilight, быстрый запуск Netflix и цифровое меню. Не требует ввода кодов.",
    fullSpecs: {
      "Совместимость": "Все телевизоры Philips (LED, LCD, OLED, Ambilight, Smart TV)",
      "Заменяемые пульты": "2422 549 90467, 2422 549 90301, YKF308-001, YKF314-001 и др.",
      "Тип подключения": "Инфракрасный (IR)",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Philips",
      supportedTypes: ["Ambilight 4K", "OLED", "The One", "Android TV", "Saphi Smart TV", "LED Full HD"],
      supportedYears: "2008–2024",
      sampleModels: [
        "43PUS7505", "50PUS8505", "55OLED706", "32PFS6805", "58PUS8506",
        "43PFT4112", "55PUS7805", "65PUS8807"
      ],
      compatibleReplacements: "Заменяет любые классические пульты Philips"
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "Самовывоз сегодня / Доставка по городу",
    marketplaceLinks: {
      ozon: "https://ozon.kz/product/universalnyy-pult-dlya-vseh-televizorov-philips-filips-1860366434/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "remote-dvb-t2",
    sku: "HUAYU-DVB-T2",
    name: "Пульт HUAYU универсальный для всех цифровых приставок DVB-T2 / тюнеров",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "satellite-remotes",
    brand: "HUAYU",
    model: "DVB-T2+3 Universal",
    price: 1850,
    oldPrice: 2600,
    badge: "Для приставок",
    badgeType: "sale",
    inStock: true,
    stockCount: 19,
    rating: 4.9,
    reviewCount: 45,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-9/11950394445.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-5/12321993605.jpg"
    ],
    shortSpecs: "Подходит для 99% цифровых DVB-T2 приставок (World Vision, Selenga, Oriel, D-Color, Lumax) • Автопоиск",
    description: "Универсальный пульт для любых эфирных цифровых приставок DVB-T2. Содержит базу кодов сотен производителей, простая настройка одной кнопкой или автопоиском.",
    fullSpecs: {
      "Совместимость": "World Vision, Selenga, Oriel, D-Color, Lumax, Cadena, BBK, Perfeo, GoldMaster и др.",
      "Тип сигнала": "Инфракрасный (IR)",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "DVB-T2 Universal",
      supportedTypes: ["Цифровые эфирные приставки DVB-T2"],
      supportedYears: "2012–2024",
      sampleModels: ["World Vision T62", "Selenga HD950", "Oriel 421", "Lumax DVB-T2"]
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "remote-chinese-tv",
    sku: "HUAYU-RM-L1335",
    name: "Универсальный пульт для Smart TV Hisense / Haier / TCL / Xiaomi / Yasin",
    category: "remotes",
    categoryName: "Пульты для ТВ и ресиверов",
    subCategory: "remotes",
    brand: "HUAYU",
    model: "RM-L1335 Smart",
    price: 2150,
    oldPrice: 3300,
    badge: "Android TV",
    badgeType: "hit",
    inStock: true,
    stockCount: 14,
    rating: 5.0,
    reviewCount: 28,
    requiresInstallation: false,
    installationPrice: 1000,
    images: [
      "https://ir.ozone.ru/s3/multimedia-1-s/12143009260.jpg",
      "https://ir.ozone.ru/s3/multimedia-1-2/12143010026.jpg"
    ],
    shortSpecs: "Для современных Smart TV Hisense, TCL, Haier, Xiaomi Mi TV, Yasin • Кнопки YouTube, Netflix, Google Play",
    description: "Универсальный пульт дистанционного управления для популярных в Казахстане современных телевизоров на Android TV и Vidaa OS. Высокое качество корпуса и быстрый отклик.",
    fullSpecs: {
      "Совместимость": "Hisense, TCL, Haier, Xiaomi, Yasin, Skyworth, DEXP, Harper",
      "Тип подключения": "Инфракрасный (IR)",
      "Питание": "2x AAA"
    },
    compatibility: {
      brand: "Universal Android TV",
      supportedTypes: ["Smart TV", "Android TV", "Google TV", "4K UHD"],
      supportedYears: "2017–2024",
      sampleModels: ["Hisense 43A6BG", "TCL 50P615", "Haier 32 Smart", "Xiaomi Mi TV 4A/4S/P1"]
    },
    warranty: "6 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },

  // ==========================================
  // 2. ПОЛКИ, КРОНШТЕЙНЫ, ПОДСТАВКИ И БЛОКИ ПИТАНИЯ
  // ==========================================
  {
    id: "ozon-1856887821",
    sku: "1856887821",
    name: "Стеклянная полка под телевизор для ресивера, ТВ приставки, Wi-Fi роутера, медиаплеера",
    category: "appliances",
    categoryName: "Полки, кронштейны и ТВ аксессуары",
    subCategory: "tv-shelves",
    brand: "ElectroSat",
    model: "Glass-Shelf-Black-5mm",
    price: 3658,
    oldPrice: 5200,
    badge: "Хит Ozon",
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
      "https://ir.ozone.ru/s3/multimedia-1-l/7378357197.jpg"
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
  },
  {
    id: "bracket-arm-42",
    sku: "BRACKET-ARM-42",
    name: "Настенный наклонно-поворотный кронштейн для телевизора 14–43″ (боковое крепление)",
    category: "appliances",
    categoryName: "Полки, кронштейны и ТВ аксессуары",
    subCategory: "tv-brackets",
    brand: "ElectroSat",
    model: "Arm-14-43-VESA200",
    price: 3850,
    oldPrice: 5500,
    badge: "Поворотный",
    badgeType: "hit",
    inStock: true,
    stockCount: 16,
    rating: 5.0,
    reviewCount: 34,
    requiresInstallation: true,
    installationPrice: 3500,
    images: [
      "images/products/bracket-swivel.svg"
    ],
    shortSpecs: "Диагональ 14–43″ • Поворот ±90°, наклон ±15° • VESA 75x75, 100x100, 200x200 • До 25 кг • Полный крепеж",
    description: "Универсальный наклонно-поворотный кронштейн с поворотной «рукой» для телевизоров и мониторов 14–43″. Обеспечивает легкий поворот влево/вправо до 90 градусов и регулировку угла наклона. Изготовлен из прочной холоднокатаной стали 1.5 мм.",
    fullSpecs: {
      "Диагональ экрана": "14″ – 43″ (35–109 см)",
      "Стандарты VESA": "75x75, 100x100, 200x100, 200x200 мм",
      "Максимальная нагрузка": "25 кг",
      "Угол поворота": "До ±90° (в обе стороны)",
      "Угол наклона": "±15°",
      "Расстояние от стены": "55 – 380 мм",
      "Комплект": "Кронштейн в сборе, дюбели, анкеры, набор болтов для ТВ M4/M6/M8, инструкция"
    },
    warranty: "36 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман») • Установка мастером в день заказа",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "bracket-tilt-65",
    sku: "BRACKET-TILT-65",
    name: "Наклонный усиленный кронштейн-рейка для телевизоров 32–70″ (нагрузка до 45 кг)",
    category: "appliances",
    categoryName: "Полки, кронштейны и ТВ аксессуары",
    subCategory: "tv-brackets",
    brand: "ElectroSat",
    model: "Tilt-Heavy-32-70",
    price: 4950,
    oldPrice: 6800,
    badge: "Для больших ТВ",
    badgeType: "hit",
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 29,
    requiresInstallation: true,
    installationPrice: 3500,
    images: [
      "images/products/bracket-tilt.svg"
    ],
    shortSpecs: "Для телевизоров 32–70″ • Наклон -15° • VESA до 400x400 • До 45 кг • Встроенный уровень • Надежный замок",
    description: "Усиленный настенный кронштейн для надежной фиксации телевизоров средних и больших диагоналей (32–70 дюймов). Оснащен механизмом плавного наклона и встроенным жидкостным уровнем для идеально ровного монтажа.",
    fullSpecs: {
      "Диагональ экрана": "32″ – 70″ (81–178 см)",
      "Стандарты VESA": "100x100, 200x200, 300x300, 400x200, 400x400 мм",
      "Максимальная нагрузка": "45 кг",
      "Угол наклона": "0° / -15°",
      "Расстояние от стены": "25 мм (ультратонкий профиль)",
      "Особенности": "Встроенный уровень, фиксаторы защиты от падения"
    },
    warranty: "36 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев • Монтаж под ключ",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "tv-stand-legs",
    sku: "TV-STAND-LEGS-UNI",
    name: "Универсальные настольные ножки / подставка для любых телевизоров 32–65″",
    category: "appliances",
    categoryName: "Полки, кронштейны и ТВ аксессуары",
    subCategory: "tv-shelves",
    brand: "ElectroSat",
    model: "TableStand-32-65",
    price: 3950,
    oldPrice: 5800,
    badge: "Подставка",
    badgeType: "sale",
    inStock: true,
    stockCount: 10,
    rating: 5.0,
    reviewCount: 22,
    requiresInstallation: false,
    installationPrice: 1500,
    images: [
      "images/products/tv-stand-legs.svg"
    ],
    shortSpecs: "Универсальные ножки для ТВ 32–65″ • Замена потерянных ножек • Регулировка по высоте • До 40 кг",
    description: "Универсальная настольная подставка (ножки) для установки телевизора на тумбу или стол. Идеальная замена сломанным или утерянным оригинальным ножкам. Крепится к стандартным отверстиям VESA на задней панели телевизора.",
    fullSpecs: {
      "Совместимые диагонали": "32″ – 65″",
      "Совместимость VESA": "от 100x100 до 800x400 мм",
      "Максимальная нагрузка": "40 кг",
      "Регулировка высоты": "3 уровня высоты",
      "Материал": "Сталь с полимерным покрытием, прорезиненные антискользящие накладки"
    },
    warranty: "12 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "power-adapter-12v",
    sku: "ADAPTER-12V-2A",
    name: "Блок питания 12V 2A (5.5x2.5мм) для ресиверов Отау ТВ, Телекарта, роутеров и ТВ приставок",
    category: "appliances",
    categoryName: "Полки, кронштейны и ТВ аксессуары",
    subCategory: "accessories",
    brand: "ElectroSat",
    model: "Power-12V-2A-EU",
    price: 2200,
    oldPrice: 3100,
    badge: "Блок питания",
    badgeType: "hit",
    inStock: true,
    stockCount: 25,
    rating: 4.9,
    reviewCount: 57,
    requiresInstallation: false,
    installationPrice: 500,
    images: [
      "images/products/power-adapter.svg"
    ],
    shortSpecs: "12V 2A (24W) • Штекер 5.5x2.5 / 5.5x2.1 мм • Защита от КЗ и перегрузок • Длина провода 1м • Евровилка",
    description: "Качественный импульсный блок питания 12V 2000mA со стандартным штекером 5.5х2.5 мм (совместим с 5.5х2.1 мм). Предназначен для спутниковых и эфирных ресиверов Отау ТВ, Телекарта, цифровых приставок, Wi-Fi роутеров, камер видеонаблюдения и светодиодных лент.",
    fullSpecs: {
      "Входное напряжение": "100–240V AC, 50/60Hz",
      "Выходное напряжение": "12V DC, сила тока 2A (24W)",
      "Размер штекера": "5.5 мм (внешний) / 2.5 мм (внутренний)",
      "Полярность": "Плюс в центре, минус снаружи",
      "Защиты": "Защита от короткого замыкания (SCP), перегрузки по току (OCP) и перенапряжения (OVP)",
      "Совместимость": "Ресиверы Отау ТВ, Телекарта EVO, приставки DVB-T2, Wi-Fi роутеры TP-Link/D-Link/Keenetic, видеокамеры CCTV"
    },
    warranty: "12 месяцев гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },

  // ==========================================
  // 3. СПУТНИКОВОЕ ОБОРУДОВАНИЕ (ТЕЛЕКАРТА И ОТАУ ТВ)
  // ==========================================
  {
    id: "sat-telekarta-65k",
    sku: "SAT-TK-65K",
    name: "Комплект спутникового оборудования Телекарта HD (230+ каналов)",
    category: "satellite",
    categoryName: "Спутниковое ТВ: Телекарта (65 000 ₸)",
    subCategory: "satellite-telekarta",
    brand: "Телекарта",
    model: "EVO HD Full Kit 230+",
    price: 65000,
    oldPrice: 78000,
    badge: "Хит 65 000 ₸",
    badgeType: "hit",
    inStock: true,
    stockCount: 15,
    rating: 5.0,
    reviewCount: 48,
    requiresInstallation: true,
    installationPrice: 7000,
    images: [
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=80",
      "https://ir.ozone.ru/s3/multimedia-1-5/12321993605.jpg"
    ],
    shortSpecs: "Спутниковая антенна 0.6–0.9м • Ресивер Телекарта HD • Пульт ДУ • Кабель • Карта доступа • 230+ каналов",
    description: "Полный оригинальный комплект спутникового телевидения Телекарта HD для дома, дачи и квартиры в Сатпаеве и Жезказгане. Включает спутниковую антенну, фирменный HD-ресивер, пульт управления, карту доступа и кабель. Более 230 популярных каналов: кино, спорт, детские, познавательные и музыкальные передачи в превосходном цифровом качестве.",
    fullSpecs: {
      "Комплектация": "Спутниковая тарелка, кронштейн, конвертер круговой/линейный, HD-приемник Телекарта EVO, пульт, HDMI кабель, карта доступа",
      "Количество каналов": "230+ каналов цифрового и Full HD качества",
      "Формат вещания": "DVB-S2 / MPEG-4 / Full HD 1080p",
      "Зона покрытия": "Сатпаев, Жезказган и вся Карагандинская / Улытауская область",
      "Установка": "Профессиональный монтаж и юстировка мастером"
    },
    warranty: "12 месяцев официальной гарантии",
    deliveryInfo: "В наличии в г. Сатпаев (ТД «Арман») • Выезд мастера в день заказа",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  },
  {
    id: "sat-otau-tv-kit",
    sku: "SAT-OTAU-HD",
    name: "Комплект спутникового оборудования Отау ТВ (Otau TV HD)",
    category: "satellite",
    categoryName: "Спутниковое ТВ: Отау ТВ (Otau TV)",
    subCategory: "satellite-otau",
    brand: "Отау ТВ",
    model: "Otau TV DVB-S2 Full HD",
    price: 55000,
    oldPrice: 65000,
    badge: "Отау ТВ",
    badgeType: "hit",
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 39,
    requiresInstallation: true,
    installationPrice: 7000,
    images: [
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
      "https://ir.ozone.ru/s3/multimedia-1-9/11950394445.jpg"
    ],
    shortSpecs: "Спутниковая антенна Отау ТВ • Цифровой приемник DVB-S2 • Все казахстанские каналы • Без абонентской платы",
    description: "Оригинальный комплект национального спутникового телевидения Otau TV (Отау ТВ). Трансляция всех казахстанских республиканских и региональных телеканалов в цифровом и HD качестве без обязательной абонентской платы. Идеальный прием в любой точке Сатпаева и области.",
    fullSpecs: {
      "Комплектация": "Спутниковая антенна Отау ТВ, конвертер, спутниковый тюнер DVB-S2, пульт ДУ, кабель, блок питания",
      "Каналы": "Все национальные и цифровые каналы Казахстана (Qazaqstan, Khabar, 24KZ, Balapan, Седьмой канал, КТК, НТК и др.)",
      "Абонентская плата": "Базовый пакет каналов — бесплатно навсегда",
      "Качество изображения": "Full HD 1080p, чистый цифровой звук"
    },
    warranty: "12 месяцев официальной гарантии",
    deliveryInfo: "В наличии в магазине ElectroSat (ТД «Арман»)",
    marketplaceLinks: {
      ozon: "https://ozon.kz/seller/ip-mihaylenko/",
      wildberries: "https://www.wildberries.ru/seller/250158087"
    }
  }
];

// Категории для фильтров и каталога магазина
const CATEGORIES_DATA = [
  {
    id: "all",
    name: "Все товары Ozon и комплекты",
    icon: "layers",
    count: PRODUCTS_DATA.length
  },
  {
    id: "remotes",
    name: "Пульты для телевизоров (Ozon)",
    icon: "tv",
    count: PRODUCTS_DATA.filter(p => p.category === "remotes" && p.subCategory !== "satellite-remotes" && p.subCategory !== "otau-remotes").length
  },
  {
    id: "appliances",
    name: "Полки, кронштейны, подставки, БП",
    icon: "layers",
    count: PRODUCTS_DATA.filter(p => p.category === "appliances").length
  },
  {
    id: "satellite-telekarta",
    name: "Телекарта: пульт и комплект 65 000 ₸",
    icon: "radio",
    count: PRODUCTS_DATA.filter(p => p.subCategory === "satellite-telekarta" || p.id === "ozon-1829366751").length
  },
  {
    id: "satellite-otau",
    name: "Отау ТВ: пульт и комплект",
    icon: "tv",
    count: PRODUCTS_DATA.filter(p => p.subCategory === "satellite-otau" || p.id === "ozon-4880651840").length
  }
];

// Экспорт для использования в модулях или глобально
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.CATEGORIES_DATA = CATEGORIES_DATA;
}
