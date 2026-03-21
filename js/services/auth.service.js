// Authentication Service

// Login
function login(email, password) {
    // Mock authentication
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Check if this is the admin email
        const isAdminEmail = email === 'aemade2016@gmail.com';

        AppState.user = {
            isAuthenticated: true,
            role: isAdminEmail ? 'admin' : (user.role || 'customer'),
            profile: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                address: user.address
            },
            loyaltyPoints: user.loyaltyPoints || 0,
            orders: user.orders || []
        };

        // Update user role in storage if admin
        if (isAdminEmail && user.role !== 'admin') {
            user.role = 'admin';
            localStorage.setItem('users', JSON.stringify(users));
        }

        saveStateToStorage();
        showToast('Success', 'Login successful!', 'success');
        return true;
    } else {
        showToast('Error', 'Invalid email or password', 'error');
        return false;
    }
}

// Register
function register(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
        showToast('Error', 'Email already registered', 'error');
        return false;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        email: userData.email,
        password: userData.password,
        name: userData.name,
        phone: userData.phone || '',
        address: userData.address || '',
        role: 'customer',
        loyaltyPoints: 100, // Welcome bonus
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login
    login(userData.email, userData.password);

    showToast('Success', 'Registration successful! Welcome bonus: 100 points', 'success');
    return true;
}

// Logout
function logout() {
    AppState.user = {
        isAuthenticated: false,
        role: null,
        profile: {},
        loyaltyPoints: 0,
        orders: []
    };

    sessionStorage.removeItem('auth_state');
    saveStateToStorage();
    showToast('Success', 'Logged out successfully', 'success');
    navigateTo('./index.html');
}

// Check if user is authenticated
function isAuthenticated() {
    return AppState.user.isAuthenticated;
}

// Check if user is admin
function isAdmin() {
    return AppState.user.role === 'admin';
}

// Get current user
function getCurrentUser() {
    return AppState.user;
}

// Update user profile
function updateProfile(profileData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === AppState.user.profile.id);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...profileData };
        localStorage.setItem('users', JSON.stringify(users));

        AppState.user.profile = { ...AppState.user.profile, ...profileData };
        saveStateToStorage();

        showToast('Success', 'Profile updated successfully', 'success');
        return true;
    }

    return false;
}

// Add loyalty points
function addLoyaltyPoints(points) {
    AppState.user.loyaltyPoints += points;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === AppState.user.profile.id);

    if (userIndex !== -1) {
        users[userIndex].loyaltyPoints = AppState.user.loyaltyPoints;
        localStorage.setItem('users', JSON.stringify(users));
    }

    saveStateToStorage();
}

// Redeem loyalty points
function redeemLoyaltyPoints(points) {
    if (AppState.user.loyaltyPoints >= points) {
        AppState.user.loyaltyPoints -= points;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === AppState.user.profile.id);

        if (userIndex !== -1) {
            users[userIndex].loyaltyPoints = AppState.user.loyaltyPoints;
            localStorage.setItem('users', JSON.stringify(users));
        }

        saveStateToStorage();
        return true;
    }

    return false;
}

// Initialize admin user if not exists
function initializeAdminUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if admin email exists
    const adminEmail = 'aemade2016@gmail.com';
    let adminUser = users.find(u => u.email === adminEmail);

    if (!adminUser) {
        // Create admin user
        users.push({
            id: 1,
            email: adminEmail,
            password: 'admin123',
            name: 'Admin',
            role: 'admin',
            loyaltyPoints: 0,
            orders: [],
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('users', JSON.stringify(users));
        console.log('✅ Admin user created:', adminEmail);
    } else if (adminUser.role !== 'admin') {
        // Update existing user to admin
        adminUser.role = 'admin';
        localStorage.setItem('users', JSON.stringify(users));
        console.log('✅ User upgraded to admin:', adminEmail);
    }

    // Also create default admin account
    if (!users.find(u => u.email === 'admin@glowbeauty.com')) {
        users.push({
            id: 2,
            email: 'admin@glowbeauty.com',
            password: 'admin123',
            name: 'Admin',
            role: 'admin',
            loyaltyPoints: 0,
            orders: [],
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Initialize on load
initializeAdminUser();
