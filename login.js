const SUPABASE_URL = "https://kghafvoigkbcnpsikeow.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaGFmdm9pZ2tiY25wc2lrZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0ODI4OTIsImV4cCI6MjA3NjA1ODg5Mn0.F-b888j82DAx-IIkQacyQnJS1eBXnZdYVL8y_AI50DI";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loginUser() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert("⚠️ Please fill in both fields.");
    return;
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    alert("❌ " + error.message);
    return;
  }

  alert("✅ Welcome back to KrishiMitra!");
  window.location.href = "dashboard.html";
}
// Import the required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMfBvXIEsVl2KhTCj2IvoQtXEnPcAxSuo",
  authDomain: "krishimitra-4bef3.firebaseapp.com",
  projectId: "krishimitra-4bef3",
  storageBucket: "krishimitra-4bef3.appspot.com",
  messagingSenderId: "202184783747",
  appId: "1:202184783747:web:88553ac79caf8b1049e8b6",
  measurementId: "G-Z2HT3FVD2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Google Sign-In
const googleBtn = document.getElementById("google-login");
const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google User:", user);
      alert(`Welcome ${user.displayName}!`);
      // Redirect or handle user session here
      window.location.href = "index.html"; // after login
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
      alert("Google login failed. Try again!");
    });
});
