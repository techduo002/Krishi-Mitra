// Initialize Supabase with your credentials
const supabaseUrl = 'https://kghafvoigkbcnpsikeow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaGFmdm9pZ2tiY25wc2lrZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0ODI4OTIsImV4cCI6MjA3NjA1ODg5Mn0.F-b888j82DAx-IIkQacyQnJS1eBXnZdYVL8y_AI50DI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Email/Password Sign-In
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
  } else {
    alert('Signed in successfully!');
    // Redirect to dashboard or another page
    window.location.href = 'dashboard.html';
  }
});

// Google Sign-In
document.getElementById('google-signin').addEventListener('click', async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) {
    alert(error.message);
  }
});

