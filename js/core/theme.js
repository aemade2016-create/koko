// Theme Management (Dark/Light Mode)

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    AppState.ui.theme = theme;
    saveStateToStorage();
}

// Toggle theme
function toggleTheme() {
    const newTheme = AppState.ui.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Initialize theme on page load
if (AppState.ui.theme) {
    applyTheme(AppState.ui.theme);
}
