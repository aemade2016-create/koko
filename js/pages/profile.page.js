// Profile Page Logic (Compatible with localStorage)

let currentProfilePicture = null;

// Initialize profile page
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('profile-form')) {
        // Check if user is authenticated
        if (!AppState.user || !AppState.user.isAuthenticated) {
            showToast('Error', 'Please login to view your profile', 'error');
            setTimeout(() => navigateTo('./login.html'), 1500);
            return;
        }

        // Load user profile
        await loadUserProfile();
    }
});

// Load user profile from AppState/localStorage
async function loadUserProfile() {
    try {
        showLoading();

        // Check if user is authenticated
        if (!AppState.user || !AppState.user.isAuthenticated) {
            hideLoading();
            showToast('Error', 'Please login first', 'error');
            setTimeout(() => navigateTo('./login.html'), 1500);
            return;
        }

        const user = AppState.user;

        if (!user || !user.profile) {
            hideLoading();
            showToast('Error', 'User data not found', 'error');
            setTimeout(() => navigateTo('./login.html'), 1500);
            return;
        }

        // Get user data from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = users.find(u => u.id === user.profile.id);

        if (!currentUser) {
            hideLoading();
            showToast('Error', 'User not found', 'error');
            return;
        }

        // Populate form fields
        document.getElementById('full-name').value = currentUser.name || '';
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('phone-number').value = currentUser.phone || '';
        document.getElementById('address').value = currentUser.address || '';
        document.getElementById('city').value = currentUser.city || '';
        document.getElementById('postal-code').value = currentUser.postalCode || '';

        // Update profile picture
        if (currentUser.profilePicture) {
            document.getElementById('profile-picture').src = currentUser.profilePicture;
            currentProfilePicture = currentUser.profilePicture;
        }

        // Update display info
        document.getElementById('profile-name-display').textContent = currentUser.name || 'User';
        document.getElementById('profile-email-display').textContent = currentUser.email || '';
        document.getElementById('profile-points-display').textContent = currentUser.loyaltyPoints || 0;

        hideLoading();
        console.log('✅ Profile loaded successfully');
    } catch (error) {
        console.error('❌ Error loading profile:', error);
        hideLoading();
        showToast('Error', 'Failed to load profile: ' + error.message, 'error');
    }
}

// Handle profile picture change
function handleProfilePictureChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('Error', 'Please select an image file', 'error');
        return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        showToast('Error', 'Image size must be less than 2MB', 'error');
        return;
    }

    // Convert to Base64
    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;

        // Update preview
        document.getElementById('profile-picture').src = base64Image;
        currentProfilePicture = base64Image;

        showToast('Success', 'Profile picture updated. Click Save to apply changes.', 'success');
    };

    reader.onerror = function (error) {
        console.error('Error reading file:', error);
        showToast('Error', 'Failed to read image file', 'error');
    };

    reader.readAsDataURL(file);
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await saveUserProfile();
        });
    }
});

// Save user profile to localStorage
async function saveUserProfile() {
    try {
        showLoading();

        // Get form values
        const fullName = document.getElementById('full-name').value.trim();
        const phoneNumber = document.getElementById('phone-number').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const postalCode = document.getElementById('postal-code').value.trim();

        // Validate required fields
        if (!fullName || !phoneNumber || !address) {
            hideLoading();
            showToast('Error', 'Please fill in all required fields', 'error');
            return;
        }

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === AppState.user.profile.id);

        if (userIndex === -1) {
            hideLoading();
            showToast('Error', 'User not found', 'error');
            return;
        }

        // Update user data
        users[userIndex].name = fullName;
        users[userIndex].phone = phoneNumber;
        users[userIndex].address = address;
        users[userIndex].city = city;
        users[userIndex].postalCode = postalCode;

        // Update profile picture if changed
        if (currentProfilePicture) {
            users[userIndex].profilePicture = currentProfilePicture;
        }

        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Update AppState
        AppState.user.profile.name = fullName;
        AppState.user.profile.phone = phoneNumber;
        AppState.user.profile.address = address;
        AppState.user.profile.city = city;
        AppState.user.profile.postalCode = postalCode;

        if (currentProfilePicture) {
            AppState.user.profile.profilePicture = currentProfilePicture;
        }

        saveStateToStorage();

        // Update display
        document.getElementById('profile-name-display').textContent = fullName;

        hideLoading();
        showToast('Success', 'Profile updated successfully!', 'success');

        console.log('✅ Profile saved successfully');
    } catch (error) {
        console.error('❌ Error saving profile:', error);
        hideLoading();
        showToast('Error', 'Failed to save profile: ' + error.message, 'error');
    }
}

// Change password function
function changePassword() {
    const currentPassword = prompt('Enter your current password:');
    if (!currentPassword) return;

    const newPassword = prompt('Enter your new password:');
    if (!newPassword) return;

    const confirmPassword = prompt('Confirm your new password:');
    if (confirmPassword !== newPassword) {
        showToast('Error', 'Passwords do not match', 'error');
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === AppState.user.profile.id);

    if (userIndex === -1) {
        showToast('Error', 'User not found', 'error');
        return;
    }

    // Verify current password
    if (users[userIndex].password !== currentPassword) {
        showToast('Error', 'Current password is incorrect', 'error');
        return;
    }

    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    showToast('Success', 'Password changed successfully!', 'success');
}

// Delete account function
function deleteAccount() {
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (!confirmation) return;

    const finalConfirmation = prompt('Type "DELETE" to confirm account deletion:');

    if (finalConfirmation !== 'DELETE') {
        showToast('Info', 'Account deletion cancelled', 'info');
        return;
    }

    showLoading();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter(u => u.id !== AppState.user.profile.id);

    // Save updated users list
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    // Clear user data
    AppState.user = {
        isAuthenticated: false,
        role: null,
        profile: {},
        loyaltyPoints: 0,
        orders: []
    };

    // Clear app state
    saveStateToStorage();

    hideLoading();
    showToast('Success', 'Account deleted successfully', 'success');

    // Redirect to home
    setTimeout(() => {
        navigateTo('./index.html');
    }, 2000);
}
