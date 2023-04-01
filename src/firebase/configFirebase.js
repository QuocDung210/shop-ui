// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,
    apiKey: 'AIzaSyBQ4NJ-S0NLBJg_PvfzTVKQG0NRbRG49co',
    authDomain: 'laptopapi-bd15c.firebaseapp.com',
    projectId: 'laptopapi-bd15c',
    storageBucket: 'laptopapi-bd15c.appspot.com',
    messagingSenderId: '176082919287',
    appId: '1:176082919287:web:2cd1c228545cd886a54b72',
    measurementId: 'G-TKQF6H5T82',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
