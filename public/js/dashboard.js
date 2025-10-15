/**
 * BookHaven Dashboard
 */

import { booksData } from './data.js';

// 分頁相關變數
let currentPage = 1;
let itemsPerPage = 12;  // 每頁顯示12本書
let totalPages = 1;
let currentFilteredBooks = [];

/**
 * 初始化
 */
function init() {
    // 初始化當前篩選書籍列表
    currentFilteredBooks = [...booksData];
    
    // 渲染書籍列表
    renderDashboardBooks();
    
    // 初始化搜尋
    initDashboardSearch();
    
    // 初始化用戶選單
    initUserMenu();
    
    // 初始化分頁
    initPagination();
    
    // 更新統計數據
    updateStats();
    
    // 頁面載入動畫
    setTimeout(() => initPageAnimation(), 100);
}

/**
 * 渲染書籍列表（使用模板）
 */
function renderDashboardBooks(filteredData = null) {
    const productsGrid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const bookCount = document.getElementById('bookCount');
    const template = document.getElementById('bookCardTemplate');
    
    if (!productsGrid || !template) {
        console.error('找不到書籍網格或模板元素');
        return;
    }
    
    // 使用篩選後的數據或所有數據
    const dataToRender = filteredData !== null ? filteredData : booksData;
    
    // 更新當前篩選書籍列表
    currentFilteredBooks = dataToRender;
    
    // 計算總頁數
    totalPages = Math.ceil(dataToRender.length / itemsPerPage);
    
    // 確保當前頁碼在有效範圍內
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }
    
    // 計算當前頁的資料範圍
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataToRender.length);
    const currentPageData = dataToRender.slice(startIndex, endIndex);
    
    console.log(`渲染書籍: 總共 ${dataToRender.length} 本，當前頁 ${currentPage}，顯示 ${startIndex + 1}-${endIndex}`);
    
    // 更新書籍數量
    if (bookCount) {
        bookCount.textContent = dataToRender.length;
    }
    
    // 如果沒有數據，顯示空狀態
    if (dataToRender.length === 0) {
        productsGrid.innerHTML = '';
        productsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        updatePagination();
        return;
    }
    
    productsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    // 清空網格內容
    productsGrid.innerHTML = '';
    
    // 使用模板渲染每張卡片
    currentPageData.forEach((book, index) => {
        // 複製模板
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.product-card');
        
        // 設置 data 屬性用於搜尋
        card.setAttribute('data-title', book.short_title.toLowerCase());
        
        // 填充圖片
        const bookImage = card.querySelector('.book-image');
        const placeholder = card.querySelector('.product-image-placeholder');
        
        if (book.image_url) {
            bookImage.src = book.image_url;
            bookImage.alt = book.short_title;
            bookImage.style.display = 'block';
            placeholder.style.display = 'none';
            
            // 圖片載入失敗處理
            bookImage.onerror = function() {
                this.style.display = 'none';
                placeholder.style.display = 'flex';
            };
        } else {
            bookImage.style.display = 'none';
            placeholder.style.display = 'flex';
        }
        
        // 填充書籍 ID
        card.querySelector('.book-id').textContent = `#${String(book.id).padStart(3, '0')}`;
        
        // 填充書籍資訊
        card.querySelector('.book-title').textContent = book.short_title;
        card.querySelector('.book-price').textContent = `$${book.price.toFixed(2)}`;
        card.querySelector('.book-stock').textContent = `庫存: ${book.stock_qty}`;
        card.querySelector('.book-publisher').textContent = book.publisher_name;
        
        // 填充操作連結
        const viewLink = card.querySelector('.book-view-link');
        viewLink.href = `book-detail.html?id=${book.id}`;
        
        const editBtn = card.querySelector('.book-edit-btn');
        // editBtn.onclick = () => editBook(book.id);
        
        const deleteBtn = card.querySelector('.book-delete-btn');
        deleteBtn.onclick = () => deleteBook(book.id);
        
        // 添加到網格
        productsGrid.appendChild(card);
    });
    
    // 更新分頁導航
    updatePagination();
}

/**
 * 初始化搜尋功能
 */
function initDashboardSearch() {
    const searchInput = document.getElementById('dashboardSearchInput');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        let filteredBooks = [...booksData];
        
        if (searchTerm) {
            filteredBooks = filteredBooks.filter(book => 
                book.short_title.toLowerCase().includes(searchTerm) ||
                book.publisher_name.toLowerCase().includes(searchTerm)
            );
        }
        
        // 重置到第一頁
        currentPage = 1;
        
        // 重新渲染
        renderDashboardBooks(filteredBooks);
        
        console.log(`搜尋結果: 找到 ${filteredBooks.length} 本書籍`);
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
        // 從數據中刪除
        const index = booksData.findIndex(book => book.id === bookId);
        if (index !== -1) {
            booksData.splice(index, 1);
        }
        
        // 如果當前篩選列表中也有，也要刪除
        const filteredIndex = currentFilteredBooks.findIndex(book => book.id === bookId);
        if (filteredIndex !== -1) {
            currentFilteredBooks.splice(filteredIndex, 1);
        }
        
        // 重新渲染
        renderDashboardBooks(currentFilteredBooks);
        
        // 更新統計
        updateStats();
        
        alert('書籍刪除成功！');
    }
};

/**
 * 初始化分頁
 */
function initPagination() {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    
    if (!prevBtn || !nextBtn) return;
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderDashboardBooks(currentFilteredBooks);
            scrollToTop();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderDashboardBooks(currentFilteredBooks);
            scrollToTop();
        }
    });
}

/**
 * 更新分頁導航
 */
function updatePagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const currentStart = document.getElementById('currentStart');
    const currentEnd = document.getElementById('currentEnd');
    const totalItems = document.getElementById('totalItems');
    
    if (!paginationContainer) return;
    
    // 如果沒有資料或只有一頁，隱藏分頁
    if (currentFilteredBooks.length === 0 || totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'block';
    
    // 更新上一頁/下一頁按鈕狀態
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // 更新資訊
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, currentFilteredBooks.length);
    
    currentStart.textContent = startIndex;
    currentEnd.textContent = endIndex;
    totalItems.textContent = currentFilteredBooks.length;
    
    // 生成頁碼按鈕
    paginationNumbers.innerHTML = '';
    
    const pageNumbers = generatePageNumbers(currentPage, totalPages);
    
    pageNumbers.forEach(pageNum => {
        if (pageNum === '...') {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationNumbers.appendChild(ellipsis);
        } else {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-number';
            if (pageNum === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.textContent = pageNum;
            pageBtn.addEventListener('click', () => {
                currentPage = pageNum;
                renderDashboardBooks(currentFilteredBooks);
                scrollToTop();
            });
            paginationNumbers.appendChild(pageBtn);
        }
    });
    
    console.log(`分頁更新: 第 ${currentPage}/${totalPages} 頁，顯示 ${startIndex}-${endIndex}，共 ${currentFilteredBooks.length} 本`);
}

/**
 * 生成頁碼數組
 */
function generatePageNumbers(current, total) {
    const pages = [];
    
    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);
        
        if (current > 3) {
            pages.push('...');
        }
        
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        if (current < total - 2) {
            pages.push('...');
        }
        
        pages.push(total);
    }
    
    return pages;
}

/**
 * 滾動到頂部
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

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
    const bookCount = document.getElementById('bookCount');
    
    if (totalBooks) {
        totalBooks.textContent = booksData.length;
    }
    
    if (bookCount) {
        bookCount.textContent = booksData.length;
    }
}

/**
 * 頁面載入動畫
 */
function initPageAnimation() {
    const cards = document.querySelectorAll('.product-card, .stat-card');
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