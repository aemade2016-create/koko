// Theme Management (Dark/Light Mode)

// Apply theme
window.applyTheme = function (theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    AppState.ui.theme = theme;
    saveStateToStorage();
    console.log('✅ Theme applied:', theme);
}

// Toggle theme
window.toggleTheme = function () {
    console.log('🔄 toggleTheme called, current theme:', AppState.ui.theme);
    const newTheme = AppState.ui.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);

    // Update theme icon in header
    updateThemeIcon(newTheme);

    // Show toast notification
    showToast(newTheme === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

// Update theme icon
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('button[onclick="toggleTheme()"] i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        console.log('✅ Theme icon updated to:', themeIcon.className);
    } else {
        console.warn('⚠️ Theme icon button not found');
    }
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove after 2 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Initialize theme on page load
if (AppState.ui.theme) {
    applyTheme(AppState.ui.theme);
    console.log('🎨 Initial theme loaded:', AppState.ui.theme);
} else {
    // Default to light theme
    applyTheme('light');
    console.log('🎨 Default theme set: light');
}

// Update icon after header is rendered
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing theme icon...');
    setTimeout(() => {
        updateThemeIcon(AppState.ui.theme);
    }, 100);
});

// Remove preload class after page loads to enable transitions
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
    console.log('✅ Page fully loaded, transitions enabled');
});
