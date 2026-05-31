// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYunJUHvm8IHoh2MthX9Y2mgW3jgXBYck",
  authDomain: "eventus-51ec9.firebaseapp.com",
  projectId: "eventus-51ec9",
  storageBucket: "eventus-51ec9.firebasestorage.app",
  messagingSenderId: "510384270234",
  appId: "1:510384270234:web:b006fc848a6decf10ca823",
  measurementId: "G-705GXE1DV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }