/**
 * BookHaven Admin Login
 */

// 測試帳號
const testAccount = {
    email: 'admin@bookhaven.com',
    password: 'Admin123'
};

/**
 * 初始化
 */
function init() {
    // 初始化表單
    initLoginForm();
    
    // 檢查是否已記住帳號
    checkRememberedUser();
    
    // 添加鍵盤事件
    addKeyboardListeners();
}

/**
 * 初始化登入表單
 */
function initLoginForm() {
    const form = document.getElementById('loginForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 清除錯誤
        clearErrors();
        
        // 驗證表單
        if (!validateForm()) {
            return;
        }
        
        // 執行登入
        performLogin();
    });
}

/**
 * 驗證表單
 */
function validateForm() {
    let isValid = true;
    
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('emailError', '請輸入電子郵件');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', '請輸入有效的電子郵件地址');
        isValid = false;
    }
    
    const password = document.getElementById('password').value;
    if (!password) {
        showError('passwordError', '請輸入密碼');
        isValid = false;
    } else if (password.length < 6) {
        showError('passwordError', '密碼長度至少需要 6 個字元');
        isValid = false;
    }
    
    return isValid;
}

/**
 * 執行登入
 */
function performLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // 模擬登入驗證
    if (email === testAccount.email && password === testAccount.password) {
        // 登入成功
        console.log('登入成功:', { email, remember });
        
        // 如果勾選記住我，儲存到 localStorage
        if (remember) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // 顯示成功訊息
        showSuccessMessage();
        
        // 延遲跳轉到儀表板
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        // 登入失敗
        showError('passwordError', '電子郵件或密碼錯誤');
        
        // 震動效果
        const form = document.getElementById('loginForm');
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }
}

/**
 * 顯示成功訊息
 */
function showSuccessMessage() {
    const form = document.getElementById('loginForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        登入成功！正在跳轉...
    `;
    successDiv.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: #d1fae5;
        color: #065f46;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 1rem;
    `;
    const svg = successDiv.querySelector('svg');
    svg.style.cssText = 'width: 20px; height: 20px;';
    
    form.appendChild(successDiv);
}

/**
 * 切換密碼可見性
 */
window.togglePassword = function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
};

/**
 * 檢查是否已記住帳號
 */
function checkRememberedUser() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
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
 * 清除所有錯誤
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}

/**
 * 驗證電子郵件格式
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 添加鍵盤事件監聽
 */
function addKeyboardListeners() {
    // Enter 鍵提交表單
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const form = document.getElementById('loginForm');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}

/**
 * 添加震動動畫 CSS
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

/**
 * 頁面載入完成後初始化
 */
document.addEventListener('DOMContentLoaded', init);

// 顯示測試帳號提示（開發用）
console.log('%c測試帳號資訊', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('Email:', testAccount.email);
console.log('Password:', testAccount.password);