/**
 * BookHaven Admin Edit
 */

// 模擬當前管理員數據
const currentAdmin = {
    id: 1,
    name: '管理員',
    email: 'admin@bookhaven.com',
    phone: '0912-345-678',
    role: '系統管理員',
    bio: '負責 BookHaven 系統的日常維護和管理工作。',
    avatar: 'https://ui-avatars.com/api/?name=Admin&size=200&background=667eea&color=fff',
    createdAt: '2024-01-15',
    lastLogin: '2025-10-15 10:30',
    loginCount: 247
};

/**
 * 初始化
 */
function init() {
    // 載入管理員數據
    loadAdminData();
    
    // 初始化頭像上傳
    initAvatarUpload();
    
    // 初始化個人資料表單
    initAdminForm();
    
    // 初始化密碼表單
    initPasswordForm();
    
    // 初始化密碼強度檢測
    initPasswordStrength();
    
    // 初始化用戶選單
    initUserMenu();
}

/**
 * 載入管理員數據
 */
function loadAdminData() {
    // 填充表單
    document.getElementById('name').value = currentAdmin.name;
    document.getElementById('email').value = currentAdmin.email;
    document.getElementById('phone').value = currentAdmin.phone;
    document.getElementById('role').value = currentAdmin.role;
    document.getElementById('bio').value = currentAdmin.bio;
    
    // 設置頭像
    document.getElementById('avatarImage').src = currentAdmin.avatar;
    
    // 填充帳號資訊
    document.getElementById('createdAt').textContent = currentAdmin.createdAt;
    document.getElementById('lastLogin').textContent = currentAdmin.lastLogin;
    document.getElementById('loginCount').textContent = currentAdmin.loginCount;
}

/**
 * 初始化頭像上傳
 */
function initAvatarUpload() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarImage = document.getElementById('avatarImage');
    
    if (!avatarInput) return;
    
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // 驗證檔案類型
        if (!file.type.match('image.*')) {
            alert('請選擇圖片檔案');
            return;
        }
        
        // 驗證檔案大小 (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('圖片大小不能超過 2MB');
            return;
        }
        
        // 預覽圖片
        const reader = new FileReader();
        reader.onload = function(e) {
            avatarImage.src = e.target.result;
            alert('頭像已更新！（模擬）');
        };
        reader.readAsDataURL(file);
    });
}

/**
 * 移除頭像
 */
window.removeAvatar = function() {
    if (confirm('確定要移除頭像嗎？')) {
        const avatarImage = document.getElementById('avatarImage');
        avatarImage.src = 'https://ui-avatars.com/api/?name=Admin&size=200&background=667eea&color=fff';
        alert('頭像已移除！');
    }
};

/**
 * 初始化個人資料表單
 */
function initAdminForm() {
    const form = document.getElementById('adminForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 清除錯誤
        clearErrors();
        
        // 驗證表單
        if (!validateAdminForm()) {
            return;
        }
        
        // 收集數據
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            bio: document.getElementById('bio').value
        };
        
        console.log('更新管理員資料:', formData);
        
        alert('管理員資料更新成功！');
    });
}

/**
 * 驗證個人資料表單
 */
function validateAdminForm() {
    let isValid = true;
    
    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('nameError', '請輸入姓名');
        isValid = false;
    }
    
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('emailError', '請輸入電子郵件');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', '請輸入有效的電子郵件地址');
        isValid = false;
    }
    
    return isValid;
}

/**
 * 初始化密碼表單
 */
function initPasswordForm() {
    const form = document.getElementById('passwordForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 清除錯誤
        clearErrors();
        
        // 驗證表單
        if (!validatePasswordForm()) {
            return;
        }
        
        // 收集數據
        const formData = {
            currentPassword: document.getElementById('currentPassword').value,
            newPassword: document.getElementById('newPassword').value
        };
        
        console.log('更新密碼:', formData);
        
        alert('密碼更新成功！');
        
        // 清空表單
        form.reset();
        
        // 重置密碼強度指示器
        resetPasswordStrength();
    });
}

/**
 * 驗證密碼表單
 */
function validatePasswordForm() {
    let isValid = true;
    
    const currentPassword = document.getElementById('currentPassword').value;
    if (!currentPassword) {
        showError('currentPasswordError', '請輸入目前密碼');
        isValid = false;
    }
    
    const newPassword = document.getElementById('newPassword').value;
    if (!newPassword) {
        showError('newPasswordError', '請輸入新密碼');
        isValid = false;
    } else if (!isStrongPassword(newPassword)) {
        showError('newPasswordError', '密碼不符合安全要求');
        isValid = false;
    }
    
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (!confirmPassword) {
        showError('confirmPasswordError', '請確認新密碼');
        isValid = false;
    } else if (newPassword !== confirmPassword) {
        showError('confirmPasswordError', '兩次輸入的密碼不一致');
        isValid = false;
    }
    
    return isValid;
}

/**
 * 初始化密碼強度檢測
 */
function initPasswordStrength() {
    const newPasswordInput = document.getElementById('newPassword');
    
    if (!newPasswordInput) return;
    
    newPasswordInput.addEventListener('input', function() {
        const password = this.value;
        checkPasswordStrength(password);
        updatePasswordRequirements(password);
    });
}

/**
 * 檢查密碼強度
 */
function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!password) {
        strengthBar.className = 'strength-bar-fill';
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return;
    }
    
    let strength = 0;
    
    // 長度
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // 包含大寫
    if (/[A-Z]/.test(password)) strength++;
    
    // 包含小寫
    if (/[a-z]/.test(password)) strength++;
    
    // 包含數字
    if (/[0-9]/.test(password)) strength++;
    
    // 包含特殊字符
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // 設置強度
    if (strength <= 2) {
        strengthBar.className = 'strength-bar-fill weak';
        strengthText.className = 'strength-text weak';
        strengthText.textContent = '弱';
    } else if (strength <= 4) {
        strengthBar.className = 'strength-bar-fill medium';
        strengthText.className = 'strength-text medium';
        strengthText.textContent = '中等';
    } else {
        strengthBar.className = 'strength-bar-fill strong';
        strengthText.className = 'strength-text strong';
        strengthText.textContent = '強';
    }
}

/**
 * 更新密碼要求
 */
function updatePasswordRequirements(password) {
    const requirements = {
        'req-length': password.length >= 8,
        'req-uppercase': /[A-Z]/.test(password),
        'req-lowercase': /[a-z]/.test(password),
        'req-number': /[0-9]/.test(password)
    };
    
    for (const [id, valid] of Object.entries(requirements)) {
        const element = document.getElementById(id);
        if (element) {
            if (valid) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        }
    }
}

/**
 * 重置密碼強度指示器
 */
function resetPasswordStrength() {
    const strengthBar = document.querySelector('.strength-bar-fill');
    const strengthText = document.querySelector('.strength-text');
    
    strengthBar.className = 'strength-bar-fill';
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
    
    // 重置要求
    const requirements = document.querySelectorAll('.requirement');
    requirements.forEach(req => req.classList.remove('valid'));
}

/**
 * 切換密碼可見性
 */
window.togglePassword = function(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
};

/**
 * 重置表單
 */
window.resetForm = function() {
    if (confirm('確定要重置表單嗎？所有未儲存的變更將會遺失。')) {
        loadAdminData();
        clearErrors();
    }
};

/**
 * 匯出資料
 */
window.exportData = function() {
    alert('匯出資料功能（開發中）');
};

/**
 * 清除快取
 */
window.clearCache = function() {
    if (confirm('確定要清除快取嗎？')) {
        alert('快取已清除！');
    }
};

/**
 * 刪除帳號
 */
window.deleteAccount = function() {
    const confirmation = prompt('此操作無法復原！請輸入 "DELETE" 確認刪除帳號：');
    if (confirmation === 'DELETE') {
        alert('帳號刪除功能已觸發（模擬）');
    }
};

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
 * 驗證密碼強度
 */
function isStrongPassword(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password);
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
export { currentAdmin, loadAdminData };