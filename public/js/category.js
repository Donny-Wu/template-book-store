/**
 * 書籍分類功能 JavaScript
 * 檔案名稱: js/categories.js
 * 
 * 功能：
 * 1. 渲染書籍卡片的分類標籤（使用 template）
 * 2. 分類篩選功能
 * 3. 更新分類數量
 */

// ==================== 分類資料結構 ====================
// 對應資料庫 book_categories 表
const CATEGORIES = {
    1: { id: 1, name: '文學', parentId: null, level: 0, emoji: '📚' },
    2: { id: 2, name: '小說', parentId: 1, level: 1, emoji: '📖' },
    3: { id: 3, name: '詩歌', parentId: 1, level: 1, emoji: '✍️' },
    4: { id: 4, name: '科幻小說', parentId: 2, level: 2, emoji: '🚀' },
    5: { id: 5, name: '推理小說', parentId: 2, level: 2, emoji: '🔍' },
    6: { id: 6, name: '科學', parentId: null, level: 0, emoji: '🔬' },
    7: { id: 7, name: '物理學', parentId: 6, level: 1, emoji: '⚛️' },
    8: { id: 8, name: '化學', parentId: 6, level: 1, emoji: '🧪' },
    9: { id: 9, name: '商業', parentId: null, level: 0, emoji: '💼' },
    10: { id: 10, name: '管理', parentId: 9, level: 1, emoji: '📊' },
    11: { id: 11, name: '行銷', parentId: 9, level: 1, emoji: '📈' },
    12: { id: 12, name: '藝術', parentId: null, level: 0, emoji: '🎨' },
    13: { id: 13, name: '繪畫', parentId: 12, level: 1, emoji: '🖼️' },
    14: { id: 14, name: '音樂', parentId: 12, level: 1, emoji: '🎵' }
};

// ==================== 核心功能函數 ====================

/**
 * 獲取某分類的所有子分類 ID（包含自己）
 * @param {number|string} categoryId - 分類 ID
 * @returns {number[]} 包含該分類及所有子分類的 ID 陣列
 */
function getCategoryWithChildren(categoryId) {
    const result = [parseInt(categoryId)];
    
    Object.values(CATEGORIES).forEach(category => {
        if (category.parentId === parseInt(categoryId)) {
            result.push(...getCategoryWithChildren(category.id));
        }
    });
    
    return result;
}

/**
 * 為書籍卡片渲染分類標籤（使用 template）
 * @param {HTMLElement} bookCard - 書籍卡片元素
 */
function renderCategoryTags(bookCard) {
    const categoriesContainer = bookCard.querySelector('.book-categories');
    const template = categoriesContainer?.querySelector('.category-tag-template');
    
    if (!categoriesContainer || !template) {
        console.warn('找不到分類容器或 template', bookCard);
        return;
    }

    const categoriesData = bookCard.dataset.categories;
    const primaryCategoryId = bookCard.dataset.primaryCategory;
    
    if (!categoriesData) {
        console.warn('書籍卡片缺少 data-categories 屬性', bookCard);
        return;
    }

    const categoryIds = categoriesData.split(',').map(id => parseInt(id.trim()));

    // 清空現有標籤（保留 template）
    const existingTags = categoriesContainer.querySelectorAll('.category-tag');
    existingTags.forEach(tag => tag.remove());

    // 使用 template 創建標籤
    categoryIds.forEach((categoryId, index) => {
        const category = CATEGORIES[categoryId];
        
        if (!category) {
            console.warn(`找不到分類 ID: ${categoryId}`);
            return;
        }

        // 複製 template 內容
        const tagClone = template.content.cloneNode(true);
        const tag = tagClone.querySelector('.category-tag');
        
        // 設置 data 屬性
        tag.dataset.categoryId = categoryId;
        
        // 設置樣式類別
        if (categoryId === parseInt(primaryCategoryId)) {
            tag.classList.add('category-tag-primary');
        } else if (index > 0) {
            tag.classList.add('category-tag-secondary');
        }

        // 更新文字內容
        const nameSpan = tag.querySelector('.category-name');
        nameSpan.textContent = `${category.emoji} ${category.name}`;

        // 如果不是第一個標籤，移除圖標
        if (index > 0) {
            const icon = tag.querySelector('.icon');
            if (icon) icon.remove();
        }

        // 點擊標籤時觸發篩選
        tag.addEventListener('click', function(e) {
            e.stopPropagation();
            const categorySelect = document.getElementById('categorySelect');
            if (categorySelect) {
                categorySelect.value = categoryId;
                filterBooksByCategory(categoryId);
            }
        });

        categoriesContainer.appendChild(tagClone);
    });
}

/**
 * 初始化所有書籍卡片的分類標籤
 */
function initAllBookCategoryTags() {
    const bookCards = document.querySelectorAll('.book-card');
    console.log(`找到 ${bookCards.length} 張書籍卡片`);
    
    bookCards.forEach(card => {
        renderCategoryTags(card);
    });
}

/**
 * 根據分類篩選書籍（只更新顯示/隱藏）
 * @param {string} categoryId - 選中的分類 ID，'all' 表示顯示全部
 */
function filterBooksByCategory(categoryId) {
    const bookCards = document.querySelectorAll('.book-card');
    
    if (categoryId === 'all') {
        // 顯示所有書籍
        bookCards.forEach(card => {
            card.style.display = '';
        });
        updateVisibleBookCount();
        return;
    }

    // 獲取選中分類及其所有子分類
    const targetCategories = getCategoryWithChildren(categoryId);

    bookCards.forEach(card => {
        const bookCategories = card.dataset.categories;
        
        if (!bookCategories) {
            card.style.display = 'none';
            return;
        }

        // 檢查書籍是否屬於目標分類
        const cardCategoryIds = bookCategories.split(',').map(id => parseInt(id.trim()));
        const hasMatchingCategory = cardCategoryIds.some(id => targetCategories.includes(id));

        card.style.display = hasMatchingCategory ? '' : 'none';
    });

    updateVisibleBookCount();
}

/**
 * 初始化分類篩選器事件
 */
function initCategoryFilter() {
    const categorySelect = document.getElementById('categorySelect');
    
    if (!categorySelect) {
        console.warn('找不到分類篩選器');
        return;
    }

    categorySelect.addEventListener('change', function(e) {
        const selectedCategory = e.target.value;
        console.log('選擇分類:', selectedCategory);
        filterBooksByCategory(selectedCategory);
    });
}

/**
 * 更新篩選器中的書籍數量（只更新文字內容）
 */
function updateCategoryCount() {
    const categorySelect = document.getElementById('categorySelect');
    if (!categorySelect) return;

    const options = categorySelect.querySelectorAll('option');
    
    options.forEach(option => {
        const categoryId = option.value;
        const countSpan = option.querySelector('.count');
        
        if (!countSpan) return;

        if (categoryId === 'all') {
            const totalBooks = document.querySelectorAll('.book-card').length;
            countSpan.textContent = totalBooks;
            return;
        }

        // 計算屬於此分類的書籍數量
        const targetCategories = getCategoryWithChildren(categoryId);
        const bookCards = document.querySelectorAll('.book-card');
        
        let count = 0;
        bookCards.forEach(card => {
            const bookCategories = card.dataset.categories;
            if (bookCategories) {
                const cardCategoryIds = bookCategories.split(',').map(id => parseInt(id.trim()));
                if (cardCategoryIds.some(id => targetCategories.includes(id))) {
                    count++;
                }
            }
        });

        countSpan.textContent = count;
    });

    console.log('分類數量已更新');
}

/**
 * 更新可見書籍數量（用於分頁資訊顯示）
 */
function updateVisibleBookCount() {
    const totalItems = document.getElementById('totalItems');
    if (totalItems) {
        const visibleBooks = document.querySelectorAll('.book-card:not([style*="display: none"])').length;
        totalItems.textContent = visibleBooks;
    }
}

// ==================== 初始化 ====================

/**
 * 頁面載入完成後初始化分類功能
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 初始化分類功能 ===');
    
    // 1. 渲染所有書籍的分類標籤
    initAllBookCategoryTags();
    
    // 2. 初始化分類篩選器
    initCategoryFilter();
    
    // 3. 更新分類數量
    updateCategoryCount();
    
    console.log('分類功能初始化完成');
});

// ==================== 匯出供其他模組使用（可選） ====================

// 如果使用模組化開發，可以匯出這些函數
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CATEGORIES,
        renderCategoryTags,
        filterBooksByCategory,
        updateCategoryCount,
        getCategoryWithChildren
    };
}