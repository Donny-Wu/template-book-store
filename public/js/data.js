/**
 * 書籍數據
 */
export const booksData = [
    {
        id: 1,
        short_title: "深度學習入門",
        authors: "安德魯·特拉斯克",
        publisher_name: "歐萊禮出版社",
        stock_qty: 15,
        price: 580,
        original_price: 680,
        image_url: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],        // 科學 > 物理學
        primary_category: 7,       // 主要分類：物理學
        language: "zh-TW",         // 繁體中文
        format: "physical"         // 紙本書
    },
    {
        id: 2,
        short_title: "JavaScript 權威指南",
        authors: "大衛·弗拉納根",
        publisher_name: "碁峰資訊",
        stock_qty: 23,
        price: 720,
        original_price: 850,
        image_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],        // 科學 > 物理學（程式設計相關）
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 3,
        short_title: "Python 程式設計",
        authors: "張啟明",
        publisher_name: "旗標出版社",
        stock_qty: 18,
        price: 490,
        original_price: null,
        image_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "ebook"            // 電子書
    },
    {
        id: 4,
        short_title: "設計模式之美",
        authors: "王爭",
        publisher_name: "博碩文化",
        stock_qty: 12,
        price: 650,
        original_price: 780,
        image_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-CN",         // 簡體中文
        format: "physical"
    },
    {
        id: 5,
        short_title: "演算法圖解",
        authors: "艾狄崔亞·巴哈加瓦",
        publisher_name: "碁峰資訊",
        stock_qty: 20,
        price: 480,
        original_price: 580,
        image_url: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 6,
        short_title: "網頁設計職人必修",
        authors: "陳惠貞",
        publisher_name: "旗標出版社",
        stock_qty: 16,
        price: 520,
        original_price: null,
        image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [12, 13],      // 藝術 > 繪畫（網頁設計）
        primary_category: 13,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 7,
        short_title: "資料科學的良器",
        authors: "Wes McKinney",
        publisher_name: "歐萊禮出版社",
        stock_qty: 14,
        price: 680,
        original_price: 800,
        image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 8,
        short_title: "Clean Code 代碼整潔之道",
        authors: "羅伯特·馬丁",
        publisher_name: "博碩文化",
        stock_qty: 25,
        price: 590,
        original_price: 720,
        image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "en",            // 英文
        format: "ebook"
    },
    {
        id: 9,
        short_title: "人工智慧應用實戰",
        authors: "李宏毅",
        publisher_name: "碁峰資訊",
        stock_qty: 19,
        price: 750,
        original_price: 880,
        image_url: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 10,
        short_title: "React 開發實戰",
        authors: "陳彥澄",
        publisher_name: "旗標出版社",
        stock_qty: 22,
        price: 620,
        original_price: null,
        image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 11,
        short_title: "Vue.js 實戰開發",
        authors: "尤雨溪",
        publisher_name: "碁峰資訊",
        stock_qty: 17,
        price: 560,
        original_price: 680,
        image_url: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "ebook"
    },
    {
        id: 12,
        short_title: "Docker 容器化部署",
        authors: "林信良",
        publisher_name: "旗標出版社",
        stock_qty: 13,
        price: 640,
        original_price: 750,
        image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 13,
        short_title: "MySQL 資料庫設計",
        authors: "洪志宏",
        publisher_name: "博碩文化",
        stock_qty: 21,
        price: 520,
        original_price: null,
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    },
    {
        id: 14,
        short_title: "Git 版本控制實務",
        authors: "高見龍",
        publisher_name: "碁峰資訊",
        stock_qty: 19,
        price: 450,
        original_price: 550,
        image_url: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "audiobook"        // 有聲書
    },
    {
        id: 15,
        short_title: "Linux 系統管理",
        authors: "鳥哥",
        publisher_name: "旗標出版社",
        stock_qty: 16,
        price: 780,
        original_price: 920,
        image_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=600&fit=crop",
        // 🔥 新增：分類資訊
        categories: [6, 7],
        primary_category: 7,
        language: "zh-TW",
        format: "physical"
    }
];

/**
 * 根據 ID 獲取書籍
 */
export function getBookById(id) {
    return booksData.find(book => book.id === id);
}

/**
 * 獲取所有書籍
 */
export function getAllBooks() {
    return booksData;
}

/**
 * 根據價格範圍過濾書籍
 */
export function filterBooksByPrice(minPrice, maxPrice) {
    return booksData.filter(book => 
        book.price >= minPrice && book.price <= maxPrice
    );
}

/**
 * 搜尋書籍（標題或作者）
 */
export function searchBooks(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return booksData.filter(book => 
        book.short_title.toLowerCase().includes(lowerKeyword) ||
        book.authors.toLowerCase().includes(lowerKeyword)
    );
}

/**
 * 按價格排序
 */
export function sortBooksByPrice(ascending = true) {
    return [...booksData].sort((a, b) => 
        ascending ? a.price - b.price : b.price - a.price
    );
}
/**
 * 🔥 新增：根據分類過濾書籍
 * @param {number} categoryId - 分類 ID
 * @returns {Array} 符合該分類的書籍陣列
 */
export function filterBooksByCategory(categoryId) {
    return booksData.filter(book => 
        book.categories && book.categories.includes(categoryId)
    );
}

/**
 * 🔥 新增：根據語系過濾書籍
 * @param {string} language - 語系代碼 (zh-TW, zh-CN, en, ja)
 * @returns {Array} 符合該語系的書籍陣列
 */
export function filterBooksByLanguage(language) {
    return booksData.filter(book => book.language === language);
}

/**
 * 🔥 新增：根據出版形式過濾書籍
 * @param {string} format - 出版形式 (physical, ebook, audiobook)
 * @returns {Array} 符合該形式的書籍陣列
 */
export function filterBooksByFormat(format) {
    return booksData.filter(book => book.format === format);
}
