// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'myshop-api-74ec0.firebaseapp.com',
    projectId: 'myshop-api-74ec0',
    storageBucket: 'myshop-api-74ec0.appspot.com',
    messagingSenderId: '522673249473',
    appId: '1:522673249473:web:f751b7733d75ce93d88840',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
