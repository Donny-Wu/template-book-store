/**
 * BookHaven Order Detail
 */

// 模擬訂單詳情數據
const orderDetail = {
    id: 1,
    order_number: 'ORD-2025-001',
    order_date: '2025-10-15 10:30:00',
    status: 'pending', // pending, confirmed, shipped, finished, cancelled
    payment_status: 'unpaid', // unpaid, paid, refunded
    recipient_name: '王小明',
    recipient_phone: '0912-345-678',
    shipping_address: '台北市信義區信義路五段7號',
    total_price: 1200,
    discount_price: 0,
    shipping_fee: 0,
    final_price: 1200,
    consumer_note: '請在下午3點後送達，謝謝！',
    admin_note: '已通知配送人員',
    created_at: '2025-10-15 10:30:00',
    updated_at: '2025-10-15 10:30:00',
    products: [
        {
            id: 1,
            title: 'Python 原力覺醒：從基礎到進階的完整學習路徑',
            image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
            isbn: '978-986-123-456-7',
            authors: '張三, 李四',
            quantity: 2,
            unit_price: 600,
            subtotal: 1200
        }
    ]
};

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

// 狀態流程定義
const statusFlow = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['shipped', 'cancelled'],
    shipped: ['finished'],
    finished: [],
    cancelled: []
};

const actionButtons = {
    confirmed: { label: '確認訂單', class: 'confirm' },
    shipped: { label: '標記出貨', class: 'ship' },
    finished: { label: '完成訂單', class: 'finish' },
    cancelled: { label: '取消訂單', class: 'cancel' }
};

/**
 * 初始化
 */
function init() {
    // 渲染訂單詳情
    renderOrderDetail();
    
    // 渲染快速操作
    renderQuickActions();
    
    // 渲染狀態歷程
    renderStatusTimeline();
    
    // 初始化表單
    initAdminNoteForm();
    
    // 初始化用戶選單
    initUserMenu();
}

/**
 * 渲染訂單詳情
 */
function renderOrderDetail() {
    // 基本資訊
    document.getElementById('orderNumber').textContent = orderDetail.order_number;
    document.getElementById('detailOrderNumber').textContent = orderDetail.order_number;
    document.getElementById('orderDate').textContent = orderDetail.order_date;
    
    // 狀態標籤
    const orderStatusEl = document.getElementById('orderStatus');
    orderStatusEl.textContent = statusLabels[orderDetail.status];
    orderStatusEl.className = `status-badge ${orderDetail.status}`;
    
    const paymentStatusEl = document.getElementById('paymentStatus');
    paymentStatusEl.textContent = paymentLabels[orderDetail.payment_status];
    paymentStatusEl.className = `status-badge ${orderDetail.payment_status}`;
    
    // 金額明細
    document.getElementById('totalPrice').textContent = orderDetail.total_price.toLocaleString();
    document.getElementById('discountPrice').textContent = orderDetail.discount_price.toLocaleString();
    document.getElementById('shippingFee').textContent = orderDetail.shipping_fee.toLocaleString();
    document.getElementById('finalPrice').textContent = orderDetail.final_price.toLocaleString();
    
    // 收件人資訊
    document.getElementById('recipientName').textContent = orderDetail.recipient_name;
    document.getElementById('recipientPhone').textContent = orderDetail.recipient_phone;
    document.getElementById('shippingAddress').textContent = orderDetail.shipping_address;
    
    // 備註
    if (orderDetail.consumer_note) {
        document.getElementById('consumerNote').textContent = orderDetail.consumer_note;
    }
    if (orderDetail.admin_note) {
        document.getElementById('adminNoteDisplay').textContent = orderDetail.admin_note;
        document.getElementById('adminNoteInput').value = orderDetail.admin_note;
    }
    
    // 渲染商品列表
    renderProducts();
}

/**
 * 渲染商品列表
 */
function renderProducts() {
    const productsList = document.getElementById('productsList');
    
    productsList.innerHTML = orderDetail.products.map(product => `
        <div class="product-item">
            ${product.image ? 
                `<img src="${product.image}" alt="${product.title}" class="product-item-image">` :
                `<div class="product-item-placeholder">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                </div>`
            }
            <div class="product-item-info">
                <div class="product-item-title">${product.title}</div>
                <div class="product-item-meta">
                    <span>ISBN: ${product.isbn}</span>
                    <span>作者: ${product.authors}</span>
                </div>
            </div>
            <div class="product-item-pricing">
                <div>數量: ${product.quantity}</div>
                <div>單價: NT$ ${product.unit_price.toLocaleString()}</div>
                <div class="subtotal">小計: NT$ ${product.subtotal.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

/**
 * 渲染快速操作
 */
function renderQuickActions() {
    const quickActions = document.getElementById('quickActions');
    const nextStatuses = statusFlow[orderDetail.status];
    
    if (nextStatuses && nextStatuses.length > 0) {
        quickActions.innerHTML = nextStatuses.map(status => {
            const action = actionButtons[status];
            return `
                <button class="quick-action-btn ${action.class}" onclick="updateOrderStatus('${status}')">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${getStatusIcon(status)}
                    </svg>
                    ${action.label}
                </button>
            `;
        }).join('');
    } else {
        quickActions.innerHTML = '<div class="no-actions">此訂單已完成，無法進行狀態變更</div>';
    }
}

/**
 * 獲取狀態圖標
 */
function getStatusIcon(status) {
    const icons = {
        confirmed: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
        shipped: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>',
        finished: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>',
        cancelled: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
    };
    return icons[status] || '';
}

/**
 * 渲染狀態歷程
 */
function renderStatusTimeline() {
    const timeline = document.getElementById('statusTimeline');
    const statusOrder = ['pending', 'confirmed', 'shipped', 'finished'];
    const currentStatusIndex = statusOrder.indexOf(orderDetail.status);
    
    let timelineHTML = '';
    
    // 訂單建立
    timelineHTML += createTimelineItem('created', '訂單建立', orderDetail.created_at, true);
    
    // 訂單確認
    if (currentStatusIndex >= 1) {
        timelineHTML += createTimelineItem('confirmed', '訂單確認', orderDetail.updated_at, true);
    }
    
    // 商品出貨
    if (currentStatusIndex >= 2) {
        timelineHTML += createTimelineItem('shipped', '商品出貨', orderDetail.updated_at, true);
    }
    
    // 訂單完成
    if (currentStatusIndex >= 3 || orderDetail.status === 'finished') {
        timelineHTML += createTimelineItem('finished', '訂單完成', orderDetail.updated_at, true);
    }
    
    // 訂單取消
    if (orderDetail.status === 'cancelled') {
        timelineHTML += createTimelineItem('cancelled', '訂單取消', orderDetail.updated_at, true);
    }
    
    timeline.innerHTML = timelineHTML;
}

/**
 * 創建時間軸項目
 */
function createTimelineItem(type, title, time, completed) {
    return `
        <div class="timeline-item">
            <div class="timeline-icon ${type}">
                <svg fill="currentColor" viewBox="0 0 20 20">
                    ${completed ? 
                        '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>' :
                        '<circle cx="10" cy="10" r="3"></circle>'
                    }
                </svg>
            </div>
            <div class="timeline-content">
                <div class="timeline-title">${title}</div>
                <div class="timeline-time">${time}</div>
            </div>
        </div>
    `;
}

/**
 * 更新訂單狀態
 */
window.updateOrderStatus = function(newStatus) {
    if (!confirm(`確定要${actionButtons[newStatus].label}嗎？`)) {
        return;
    }
    
    console.log('更新訂單狀態:', orderDetail.id, newStatus);
    
    // 模擬 API 調用
    setTimeout(() => {
        orderDetail.status = newStatus;
        orderDetail.updated_at = new Date().toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\//g, '-');
        
        alert('狀態更新成功！');
        
        // 重新渲染
        renderOrderDetail();
        renderQuickActions();
        renderStatusTimeline();
    }, 300);
};

/**
 * 初始化管理員備註表單
 */
function initAdminNoteForm() {
    const form = document.getElementById('adminNoteForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const note = document.getElementById('adminNoteInput').value.trim();
        
        if (!note) {
            alert('請輸入備註內容');
            return;
        }
        
        console.log('儲存管理員備註:', note);
        
        // 模擬 API 調用
        setTimeout(() => {
            orderDetail.admin_note = note;
            document.getElementById('adminNoteDisplay').textContent = note;
            
            alert('備註儲存成功！');
        }, 300);
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
 * 頁面載入完成後初始化
 */
document.addEventListener('DOMContentLoaded', init);

// 導出給其他模塊使用
export { orderDetail };