// Main Application File

// Toast Notification System
function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast bg-white dark:bg-gray-700 rounded-lg shadow-2xl p-4 min-w-[300px] max-w-md`;

    const colors = {
        success: 'text-green-600',
        error: 'text-red-600',
        info: 'text-blue-600',
        warning: 'text-yellow-600'
    };

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    toast.innerHTML = `
        <div class="flex items-start">
            <i class="fas ${icons[type]} ${colors[type]} text-2xl mr-3"></i>
            <div class="flex-1">
                <h4 class="font-bold text-gray-900 dark:text-white">${title}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600 ml-4">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Loading Spinner
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) loading.remove();
}

// Modal System
function showModal(title, content, buttons = []) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] modal-overlay';

    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between p-6 border-b dark:border-gray-700">
                <h3 class="text-2xl font-bold">${title}</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-2xl text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6">
                ${content}
            </div>
            ${buttons.length > 0 ? `
                <div class="flex items-center justify-end gap-4 p-6 border-t dark:border-gray-700">
                    ${buttons.map(btn => `
                        <button onclick="${btn.action}" class="${btn.class || 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-6 py-2 rounded-lg font-semibold transition">
                            ${btn.text}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;

    document.body.appendChild(modal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Format currency
function formatCurrency(amount) {
    return `${amount.toFixed(2)} ${t('common.egp')}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(AppState.ui.language === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add scroll to top button
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'fixed bottom-24 left-6 bg-pink-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-pink-700 transition z-40 hidden';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.onclick = scrollToTop;
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.remove('hidden');
        } else {
            button.classList.add('hidden');
        }
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Update cart badge
    updateCartBadge();

    // Initialize lazy loading
    initLazyLoading();

    // Add scroll to top button
    addScrollToTopButton();

    // Update translations
    updatePageTranslations();

    console.log('Glow Beauty App Initialized');
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refresh cart badge when page becomes visible
        updateCartBadge();
    }
});
