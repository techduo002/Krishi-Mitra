// Replace with your own Supabase credentials
const SUPABASE_URL = "https://kghafvoigkbcnpsikeow.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaGFmdm9pZ2tiY25wc2lrZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0ODI4OTIsImV4cCI6MjA3NjA1ODg5Mn0.F-b888j82DAx-IIkQacyQnJS1eBXnZdYVL8y_AI50DI";

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  responseMsg.style.color = "#fff";
  responseMsg.textContent = "Sending message...";

  if (!name || !email || !message) {
    responseMsg.style.color = "#ffcccb";
    responseMsg.textContent = "⚠️ Please fill out all fields.";
    return;
  }

  try {
    const { error } = await supabaseClient
      .from("contact_messages")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase Error:", error);
      responseMsg.style.color = "#ffcccb";
      responseMsg.textContent = "❌ Error sending message. Try again later.";
    } else {
      responseMsg.style.color = "#baf8ba";
      responseMsg.textContent = "✅ Message sent successfully!";
      form.reset();
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    responseMsg.style.color = "#ffcccb";
    responseMsg.textContent = "❌ Something went wrong.";
  }
});
