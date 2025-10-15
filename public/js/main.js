/**
 * BookHaven 主入口文件
 */

import { Cart, CartUI } from './cart.js';
import { booksData } from './data.js';
import { smoothScroll, handleScrollAnimation } from './utils.js';

// 全局實例
let cart;
let cartUI;

/**
 * 初始化應用
 */
function init() {
    // 初始化購物車
    cart = new Cart();
    cartUI = new CartUI(cart);
    cartUI.update();

    // 渲染書籍列表
    renderBooks();

    // 初始化 UI 功能
    smoothScroll();
    initScrollAnimation();
    initSearch();
}

/**
 * 渲染書籍列表
 */
function renderBooks(filteredData = null) {
    const bookGrid = document.getElementById('bookGrid');
    
    if (!bookGrid) return;

    // 獲取模板（第一個 book-card）
    const template = bookGrid.querySelector('.book-card');
    
    if (!template) {
        console.error('找不到書籍卡片模板');
        return;
    }
    // 使用篩選後的數據或所有數據
    const dataToRender = filteredData || booksData;
    // 清空容器但保留模板
    bookGrid.innerHTML = '';
    // 如果沒有結果，顯示提示
    if (dataToRender.length === 0) {
        bookGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">📚</div>
                <h3>沒有找到符合條件的書籍</h3>
                <p>請嘗試調整篩選條件</p>
            </div>
        `;
        return;
    }

    // 為每本書生成卡片
    dataToRender.forEach((book, index) => {
        // 克隆模板
        const card = template.cloneNode(true);
        
        // 更新卡片屬性
        card.setAttribute('data-book-id', book.id);
        card.style.animationDelay = `${index * 0.1}s`;
        
        // 更新圖片
        const img = card.querySelector('.book-cover img');
        img.src = book.image_url;
        img.alt = book.short_title;
        
        // 更新書籍編號
        const badge = card.querySelector('.book-badge');
        badge.textContent = `#${String(book.id).padStart(3, '0')}`;
        
        // 更新 NEW 標籤顯示
        const newBadge = card.querySelector('.new-badge');
        if (index < 3) {
            newBadge.style.display = 'block';
        } else {
            newBadge.style.display = 'none';
        }
        
        // 更新書籍標題
        const title = card.querySelector('.book-title');
        title.textContent = book.short_title;
        
        // 更新作者
        const author = card.querySelector('.book-author');
        author.textContent = book.authors;
        
        // 更新出版社
        const publisher = card.querySelector('.book-meta span[title="出版社"]');
        const publisherText = publisher.childNodes[publisher.childNodes.length - 1];
        publisherText.textContent = book.publisher_name;
        
        // 更新庫存
        const stock = card.querySelector('.book-meta span[title="庫存"]');
        const stockText = stock.childNodes[stock.childNodes.length - 1];
        stockText.textContent = `庫存: ${book.stock_qty}`;
        
        // 更新價格
        const priceContainer = card.querySelector('.book-price');
        const originalPrice = priceContainer.querySelector('.original-price');
        const currentPrice = priceContainer.querySelector('.current-price');
        const discountBadge = priceContainer.querySelector('.discount-badge');
        
        // 計算折扣
        const discountPercent = book.original_price 
            ? Math.round((1 - book.price / book.original_price) * 100)
            : 0;
        
        // 更新原價
        if (book.original_price) {
            originalPrice.textContent = `$${book.original_price.toFixed(2)}`;
            originalPrice.style.display = 'inline';
        } else {
            originalPrice.style.display = 'none';
        }
        
        // 更新現價
        currentPrice.textContent = `$${book.price.toFixed(2)}`;
        
        // 更新折扣標籤
        if (discountPercent > 0) {
            discountBadge.textContent = `-${discountPercent}%`;
            discountBadge.style.display = 'inline-block';
        } else {
            discountBadge.style.display = 'none';
        }
        
        // 更新按鈕
        const button = card.querySelector('.buy-button');
        button.setAttribute('data-book-id', book.id);
        
        // 加入到容器
        bookGrid.appendChild(card);
    });

    // 綁定加入購物車按鈕
    bindAddToCartButtons();
}

/**
 * 綁定加入購物車按鈕事件
 */
function bindAddToCartButtons() {
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const bookId = parseInt(button.dataset.bookId);
            const book = booksData.find(b => b.id === bookId);
            
            if (!book) return;

            const result = cart.addItem(book);
            cartUI.update();
            
            const message = result === 'added' 
                ? `《${book.short_title}》已加入購物車` 
                : `《${book.short_title}》數量已更新`;
            
            cartUI.showNotification(message);
            
            // 自動打開購物車
            if (!document.getElementById('cartSidebar').classList.contains('active')) {
                setTimeout(() => cartUI.open(), 300);
            }
        });
    });
}

/**
 * 初始化滾動動畫
 */
function initScrollAnimation() {
    // 初始檢查
    handleScrollAnimation();
    
    // 監聽滾動事件
    window.addEventListener('scroll', handleScrollAnimation);
    
    // 使用 Intersection Observer 優化性能
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 初始化搜尋功能
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const searchResults = document.getElementById('searchResults');
    const bookGrid = document.getElementById('bookGrid');
    
    if (!searchInput) return;

    // 搜尋輸入事件
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        // 顯示/隱藏清除按鈕
        if (query) {
            clearSearchBtn.style.display = 'flex';
        } else {
            clearSearchBtn.style.display = 'none';
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }
        
        // 執行搜尋
        performSearch(query);
    });

    // 清除搜尋
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        searchInput.focus();
        renderBooks();
    });

    // 點擊外部關閉搜尋結果
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
}

/**
 * 執行搜尋
 */
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    // 搜尋書籍
    const results = booksData.filter(book => {
        return book.short_title.toLowerCase().includes(query) ||
               book.authors.toLowerCase().includes(query) ||
               book.publisher_name.toLowerCase().includes(query);
    });

    // 顯示搜尋結果
    if (results.length > 0) {
        searchResults.innerHTML = results.map(book => `
            <div class="search-result-item" onclick="window.location.href = 'book-detail.html?id=${book.id}';">
                <div class="search-result-image">
                    <img src="${book.image_url}" alt="${book.short_title}" onerror="this.src='images/placeholder-book.png'">
                </div>
                <div class="search-result-info">
                    <div class="search-result-title">${highlightText(book.short_title, query)}</div>
                    <div class="search-result-meta">${highlightText(book.authors, query)} · ${highlightText(book.publisher_name, query)}</div>
                </div>
                <div class="search-result-price">$${book.price.toFixed(2)}</div>
            </div>
        `).join('');
        searchResults.classList.add('active');
    } else {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <div class="search-no-results-icon">🔍</div>
                <p>找不到符合「${query}」的書籍</p>
            </div>
        `;
        searchResults.classList.add('active');
    }
    renderBooks(results);
}

/**
 * 高亮搜尋關鍵字
 */
function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: #fef08a; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

/**
 * 頁面載入完成後初始化
 */
document.addEventListener('DOMContentLoaded', init);

// 導出給其他模塊使用
export { cart, cartUI };