// Global State Management
const AppState = {
    user: {
        isAuthenticated: false,
        role: null,
        profile: {},
        loyaltyPoints: 0,
        orders: []
    },
    cart: {
        items: [],
        total: 0,
        itemCount: 0
    },
    wishlist: {
        items: []
    },
    ui: {
        theme: 'light',
        language: 'en',
        isRTL: false,
        modals: {},
        loading: false
    },
    filters: {
        category: null,
        priceRange: [0, 1000],
        brands: [],
        skinType: [],
        concerns: [],
        sortBy: 'featured'
    },
    products: [],
    categories: []
};

// State subscribers
const stateSubscribers = {};

function subscribe(path, callback) {
    if (!stateSubscribers[path]) stateSubscribers[path] = [];
    stateSubscribers[path].push(callback);
}

function getState(path) {
    const keys = path.split('.');
    let value = AppState;
    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) return null;
    }
    return value;
}

function setState(path, value) {
    const keys = path.split('.');
    let obj = AppState;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;

    if (stateSubscribers[path]) {
        stateSubscribers[path].forEach(cb => cb(value));
    }
    saveStateToStorage();
}

// Save: auth goes to sessionStorage (cleared on browser close), rest to localStorage
function saveStateToStorage() {
    try {
        // Cart, wishlist, ui preferences → persist across sessions
        localStorage.setItem('app_state', JSON.stringify({
            cart: AppState.cart,
            wishlist: AppState.wishlist,
            ui: AppState.ui
        }));
        // Auth → only for current browser session
        sessionStorage.setItem('auth_state', JSON.stringify({
            user: AppState.user
        }));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

// Load state on page init
function loadStateFromStorage() {
    try {
        // Load persistent state
        const saved = localStorage.getItem('app_state');
        if (saved) {
            const state = JSON.parse(saved);
            AppState.cart = state.cart || AppState.cart;
            AppState.wishlist = state.wishlist || AppState.wishlist;
            AppState.ui = state.ui || AppState.ui;
        }
        // Load session auth
        const auth = sessionStorage.getItem('auth_state');
        if (auth) {
            const { user } = JSON.parse(auth);
            if (user?.isAuthenticated) {
                AppState.user = user;
            }
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
}

loadStateFromStorage();
