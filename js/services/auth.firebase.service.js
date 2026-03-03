// Firebase Authentication Service
// This service integrates Firebase Auth with the existing app

// Login with Firebase
async function loginWithFirebase(email, password) {
    try {
        showLoading();

        // Sign in with Firebase
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Get user data from Firestore
        const userDoc = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();

        let userData = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'User',
            role: 'user',
            loyaltyPoints: 100
        };

        if (userDoc.exists) {
            const firestoreData = userDoc.data();
            userData = {
                ...userData,
                name: firestoreData.fullName || userData.name,
                phone: firestoreData.phoneNumber || '',
                address: firestoreData.address || '',
                city: firestoreData.city || '',
                postalCode: firestoreData.postalCode || '',
                role: firestoreData.role || 'user',
                loyaltyPoints: firestoreData.loyaltyPoints || 100,
                profilePicture: firestoreData.profilePicture || null
            };
        }

        // Update AppState
        AppState.user = userData;
        AppState.isAuthenticated = true;
        saveStateToStorage();

        hideLoading();
        showToast('Success', 'Login successful!', 'success');
        return true;
    } catch (error) {
        hideLoading();
        console.error('Login error:', error);

        let errorMessage = 'Login failed';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address';
        } else if (error.code === 'auth/user-disabled') {
            errorMessage = 'This account has been disabled';
        }

        showToast('Error', errorMessage, 'error');
        return false;
    }
}

// Register with Firebase
async function registerWithFirebase(userData) {
    try {
        showLoading();

        // Create user in Firebase Auth
        const userCredential = await firebase.auth()
            .createUserWithEmailAndPassword(userData.email, userData.password);

        const user = userCredential.user;

        // Update display name
        if (userData.name) {
            await user.updateProfile({
                displayName: userData.name
            });
        }

        // Create user document in Firestore
        await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .set({
                uid: user.uid,
                email: user.email,
                fullName: userData.name || '',
                phoneNumber: userData.phone || '',
                address: userData.address || '',
                city: '',
                postalCode: '',
                role: 'user',
                loyaltyPoints: 100, // Welcome bonus
                profilePicture: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        // Update AppState
        AppState.user = {
            uid: user.uid,
            email: user.email,
            name: userData.name || 'User',
            phone: userData.phone || '',
            address: userData.address || '',
            role: 'user',
            loyaltyPoints: 100
        };
        AppState.isAuthenticated = true;
        saveStateToStorage();

        hideLoading();
        showToast('Success', 'Registration successful! Welcome bonus: 100 points', 'success');
        return true;
    } catch (error) {
        hideLoading();
        console.error('Registration error:', error);

        let errorMessage = 'Registration failed';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Email already registered';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password should be at least 6 characters';
        }

        showToast('Error', errorMessage, 'error');
        return false;
    }
}

// Logout from Firebase
async function logoutFromFirebase() {
    try {
        await firebase.auth().signOut();

        // Clear AppState
        AppState.user = null;
        AppState.isAuthenticated = false;
        saveStateToStorage();

        showToast('Success', 'Logged out successfully', 'success');
        navigateTo('./index.html');
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Error', 'Failed to logout', 'error');
    }
}

// Check Firebase auth state
function checkFirebaseAuth() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in
                try {
                    const userDoc = await firebase.firestore()
                        .collection('users')
                        .doc(user.uid)
                        .get();

                    let userData = {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName || 'User',
                        role: 'user',
                        loyaltyPoints: 100
                    };

                    if (userDoc.exists) {
                        const firestoreData = userDoc.data();
                        userData = {
                            ...userData,
                            name: firestoreData.fullName || userData.name,
                            phone: firestoreData.phoneNumber || '',
                            address: firestoreData.address || '',
                            role: firestoreData.role || 'user',
                            loyaltyPoints: firestoreData.loyaltyPoints || 100
                        };
                    }

                    AppState.user = userData;
                    AppState.isAuthenticated = true;
                    saveStateToStorage();

                    resolve(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    resolve(null);
                }
            } else {
                // User is signed out
                AppState.user = null;
                AppState.isAuthenticated = false;
                saveStateToStorage();
                resolve(null);
            }
        });
    });
}

// Password reset
async function resetPassword(email) {
    try {
        showLoading();
        await firebase.auth().sendPasswordResetEmail(email);
        hideLoading();
        showToast('Success', 'Password reset email sent!', 'success');
        return true;
    } catch (error) {
        hideLoading();
        console.error('Password reset error:', error);

        let errorMessage = 'Failed to send reset email';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address';
        }

        showToast('Error', errorMessage, 'error');
        return false;
    }
}

// Social login (Google)
async function loginWithGoogle() {
    try {
        showLoading();
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        // Check if user document exists
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            // Create new user document
            await userDocRef.set({
                uid: user.uid,
                email: user.email,
                fullName: user.displayName || '',
                phoneNumber: user.phoneNumber || '',
                role: 'user',
                loyaltyPoints: 100,
                profilePicture: user.photoURL || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        hideLoading();
        showToast('Success', 'Logged in with Google!', 'success');
        return true;
    } catch (error) {
        hideLoading();
        console.error('Google login error:', error);
        showToast('Error', 'Failed to login with Google', 'error');
        return false;
    }
}

// Social login (Facebook)
async function loginWithFacebook() {
    try {
        showLoading();
        const provider = new firebase.auth.FacebookAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        // Check if user document exists
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            // Create new user document
            await userDocRef.set({
                uid: user.uid,
                email: user.email,
                fullName: user.displayName || '',
                phoneNumber: user.phoneNumber || '',
                role: 'user',
                loyaltyPoints: 100,
                profilePicture: user.photoURL || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        hideLoading();
        showToast('Success', 'Logged in with Facebook!', 'success');
        return true;
    } catch (error) {
        hideLoading();
        console.error('Facebook login error:', error);
        showToast('Error', 'Failed to login with Facebook', 'error');
        return false;
    }
}
