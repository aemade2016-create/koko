// Login Page Logic

function showTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('border-pink-600', 'text-pink-600');
        loginTab.classList.remove('border-transparent', 'text-gray-500');
        registerTab.classList.remove('border-pink-600', 'text-pink-600');
        registerTab.classList.add('border-transparent', 'text-gray-500');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        registerTab.classList.add('border-pink-600', 'text-pink-600');
        registerTab.classList.remove('border-transparent', 'text-gray-500');
        loginTab.classList.remove('border-pink-600', 'text-pink-600');
        loginTab.classList.add('border-transparent', 'text-gray-500');
    }
}

function handleLogin(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (login(email, password)) {
        setTimeout(() => {
            navigateTo('./index.html');
        }, 1000);
    }
}

function handleRegister(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        showToast('Error', 'Passwords do not match', 'error');
        return;
    }

    if (register({ name, email, password })) {
        setTimeout(() => {
            navigateTo('./index.html');
        }, 1000);
    }
}

function socialLogin(provider) {
    // Simulate OAuth flow
    showLoading();

    setTimeout(() => {
        // Create mock authenticated session
        const mockUser = {
            name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
            email: `user@${provider}.com`,
            password: 'oauth_user',
            role: 'user',
            loyaltyPoints: 100,
            orders: [],
            addresses: []
        };

        // Save to state
        AppState.user = mockUser;
        AppState.isAuthenticated = true;
        saveStateToStorage();

        hideLoading();
        showToast('Success', `Logged in with ${provider}!`, 'success');

        // Redirect to home
        setTimeout(() => {
            navigateTo('./index.html');
        }, 1000);
    }, 1500);
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(inputId + '-icon');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showForgotPassword(event) {
    event.preventDefault();
    document.getElementById('forgot-password-modal').classList.remove('hidden');
}

function closeForgotPassword() {
    document.getElementById('forgot-password-modal').classList.add('hidden');
}

function handleForgotPassword(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;

    showLoading();

    // Simulate sending reset email
    setTimeout(() => {
        hideLoading();
        closeForgotPassword();
        showToast('Success', 'Password reset link sent to your email!', 'success');
        form.reset();
    }, 1500);
}

// Check if already logged in
document.addEventListener('DOMContentLoaded', () => {
    if (isAuthenticated() && window.location.pathname.includes('login.html')) {
        navigateTo('./dashboard.html');
    }
});
