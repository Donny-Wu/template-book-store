/**
 * BookHaven Order List
 */

// 模擬訂單數據
const ordersData = [
    {
        id: 1,
        order_number: 'ORD-2025-001',
        order_date: '2025-10-15 10:30',
        recipient_name: '王小明',
        recipient_phone: '0912-345-678',
        product_title: '深度學習入門',
        product_image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
        product_count: 2,
        total_price: 1200,
        final_price: 1200,
        status: 'pending',
        payment_status: 'unpaid'
    },
    {
        id: 2,
        order_number: 'ORD-2025-002',
        order_date: '2025-10-15 11:45',
        recipient_name: '李小華',
        recipient_phone: '0923-456-789',
        product_title: 'JavaScript 權威指南',
        product_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 720,
        final_price: 720,
        status: 'confirmed',
        payment_status: 'paid'
    },
    {
        id: 3,
        order_number: 'ORD-2025-003',
        order_date: '2025-10-14 14:20',
        recipient_name: '張大偉',
        recipient_phone: '0934-567-890',
        product_title: 'Python 自動化',
        product_image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=600&fit=crop',
        product_count: 3,
        total_price: 1800,
        final_price: 1650,
        status: 'shipped',
        payment_status: 'paid'
    },
    {
        id: 4,
        order_number: 'ORD-2025-004',
        order_date: '2025-10-14 09:15',
        recipient_name: '陳美玲',
        recipient_phone: '0945-678-901',
        product_title: 'React 實戰開發',
        product_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 680,
        final_price: 680,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 5,
        order_number: 'ORD-2025-005',
        order_date: '2025-10-13 16:40',
        recipient_name: '林志明',
        recipient_phone: '0956-789-012',
        product_title: 'Vue.js 從零開始',
        product_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
        product_count: 2,
        total_price: 1400,
        final_price: 1400,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 6,
        order_number: 'ORD-2025-006',
        order_date: '2025-10-13 13:25',
        recipient_name: '黃淑芬',
        recipient_phone: '0967-890-123',
        product_title: 'Node.js 開發實戰',
        product_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 750,
        final_price: 750,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 7,
        order_number: 'ORD-2025-007',
        order_date: '2025-10-12 10:10',
        recipient_name: '吳建宏',
        recipient_phone: '0978-901-234',
        product_title: 'Docker 容器技術',
        product_image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 820,
        final_price: 820,
        status: 'cancelled',
        payment_status: 'refunded'
    },
    {
        id: 8,
        order_number: 'ORD-2025-008',
        order_date: '2025-10-12 08:30',
        recipient_name: '鄭雅婷',
        recipient_phone: '0989-012-345',
        product_title: 'Kubernetes 入門',
        product_image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=600&fit=crop',
        product_count: 2,
        total_price: 1600,
        final_price: 1600,
        status: 'pending',
        payment_status: 'unpaid'
    },
    {
        id: 9,
        order_number: 'ORD-2025-009',
        order_date: '2025-10-11 15:20',
        recipient_name: '劉冠宇',
        recipient_phone: '0910-123-456',
        product_title: 'MySQL 資料庫設計',
        product_image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 690,
        final_price: 690,
        status: 'confirmed',
        payment_status: 'paid'
    },
    {
        id: 10,
        order_number: 'ORD-2025-010',
        order_date: '2025-10-11 11:50',
        recipient_name: '許雅雯',
        recipient_phone: '0921-234-567',
        product_title: 'MongoDB 實戰指南',
        product_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 720,
        final_price: 720,
        status: 'shipped',
        payment_status: 'paid'
    },
    {
        id: 11,
        order_number: 'ORD-2025-011',
        order_date: '2025-10-10 14:35',
        recipient_name: '周柏翰',
        recipient_phone: '0932-345-678',
        product_title: 'Git 版本控制',
        product_image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=600&fit=crop',
        product_count: 3,
        total_price: 1500,
        final_price: 1350,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 12,
        order_number: 'ORD-2025-012',
        order_date: '2025-10-10 09:45',
        recipient_name: '蔡佩君',
        recipient_phone: '0943-456-789',
        product_title: 'TypeScript 完全指南',
        product_image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 780,
        final_price: 780,
        status: 'confirmed',
        payment_status: 'paid'
    },
    {
        id: 13,
        order_number: 'ORD-2025-013',
        order_date: '2025-10-09 16:20',
        recipient_name: '謝明宏',
        recipient_phone: '0954-567-890',
        product_title: 'HTML5 與 CSS3',
        product_image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
        product_count: 2,
        total_price: 1100,
        final_price: 1100,
        status: 'pending',
        payment_status: 'unpaid'
    },
    {
        id: 14,
        order_number: 'ORD-2025-014',
        order_date: '2025-10-09 10:15',
        recipient_name: '林詩涵',
        recipient_phone: '0965-678-901',
        product_title: 'Angular 開發實戰',
        product_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 850,
        final_price: 850,
        status: 'shipped',
        payment_status: 'paid'
    },
    {
        id: 15,
        order_number: 'ORD-2025-015',
        order_date: '2025-10-08 13:40',
        recipient_name: '楊子萱',
        recipient_phone: '0976-789-012',
        product_title: 'Laravel 框架實戰',
        product_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 920,
        final_price: 920,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 16,
        order_number: 'ORD-2025-016',
        order_date: '2025-10-08 08:25',
        recipient_name: '陳俊傑',
        recipient_phone: '0987-890-123',
        product_title: 'Spring Boot 微服務',
        product_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=600&fit=crop',
        product_count: 2,
        total_price: 1800,
        final_price: 1800,
        status: 'confirmed',
        payment_status: 'paid'
    },
    {
        id: 17,
        order_number: 'ORD-2025-017',
        order_date: '2025-10-07 15:50',
        recipient_name: '江佳蓉',
        recipient_phone: '0998-901-234',
        product_title: 'Django 網站開發',
        product_image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 880,
        final_price: 880,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 18,
        order_number: 'ORD-2025-018',
        order_date: '2025-10-07 11:30',
        recipient_name: '羅志成',
        recipient_phone: '0912-012-345',
        product_title: 'Redis 快取實戰',
        product_image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 750,
        final_price: 750,
        status: 'pending',
        payment_status: 'unpaid'
    },
    {
        id: 19,
        order_number: 'ORD-2025-019',
        order_date: '2025-10-06 14:15',
        recipient_name: '潘怡君',
        recipient_phone: '0923-123-456',
        product_title: 'GraphQL 完全指南',
        product_image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 820,
        final_price: 820,
        status: 'shipped',
        payment_status: 'paid'
    },
    {
        id: 20,
        order_number: 'ORD-2025-020',
        order_date: '2025-10-06 09:40',
        recipient_name: '賴宗翰',
        recipient_phone: '0934-234-567',
        product_title: 'Flutter 跨平台開發',
        product_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=600&fit=crop',
        product_count: 2,
        total_price: 1400,
        final_price: 1260,
        status: 'confirmed',
        payment_status: 'paid'
    },
    {
        id: 21,
        order_number: 'ORD-2025-021',
        order_date: '2025-10-05 16:05',
        recipient_name: '洪雅文',
        recipient_phone: '0945-345-678',
        product_title: 'Swift iOS 開發',
        product_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 950,
        final_price: 950,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 22,
        order_number: 'ORD-2025-022',
        order_date: '2025-10-05 10:30',
        recipient_name: '簡志豪',
        recipient_phone: '0956-456-789',
        product_title: 'Kotlin Android 開發',
        product_image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 880,
        final_price: 880,
        status: 'finished',
        payment_status: 'paid'
    },
    {
        id: 23,
        order_number: 'ORD-2025-023',
        order_date: '2025-10-04 13:20',
        recipient_name: '袁靜怡',
        recipient_phone: '0967-567-890',
        product_title: 'TensorFlow 機器學習',
        product_image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=600&fit=crop',
        product_count: 2,
        total_price: 1600,
        final_price: 1600,
        status: 'pending',
        payment_status: 'unpaid'
    },
    {
        id: 24,
        order_number: 'ORD-2025-024',
        order_date: '2025-10-04 08:45',
        recipient_name: '蔣宏達',
        recipient_phone: '0978-678-901',
        product_title: 'PyTorch 深度學習',
        product_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 920,
        final_price: 920,
        status: 'confirmed',
        payment_status: 'paid'
    },
    {
        id: 25,
        order_number: 'ORD-2025-025',
        order_date: '2025-10-03 15:10',
        recipient_name: '孫美惠',
        recipient_phone: '0989-789-012',
        product_title: 'Elasticsearch 搜尋引擎',
        product_image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&h=600&fit=crop',
        product_count: 1,
        total_price: 850,
        final_price: 850,
        status: 'shipped',
        payment_status: 'paid'
    }
];

// 分頁相關變數
let currentPage = 1;
let itemsPerPage = 10;
let totalPages = 1;
let currentFilteredOrders = [];

// 狀態標籤對應
const statusLabels = {
    pending: '待確認',
    confirmed: '已確認',
    shipped: '已出貨',
    finished: '已完成',
    cancelled: '已取消'
};

const paymentLabels = {
    unpaid: '未付款',
    paid: '已付款',
    refunded: '已退款'
};

/**
 * 初始化
 */
function init() {
    // 初始化當前篩選訂單列表
    currentFilteredOrders = [...ordersData];
    
    // 渲染訂單列表
    renderOrders();
    
    // 初始化篩選
    initFilters();
    
    // 初始化選擇框
    initCheckboxes();
    
    // 初始化分頁
    initPagination();
    
    // 初始化用戶選單
    initUserMenu();
    
    // 更新統計數據
    updateStatistics();
}

/**
 * 渲染訂單列表（使用模板）
 */
function renderOrders(filteredData = null) {
    const tableBody = document.getElementById('ordersTableBody');
    const emptyState = document.getElementById('emptyState');
    const template = document.getElementById('orderRowTemplate');
    
    if (!tableBody || !template) return;
    
    // 使用篩選後的數據或所有數據
    const dataToRender = filteredData !== null ? filteredData : ordersData;
    
    // 更新當前篩選訂單列表
    currentFilteredOrders = dataToRender;
    
    // 計算總頁數
    totalPages = Math.ceil(dataToRender.length / itemsPerPage);
    
    // 確保當前頁碼在有效範圍內
    if (currentPage > totalPages) {
        currentPage = Math.max(1, totalPages);
    }
    
    // 計算當前頁的資料範圍
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataToRender.length);
    const currentPageData = dataToRender.slice(startIndex, endIndex);
    
    if (dataToRender.length === 0) {
        tableBody.innerHTML = '';
        emptyState.style.display = 'block';
        updatePagination();
        return;
    }
    
    emptyState.style.display = 'none';
    
    // 清空表格內容
    tableBody.innerHTML = '';
    
    // 使用模板渲染每一行
    currentPageData.forEach(order => {
        // 複製模板
        const clone = template.content.cloneNode(true);
        const row = clone.querySelector('tr');
        
        // 填充複選框
        const checkbox = row.querySelector('.order-checkbox');
        checkbox.value = order.id;
        checkbox.setAttribute('data-order-id', order.id);
        
        // 填充訂單資訊
        row.querySelector('.order-number').textContent = order.order_number;
        row.querySelector('.order-date').textContent = order.order_date;
        
        // 填充收件人資訊
        row.querySelector('.recipient-name').textContent = order.recipient_name;
        row.querySelector('.recipient-phone').textContent = order.recipient_phone;
        
        // 填充商品資訊
        const productImage = row.querySelector('.order-product-image');
        productImage.src = order.product_image;
        productImage.alt = order.product_title;
        
        row.querySelector('.order-product-title').textContent = order.product_title;
        
        const extraInfo = row.querySelector('.order-product-extra');
        if (order.product_count > 1) {
            extraInfo.textContent = `+${order.product_count - 1} 本其他書籍`;
            extraInfo.style.display = 'block';
        } else {
            extraInfo.style.display = 'none';
        }
        
        // 填充金額
        row.querySelector('.order-amount').textContent = `NT$ ${order.final_price.toLocaleString()}`;
        row.querySelector('.order-subtotal').textContent = `商品: NT$ ${order.total_price.toLocaleString()}`;
        
        // 填充狀態標籤
        const orderStatusBadge = row.querySelector('.order-status-badge');
        orderStatusBadge.textContent = statusLabels[order.status];
        orderStatusBadge.className = `status-badge ${order.status}`;
        
        const paymentStatusBadge = row.querySelector('.payment-status-badge');
        paymentStatusBadge.textContent = paymentLabels[order.payment_status];
        paymentStatusBadge.className = `status-badge ${order.payment_status}`;
        
        // 填充操作連結
        const viewLink = row.querySelector('.view-link');
        viewLink.href = `order-detail.html?id=${order.id}`;
        
        const updateLink = row.querySelector('.update-link');
        if (order.status !== 'finished' && order.status !== 'cancelled') {
            updateLink.style.display = 'inline';
            updateLink.onclick = () => showStatusModal(order.id, order.status);
        } else {
            updateLink.style.display = 'none';
        }
        
        // 添加到表格
        tableBody.appendChild(row);
    });
    
    // 重新初始化選擇框事件
    initCheckboxEvents();
    
    // 更新分頁導航
    updatePagination();
}
/**
 * 初始化篩選
 */
function initFilters() {
    const filterForm = document.getElementById('filterForm');
    
    if (!filterForm) return;
    
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyFilters();
    });
}

/**
 * 應用篩選
 */
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const statusFilter = document.getElementById('statusFilter').value;
    const paymentFilter = document.getElementById('paymentFilter').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    
    let filteredOrders = [...ordersData];
    
    // 搜尋篩選
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => 
            order.order_number.toLowerCase().includes(searchTerm) ||
            order.recipient_name.toLowerCase().includes(searchTerm) ||
            order.recipient_phone.includes(searchTerm)
        );
    }
    
    // 訂單狀態篩選
    if (statusFilter) {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    // 付款狀態篩選
    if (paymentFilter) {
        filteredOrders = filteredOrders.filter(order => order.payment_status === paymentFilter);
    }
    
    // 日期篩選
    if (dateFrom) {
        filteredOrders = filteredOrders.filter(order => order.order_date >= dateFrom);
    }
    
    if (dateTo) {
        filteredOrders = filteredOrders.filter(order => order.order_date <= dateTo);
    }
    
    // 重置到第一頁
    currentPage = 1;
    
    // 重新渲染
    renderOrders(filteredOrders);
    
    console.log(`找到 ${filteredOrders.length} 筆訂單`);
}

/**
 * 重置篩選
 */
window.resetFilters = function() {
    document.getElementById('filterForm').reset();
    currentPage = 1;
    renderOrders(ordersData);
};

/**
 * 初始化選擇框
 */
function initCheckboxes() {
    const selectAll = document.getElementById('selectAll');
    
    if (!selectAll) return;
    
    selectAll.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.order-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateSelectedCount();
    });
}

/**
 * 初始化選擇框事件
 */
function initCheckboxEvents() {
    document.querySelectorAll('.order-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedCount);
    });
}

/**
 * 更新選中數量
 */
function updateSelectedCount() {
    const checked = document.querySelectorAll('.order-checkbox:checked').length;
    document.getElementById('selectedCount').textContent = `已選擇 ${checked} 筆`;
}

/**
 * 批量操作
 */
window.batchAction = function(action) {
    const selectedIds = Array.from(document.querySelectorAll('.order-checkbox:checked'))
        .map(checkbox => checkbox.value);

    if (selectedIds.length === 0) {
        alert('請選擇要操作的訂單');
        return;
    }

    const actionNames = {
        'confirm': '確認',
        'ship': '出貨',
        'finish': '完成',
        'cancel': '取消'
    };

    if (confirm(`確定要${actionNames[action]}選中的 ${selectedIds.length} 筆訂單嗎？`)) {
        console.log(`批量${actionNames[action]}訂單:`, selectedIds);
        alert(`已${actionNames[action]} ${selectedIds.length} 筆訂單`);
        
        // 取消所有選擇
        document.querySelectorAll('.order-checkbox').forEach(cb => cb.checked = false);
        document.getElementById('selectAll').checked = false;
        updateSelectedCount();
    }
};

/**
 * 顯示狀態更新 Modal
 */
window.showStatusModal = function(orderId, currentStatus) {
    document.getElementById('orderId').value = orderId;
    document.getElementById('orderStatus').value = currentStatus;
    document.getElementById('adminNote').value = '';
    document.getElementById('statusModal').classList.add('active');
};

/**
 * 隱藏狀態更新 Modal
 */
window.hideStatusModal = function() {
    document.getElementById('statusModal').classList.remove('active');
};

/**
 * 初始化狀態表單
 */
document.getElementById('statusForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orderId = document.getElementById('orderId').value;
    const status = document.getElementById('orderStatus').value;
    const note = document.getElementById('adminNote').value;
    
    console.log('更新訂單狀態:', { orderId, status, note });
    
    alert('訂單狀態已更新！');
    hideStatusModal();
    
    // 重新渲染列表
    renderOrders(currentFilteredOrders);
});

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
            renderOrders(currentFilteredOrders);
            scrollToTop();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderOrders(currentFilteredOrders);
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
    if (currentFilteredOrders.length === 0 || totalPages <= 1) {
        paginationContainer.classList.add('hidden');
        return;
    }
    
    paginationContainer.classList.remove('hidden');
    
    // 更新上一頁/下一頁按鈕狀態
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // 更新資訊
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, currentFilteredOrders.length);
    
    currentStart.textContent = startIndex;
    currentEnd.textContent = endIndex;
    totalItems.textContent = currentFilteredOrders.length;
    
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
                renderOrders(currentFilteredOrders);
                scrollToTop();
            });
            paginationNumbers.appendChild(pageBtn);
        }
    });
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
    
    document.addEventListener('click', () => {
        userMenu.classList.remove('active');
        userDropdown.classList.remove('active');
    });
}

/**
 * 更新統計數據
 */
function updateStatistics() {
    const stats = {
        total: ordersData.length,
        pending: ordersData.filter(o => o.status === 'pending').length,
        confirmed: ordersData.filter(o => o.status === 'confirmed').length,
        shipped: ordersData.filter(o => o.status === 'shipped').length,
        finished: ordersData.filter(o => o.status === 'finished').length,
        cancelled: ordersData.filter(o => o.status === 'cancelled').length
    };
    
    document.getElementById('totalOrders').textContent = stats.total;
    document.getElementById('pendingOrders').textContent = stats.pending;
    document.getElementById('confirmedOrders').textContent = stats.confirmed;
    document.getElementById('shippedOrders').textContent = stats.shipped;
    document.getElementById('finishedOrders').textContent = stats.finished;
    document.getElementById('cancelledOrders').textContent = stats.cancelled;
}

// 點擊 Modal 背景關閉
document.getElementById('statusModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        hideStatusModal();
    }
});

/**
 * 頁面載入完成後初始化
 */
document.addEventListener('DOMContentLoaded', init);

// 導出給其他模塊使用
export { renderOrders };