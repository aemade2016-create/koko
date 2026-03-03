// Profile Page Logic with Firebase Integration

let currentUser = null;
let currentProfilePicture = null;

// Initialize Firebase when page loads
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('profile-form')) {
        // Initialize Firebase
        const firebaseInitialized = initializeFirebase();

        if (!firebaseInitialized) {
            showToast('Error', 'Failed to initialize Firebase', 'error');
            return;
        }

        // Check authentication
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                currentUser = user;
                await loadUserProfile();
            } else {
                // Not authenticated, redirect to login
                showToast('Error', 'Please login to view your profile', 'error');
                setTimeout(() => navigateTo('./login.html'), 1500);
            }
        });
    }
});

// Load user profile from Firestore
async function loadUserProfile() {
    if (!currentUser) {
        console.error('No user logged in');
        return;
    }

    try {
        showLoading();

        // Get user document from Firestore
        const userDoc = await firebase.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

        if (userDoc.exists) {
            const userData = userDoc.data();

            // Populate form fields
            document.getElementById('full-name').value = userData.fullName || '';
            document.getElementById('email').value = currentUser.email || '';
            document.getElementById('phone-number').value = userData.phoneNumber || '';
            document.getElementById('address').value = userData.address || '';
            document.getElementById('city').value = userData.city || '';
            document.getElementById('postal-code').value = userData.postalCode || '';

            // Update profile picture
            if (userData.profilePicture) {
                document.getElementById('profile-picture').src = userData.profilePicture;
                currentProfilePicture = userData.profilePicture;
            }

            // Update display info
            document.getElementById('profile-name-display').textContent = userData.fullName || 'User';
            document.getElementById('profile-email-display').textContent = currentUser.email || '';
            document.getElementById('profile-points-display').textContent = userData.loyaltyPoints || 0;

            console.log('Profile loaded successfully');
        } else {
            // First time user - create default profile
            console.log('Creating default profile for new user');
            document.getElementById('email').value = currentUser.email || '';
            document.getElementById('profile-email-display').textContent = currentUser.email || '';
            document.getElementById('profile-name-display').textContent = 'New User';
        }

        hideLoading();
    } catch (error) {
        console.error('Error loading profile:', error);
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

// Save user profile to Firestore
async function saveUserProfile() {
    if (!currentUser) {
        showToast('Error', 'No user logged in', 'error');
        return;
    }

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

        // Prepare user data
        const userData = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            postalCode: postalCode,
            email: currentUser.email,
            uid: currentUser.uid,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Add profile picture if changed
        if (currentProfilePicture) {
            userData.profilePicture = currentProfilePicture;
        }

        // Check if document exists
        const userDocRef = firebase.firestore().collection('users').doc(currentUser.uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
            // Update existing document
            await userDocRef.update(userData);
        } else {
            // Create new document with default values
            userData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            userData.loyaltyPoints = 100; // Welcome bonus
            userData.role = 'user';
            userData.orders = [];

            await userDocRef.set(userData);
        }

        // Update display
        document.getElementById('profile-name-display').textContent = fullName;

        // Update local state if using localStorage
        if (AppState && AppState.user) {
            AppState.user.name = fullName;
            AppState.user.phone = phoneNumber;
            AppState.user.address = address;
            AppState.user.city = city;
            AppState.user.postalCode = postalCode;
            saveStateToStorage();
        }

        hideLoading();
        showToast('Success', 'Profile updated successfully!', 'success');

        console.log('Profile saved successfully');
    } catch (error) {
        console.error('Error saving profile:', error);
        hideLoading();
        showToast('Error', 'Failed to save profile: ' + error.message, 'error');
    }
}

// Change password function
function changePassword() {
    if (!currentUser) {
        showToast('Error', 'No user logged in', 'error');
        return;
    }

    const newPassword = prompt('Enter your new password (minimum 6 characters):');

    if (!newPassword) return;

    if (newPassword.length < 6) {
        showToast('Error', 'Password must be at least 6 characters', 'error');
        return;
    }

    showLoading();

    currentUser.updatePassword(newPassword)
        .then(() => {
            hideLoading();
            showToast('Success', 'Password updated successfully!', 'success');
        })
        .catch((error) => {
            hideLoading();
            console.error('Error updating password:', error);

            if (error.code === 'auth/requires-recent-login') {
                showToast('Error', 'Please logout and login again to change password', 'error');
            } else {
                showToast('Error', 'Failed to update password: ' + error.message, 'error');
            }
        });
}

// Delete account function
function deleteAccount() {
    if (!currentUser) {
        showToast('Error', 'No user logged in', 'error');
        return;
    }

    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (!confirmation) return;

    const finalConfirmation = prompt('Type "DELETE" to confirm account deletion:');

    if (finalConfirmation !== 'DELETE') {
        showToast('Info', 'Account deletion cancelled', 'info');
        return;
    }

    showLoading();

    // Delete user document from Firestore
    firebase.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .delete()
        .then(() => {
            // Delete Firebase Auth account
            return currentUser.delete();
        })
        .then(() => {
            hideLoading();
            showToast('Success', 'Account deleted successfully', 'success');

            // Clear local storage
            localStorage.clear();

            // Redirect to home
            setTimeout(() => {
                window.location.href = './index.html';
            }, 2000);
        })
        .catch((error) => {
            hideLoading();
            console.error('Error deleting account:', error);

            if (error.code === 'auth/requires-recent-login') {
                showToast('Error', 'Please logout and login again to delete account', 'error');
            } else {
                showToast('Error', 'Failed to delete account: ' + error.message, 'error');
            }
        });
}

// Logout function
function logout() {
    firebase.auth().signOut()
        .then(() => {
            // Clear local storage
            if (typeof AppState !== 'undefined') {
                AppState.user = null;
                AppState.isAuthenticated = false;
                saveStateToStorage();
            }

            showToast('Success', 'Logged out successfully', 'success');
            setTimeout(() => navigateTo('./index.html'), 1000);
        })
        .catch((error) => {
            console.error('Error logging out:', error);
            showToast('Error', 'Failed to logout: ' + error.message, 'error');
        });
}
