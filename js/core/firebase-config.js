// Firebase Configuration - Modular SDK v10+
// Import Firebase modules from CDN (will be loaded in HTML)

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCp0DWx6bLazyw607y4KEUNBnHbPJ6NkqM",
    authDomain: "koko-f6efb.firebaseapp.com",
    projectId: "koko-f6efb",
    storageBucket: "koko-f6efb.firebasestorage.app",
    messagingSenderId: "421762945459",
    appId: "1:421762945459:web:fab9be38de3f97bf963bc6",
    measurementId: "G-2SKZRJN1R9"
};

// Initialize Firebase
let app;
let auth;
let db;
let analytics;

// Initialize Firebase services
function initializeFirebase() {
    try {
        // Check if Firebase is loaded
        if (typeof firebase === 'undefined') {
            console.error('Firebase SDK not loaded. Please include Firebase scripts in HTML.');
            return false;
        }

        // Initialize Firebase App
        app = firebase.initializeApp(firebaseConfig);

        // Initialize services
        auth = firebase.auth();
        db = firebase.firestore();

        // Initialize Analytics (optional)
        if (firebase.analytics) {
            analytics = firebase.analytics();
        }

        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return false;
    }
}

// Export for use in other files
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseAnalytics = analytics;
window.initializeFirebase = initializeFirebase;
