import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBbdvpfhWlwIk3YcAisb2QFD_Zg3n7u5Rs",
  authDomain: "manoveda1.firebaseapp.com",
  projectId: "manoveda1",
  storageBucket: "manoveda1.appspot.com",
  messagingSenderId: "948717454300",
  appId: "1:948717454300:web:10a7d0cdb934dff952c519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In
document.getElementById("google-signin").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google Sign-In successful:", user.displayName);
    window.location.href = "index.html"; // Redirect after login
  } catch (error) {
    console.error("Google Sign-In error:", error);
    alert("Google Login failed: " + error.message);
  }
});

// Email/Password Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Email login successful:", user.email);
    window.location.href = "index.html"; // Redirect after login
  } catch (error) {
    console.error("Email login error:", error);
    alert("Login failed: " + error.message);
  }
});

// Monitor auth state
onAuthStateChanged(auth, user => {
  if (user && !window.location.pathname.includes("login.html")) {
    window.location.href = "index.html"; // Redirect if already logged in
  }
});
