/**
 * BookHaven Book Edit
 */

import { booksData } from './data.js';

// 模擬數據
const authorsData = [
    { id: 1, name: '張三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
    { id: 4, name: '趙六' },
    { id: 5, name: '陳七' }
];

const publishersData = [
    { id: 1, name: '碁峰出版社' },
    { id: 2, name: '博碩文化' },
    { id: 3, name: '旗標科技' },
    { id: 4, name: '歐萊禮' }
];

const languagesData = [
    { id: 1, name: '繁體中文' },
    { id: 2, name: '簡體中文' },
    { id: 3, name: 'English' },
    { id: 4, name: '日本語' }
];

// 當前編輯的書籍 ID（從 URL 獲取）
let currentBookId = null;
let isEditMode = false;

/**
 * 初始化
 */
function init() {
    // 獲取 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    currentBookId = urlParams.get('id');
    isEditMode = currentBookId !== null;
    
    // 更新頁面標題
    updatePageTitle();
    
    // 填充下拉選單
    populateAuthors();
    populatePublishers();
    populateLanguages();
    
    // 如果是編輯模式，載入書籍數據
    if (isEditMode) {
        loadBookData(currentBookId);
    }
    
    // 初始化圖片上傳
    initImageUpload();
    
    // 初始化表單驗證
    initFormValidation();
    
    // 初始化用戶選單
    initUserMenu();
}

/**
 * 更新頁面標題
 */
function updatePageTitle() {
    const formTitleText = document.getElementById('formTitleText');
    const submitBtnText = document.getElementById('submitBtnText');
    
    if (isEditMode) {
        formTitleText.textContent = '編輯書籍';
        submitBtnText.textContent = '更新書籍';
    } else {
        formTitleText.textContent = '新增書籍';
        submitBtnText.textContent = '新增書籍';
    }
}

/**
 * 填充作者選單
 */
function populateAuthors() {
    const authorsSelect = document.getElementById('authors');
    
    authorsData.forEach(author => {
        const option = document.createElement('option');
        option.value = author.id;
        option.textContent = author.name;
        authorsSelect.appendChild(option);
    });
}

/**
 * 填充出版商選單
 */
function populatePublishers() {
    const publisherSelect = document.getElementById('publisher');
    
    publishersData.forEach(publisher => {
        const option = document.createElement('option');
        option.value = publisher.id;
        option.textContent = publisher.name;
        publisherSelect.appendChild(option);
    });
}

/**
 * 填充語言選單
 */
function populateLanguages() {
    const languageSelect = document.getElementById('language');
    
    languagesData.forEach(language => {
        const option = document.createElement('option');
        option.value = language.id;
        option.textContent = language.name;
        languageSelect.appendChild(option);
    });
}

/**
 * 載入書籍數據
 */
function loadBookData(bookId) {
    // 從 booksData 中找到對應的書籍
    const book = booksData.find(b => b.id == bookId);
    
    if (!book) {
        alert('找不到該書籍');
        window.location.href = 'dashboard.html';
        return;
    }
    
    // 填充表單
    document.getElementById('title').value = book.short_title || '';
    document.getElementById('isbn').value = book.isbn || '';
    document.getElementById('isbn13').value = book.isbn_13 || '';
    document.getElementById('price').value = book.price || 0;
    document.getElementById('stock').value = book.stock_qty || 0;
    document.getElementById('publishDate').value = book.published_at || '';
    document.getElementById('description').value = book.description || '';
    
    // 選擇作者（模擬）
    // 實際應該根據書籍的作者 ID 來選擇
    
    // 選擇出版商
    if (book.publisher_id) {
        document.getElementById('publisher').value = book.publisher_id;
    }
    
    // 選擇語言
    if (book.language_id) {
        document.getElementById('language').value = book.language_id;
    }
    
    // 顯示現有圖片
    if (book.image_url) {
        const existingImage = document.getElementById('existingImage');
        const existingImagePreview = document.getElementById('existingImagePreview');
        
        existingImagePreview.src = book.image_url;
        existingImage.style.display = 'block';
    }
}

/**
 * 初始化圖片上傳
 */
function initImageUpload() {
    const fileInput = document.getElementById('imageInput');
    const uploadArea = document.getElementById('uploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const existingImage = document.getElementById('existingImage');
    
    if (!fileInput || !uploadArea) {
        console.error('找不到圖片上傳元素');
        return;
    }
    
    // 點擊上傳區域觸發檔案選擇
    uploadArea.addEventListener('click', function(e) {
        if (e.target.tagName !== 'LABEL' && !e.target.closest('label')) {
            fileInput.click();
        }
    });
    
    // 拖放功能
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(files[0]);
            fileInput.files = dataTransfer.files;
            handleFileSelect(files[0]);
        }
    });
    
    // 檔案選擇事件
    fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
    
    // 移除圖片按鈕
    removeImageBtn.addEventListener('click', function() {
        resetImageUpload();
    });
    
    /**
     * 處理檔案選擇
     */
    function handleFileSelect(file) {
        // 驗證檔案類型
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            showError('imageError', '請選擇有效的圖片檔案 (JPEG, PNG, JPG, GIF)');
            fileInput.value = '';
            return;
        }
        
        // 驗證檔案大小 (10MB)
        if (file.size > 10 * 1024 * 1024) {
            showError('imageError', '圖片大小不能超過 10MB');
            fileInput.value = '';
            return;
        }
        
        // 清除錯誤
        hideError('imageError');
        
        // 顯示預覽
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            fileName.textContent = file.name;
            fileSize.textContent = `大小: ${(file.size / 1024).toFixed(2)} KB`;
            
            imagePreview.style.display = 'block';
            uploadArea.style.display = 'none';
            
            if (existingImage) {
                existingImage.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    }
    
    /**
     * 重置上傳
     */
    function resetImageUpload() {
        fileInput.value = '';
        imagePreview.style.display = 'none';
        uploadArea.style.display = 'block';
        
        if (existingImage) {
            existingImage.style.display = 'block';
        }
        
        previewImg.src = '';
        fileName.textContent = '';
        fileSize.textContent = '';
    }
}

/**
 * 初始化表單驗證
 */
function initFormValidation() {
    const form = document.getElementById('bookForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 清除所有錯誤
        clearAllErrors();
        
        // 驗證表單
        if (!validateForm()) {
            return;
        }
        
        // 收集表單數據
        const formData = new FormData(form);
        
        // 顯示表單數據（實際應該發送到後端）
        console.log('表單數據:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        
        // 模擬提交
        alert(isEditMode ? '書籍更新成功！' : '書籍新增成功！');
        
        // 跳轉回書籍列表
        setTimeout(() => {
            window.location.href = 'dashboard.html#books';
        }, 1000);
    });
}

/**
 * 驗證表單
 */
function validateForm() {
    let isValid = true;
    
    // 驗證書名
    const title = document.getElementById('title').value.trim();
    if (!title) {
        showError('titleError', '請輸入書名');
        isValid = false;
    }
    
    // 驗證作者
    const authors = document.getElementById('authors');
    if (authors.selectedOptions.length === 0) {
        showError('authorsError', '請至少選擇一位作者');
        isValid = false;
    }
    
    // 驗證價格
    const price = parseFloat(document.getElementById('price').value);
    if (isNaN(price) || price < 0) {
        showError('priceError', '請輸入有效的價格');
        isValid = false;
    }
    
    // 驗證庫存
    const stock = parseInt(document.getElementById('stock').value);
    if (isNaN(stock) || stock < 0) {
        showError('stockError', '請輸入有效的庫存數量');
        isValid = false;
    }
    
    return isValid;
}

/**
 * 顯示錯誤訊息
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.innerHTML = `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            ${message}
        `;
        errorElement.style.display = 'flex';
    }
}

/**
 * 隱藏錯誤訊息
 */
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * 清除所有錯誤
 */
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
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
export { loadBookData };