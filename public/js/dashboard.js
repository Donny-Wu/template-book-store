/**
 * BookHaven Dashboard
 */

import { booksData } from './data.js';

/**
 * 初始化
 */
function init() {
    // 渲染書籍列表
    renderDashboardBooks();
    
    // 初始化搜尋
    initDashboardSearch();
    
    // 初始化用戶選單
    initUserMenu();
    
    // 更新統計數據
    updateStats();
    
    // 頁面載入動畫
    initPageAnimation();
}

/**
 * 渲染書籍列表
 */
function renderDashboardBooks() {
    const productsGrid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const bookCount = document.getElementById('bookCount');
    
    if (!productsGrid) return;
    
    if (booksData.length === 0) {
        productsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        bookCount.textContent = '0';
        return;
    }
    
    productsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    bookCount.textContent = booksData.length;
    
    productsGrid.innerHTML = booksData.map((book, index) => {
        return `
            <div class="product-card" data-title="${book.short_title.toLowerCase()}">
                <div class="product-image">
                    ${book.image_url ? `
                        <img src="${book.image_url}" 
                             alt="${book.short_title}" 
                             loading="lazy"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="product-image-placeholder" style="display: none;">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            <span>無圖片</span>
                        </div>
                    ` : `
                        <div class="product-image-placeholder">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            <span>無圖片</span>
                        </div>
                    `}
                    <div class="product-overlay">#${String(book.id).padStart(3, '0')}</div>
                </div>

                <div class="product-info">
                    <h3 class="product-title">${book.short_title}</h3>
                    <div class="product-price">$${book.price.toFixed(2)}</div>

                    <div class="product-meta">
                        <span>庫存: ${book.stock_qty}</span>
                        <span>${book.publisher_name}</span>
                    </div>

                    <div class="product-actions">
                        <a href="book-detail.html?id=${book.id}" class="action-btn action-view">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            查看
                        </a>

                        <button class="action-btn action-edit" onclick="editBook(${book.id})">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            編輯
                        </button>

                        <button class="action-btn action-delete" onclick="deleteBook(${book.id})">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            刪除
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * 初始化搜尋功能
 */
function initDashboardSearch() {
    const searchInput = document.getElementById('dashboardSearchInput');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const title = card.getAttribute('data-title');
            if (title.includes(searchTerm)) {
                card.style.display = '';
                card.style.animation = 'fadeInUp 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });

        // 顯示搜尋結果數量
        const visibleCards = Array.from(productCards).filter(card => card.style.display !== 'none').length;
        console.log(`找到 ${visibleCards} 本書籍`);
    });
}

/**
 * 視圖模式切換
 */
window.setViewMode = function(mode) {
    const grid = document.getElementById('productsGrid');
    const viewBtns = document.querySelectorAll('.view-btn');

    viewBtns.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');

    if (mode === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
};

/**
 * 編輯書籍
 */
window.editBook = function(bookId) {
    alert(`編輯書籍 ID: ${bookId}`);
    // 這裡可以跳轉到編輯頁面或打開編輯對話框
};

/**
 * 刪除書籍
 */
window.deleteBook = function(bookId) {
    if (confirm('確定要刪除這本書嗎？此操作無法復原。')) {
        const card = event.target.closest('.product-card');
        
        // 動畫效果
        card.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        setTimeout(() => {
            card.remove();
            
            // 更新書籍數量
            const remainingCards = document.querySelectorAll('.product-card').length;
            const bookCount = document.getElementById('bookCount');
            if (bookCount) {
                bookCount.textContent = remainingCards;
            }
            
            // 如果沒有書籍了，顯示空狀態
            if (remainingCards === 0) {
                const productsGrid = document.getElementById('productsGrid');
                const emptyState = document.getElementById('emptyState');
                productsGrid.style.display = 'none';
                emptyState.style.display = 'block';
            }
            
            alert('書籍刪除成功！');
        }, 300);
    }
};

/**
 * 初始化用戶選單
 */
function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const userMenu = document.querySelector('.user-menu');
    
    if (!userMenuBtn || !userDropdown) return;
    
    userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('active');
        userDropdown.classList.toggle('active');
    });
    
    // 點擊外部關閉
    document.addEventListener('click', () => {
        userMenu.classList.remove('active');
        userDropdown.classList.remove('active');
    });
}

/**
 * 更新統計數據
 */
function updateStats() {
    const totalBooks = document.getElementById('totalBooks');
    if (totalBooks) {
        totalBooks.textContent = booksData.length;
    }
}

/**
 * 頁面載入動畫
 */
function initPageAnimation() {
    const cards = document.querySelectorAll('.product-card, .stat-card, .action-btn');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

/**
 * 頁面載入完成後初始化
 */
document.addEventListener('DOMContentLoaded', init);

// 導出給其他模塊使用
export { renderDashboardBooks };