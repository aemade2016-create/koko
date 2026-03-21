// Theme Management (Dark/Light Mode)

// Apply theme to document
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    AppState.ui.theme = theme;
    // Sync to localStorage directly so it's available before state loads
    localStorage.setItem('theme', theme);
    saveStateToStorage();
}

// Toggle between light and dark
window.toggleTheme = function () {
    const newTheme = AppState.ui.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
}

// Update the moon/sun icon in the header button
function updateThemeIcon(theme) {
    const btn = document.querySelector('button[onclick="toggleTheme()"]');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Apply theme as early as possible to avoid flash of wrong theme
(function () {
    const saved = localStorage.getItem('theme') || AppState?.ui?.theme || 'light';
    if (saved === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    if (AppState?.ui) AppState.ui.theme = saved;
})();

// After DOM + header are ready, sync the icon
document.addEventListener('DOMContentLoaded', () => {
    // Header renders async, wait a tick
    setTimeout(() => updateThemeIcon(AppState.ui.theme), 50);
});

// Remove preload class after page loads to enable transitions
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
});
