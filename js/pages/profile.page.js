// Profile Page Logic (Compatible with localStorage)

let currentProfilePicture = null;

// Initialize profile page
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('profile-form')) {
        // Check if user is authenticated
        if (!isAuthenticated()) {
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
        if (!AppState.isAuthenticated) {
            hideLoading();
            showToast('Error', 'Please login first', 'error');
            setTimeout(() => navigateTo('./login.html'), 1500);
            return;
        }

        const user = AppState.user;

        if (!user) {
            hideLoading();
            showToast('Error', 'User data not found', 'error');
            setTimeout(() => navigateTo('./login.html'), 1500);
            return;
        }

        // Populate form fields
        document.getElementById('full-name').value = user.name || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone-number').value = user.phone || '';
        document.getElementById('address').value = user.address || '';
        document.getElementById('city').value = user.city || '';
        document.getElementById('postal-code').value = user.postalCode || '';

        // Update profile picture
        if (user.profilePicture) {
            document.getElementById('profile-picture').src = user.profilePicture;
            currentProfilePicture = user.profilePicture;
        }

        // Update display info
        document.getElementById('profile-name-display').textContent = user.name || 'User';
        document.getElementById('profile-email-display').textContent = user.email || '';
        document.getElementById('profile-points-display').textContent = user.loyaltyPoints || 0;

        hideLoading();
        console.log('Profile loaded successfully');
    } catch (error) {
        console.error('Error loading profile:', error);
        hideLoading();
        showToast('Error', 'Failed to load profile', 'error');
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

        // Update AppState
        AppState.user.name = fullName;
        AppState.user.phone = phoneNumber;
        AppState.user.address = address;
        AppState.user.city = city;
        AppState.user.postalCode = postalCode;

        // Update profile picture if changed
        if (currentProfilePicture) {
            AppState.user.profilePicture = currentProfilePicture;
        }

        // Save to localStorage
        saveStateToStorage();

        // Update display
        document.getElementById('profile-name-display').textContent = fullName;

        hideLoading();
        showToast('Success', 'Profile updated successfully!', 'success');

        console.log('Profile saved successfully');
    } catch (error) {
        console.error('Error saving profile:', error);
        hideLoading();
        showToast('Error', 'Failed to save profile', 'error');
    }
}

// Change password function
function changePassword() {
    showToast('Info', 'Password change feature requires Firebase Authentication. Please use the demo credentials.', 'info');
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

    // Clear user data
    AppState.user = null;
    AppState.isAuthenticated = false;

    // Clear localStorage
    localStorage.clear();

    hideLoading();
    showToast('Success', 'Account deleted successfully', 'success');

    // Redirect to home
    setTimeout(() => {
        navigateTo('./index.html');
    }, 2000);
}
