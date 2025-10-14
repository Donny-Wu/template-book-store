/**
 * 購物車管理類
 */
export class Cart {
    constructor() {
        this.items = [];
        this.storageKey = 'bookhaven_cart';
        this.load();
    }

    /**
     * 從 localStorage 加載購物車
     */
    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.items = JSON.parse(saved);
            }
        } catch (error) {
            console.error('載入購物車失敗:', error);
            this.items = [];
        }
    }

    /**
     * 保存購物車到 localStorage
     */
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (error) {
            console.error('保存購物車失敗:', error);
        }
    }

    /**
     * 添加商品到購物車
     */
    addItem(book) {
        const existingItem = this.items.find(item => item.id === book.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({
                id: book.id,
                title: book.short_title,
                author: book.authors,
                price: book.price,
                imageUrl: book.image_url,
                quantity: 1
            });
        }

        this.save();
        return existingItem ? 'updated' : 'added';
    }

    /**
     * 更新商品數量
     */
    updateQuantity(id, delta) {
        const item = this.items.find(item => item.id === id);
        
        if (!item) return false;

        item.quantity += delta;

        if (item.quantity <= 0) {
            return this.removeItem(id);
        }

        this.save();
        return true;
    }

    /**
     * 移除商品
     */
    removeItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        
        if (index === -1) return false;

        this.items.splice(index, 1);
        this.save();
        return true;
    }

    /**
     * 清空購物車
     */
    clear() {
        this.items = [];
        this.save();
    }

    /**
     * 獲取購物車商品
     */
    getItems() {
        return this.items;
    }

    /**
     * 獲取商品總數
     */
    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * 獲取總金額
     */
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * 檢查購物車是否為空
     */
    isEmpty() {
        return this.items.length === 0;
    }
}

/**
 * 購物車 UI 管理類
 */
export class CartUI {
    constructor(cart) {
        this.cart = cart;
        this.sidebar = document.getElementById('cartSidebar');
        this.overlay = document.getElementById('cartOverlay');
        this.content = document.getElementById('cartContent');
        this.footer = document.getElementById('cartFooter');
        this.countElement = document.getElementById('cart-count');
        this.subtotalElement = document.getElementById('subtotal');
        this.totalElement = document.getElementById('total');
        
        this.bindEvents();
    }

    /**
     * 綁定事件
     */
    bindEvents() {
        // 打開購物車
        document.getElementById('cartButton')?.addEventListener('click', () => this.open());
        
        // 關閉購物車
        document.getElementById('closeCartBtn')?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());
        
        // 結帳
        document.getElementById('checkoutBtn')?.addEventListener('click', () => this.checkout());
        
        // 清空購物車
        document.getElementById('clearCartBtn')?.addEventListener('click', () => this.clearCart());
        
        // ESC 鍵關閉
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar.classList.contains('active')) {
                this.close();
            }
        });
    }

    /**
     * 打開購物車側邊欄
     */
    open() {
        this.sidebar.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * 關閉購物車側邊欄
     */
    close() {
        this.sidebar.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * 更新購物車顯示
     */
    update() {
        this.updateCount();
        
        if (this.cart.isEmpty()) {
            this.renderEmpty();
            this.footer.style.display = 'none';
        } else {
            this.renderItems();
            this.updateSummary();
            this.footer.style.display = 'block';
        }
    }

    /**
     * 更新購物車數量顯示
     */
    updateCount() {
        const count = this.cart.getTotalItems();
        this.countElement.textContent = count;
    }

    /**
     * 渲染空購物車
     */
    renderEmpty() {
        this.content.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>您的購物車是空的</p>
                <button class="continue-shopping-btn">繼續購物</button>
            </div>
        `;

        // 綁定繼續購物按鈕
        this.content.querySelector('.continue-shopping-btn')?.addEventListener('click', () => {
            this.close();
        });
    }

    /**
     * 渲染購物車商品
     */
    renderItems() {
        const items = this.cart.getItems();
        
        this.content.innerHTML = items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}">` : '📚'}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    ${item.author ? `<div class="cart-item-author">${item.author}</div>` : ''}
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-action="decrease" data-id="${item.id}">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">移除</button>
                </div>
            </div>
        `).join('');

        // 綁定數量控制按鈕
        this.content.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const action = e.target.dataset.action;
                const delta = action === 'increase' ? 1 : -1;
                
                this.cart.updateQuantity(id, delta);
                this.update();
            });
        });

        // 綁定移除按鈕
        this.content.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.cart.removeItem(id);
                this.update();
                this.showNotification('商品已從購物車移除');
            });
        });
    }

    /**
     * 更新購物車摘要
     */
    updateSummary() {
        const subtotal = this.cart.getTotalPrice();
        this.subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        this.totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    /**
     * 結帳
     */
    checkout() {
        if (this.cart.isEmpty()) return;

        const total = this.cart.getTotalPrice();
        alert(`準備結帳\n總金額: $${total.toFixed(2)}\n\n此為演示版本，實際結帳功能需要後端支持`);
        window.location.href = '/checkout.html';
    }

    /**
     * 清空購物車
     */
    clearCart() {
        if (this.cart.isEmpty()) return;

        if (confirm('確定要清空購物車嗎？')) {
            this.cart.clear();
            this.update();
            this.showNotification('購物車已清空');
        }
    }

    /**
     * 顯示通知
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
}