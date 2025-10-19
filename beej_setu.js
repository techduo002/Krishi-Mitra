// Initialize Supabase client
const SUPABASE_URL = "https://kghafvoigkbcnpsikeow.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaGFmdm9pZ2tiY25wc2lrZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0ODI4OTIsImV4cCI6MjA3NjA1ODg5Mn0.F-b888j82DAx-IIkQacyQnJS1eBXnZdYVL8y_AI50DI";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle form submit
document.getElementById("beejForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const farmer_name = document.getElementById("farmer_name").value.trim();
  const crop_name = document.getElementById("crop_name").value.trim();
  const soil_ph = parseFloat(document.getElementById("soil_ph").value) || null;
  const soil_type = document.getElementById("soil_type").value;
  const rainfall = parseFloat(document.getElementById("rainfall").value) || null;
  const location = document.getElementById("location").value.trim();
  const status = document.getElementById("status");

  status.textContent = "⏳ Submitting...";
  status.className = "text-blue-600 text-center mt-4";

  // Insert into Supabase
  const { data, error } = await supabase
    .from("beej_setu_data")
    .insert([{ farmer_name, crop_name, soil_ph, soil_type, rainfall, location }]);

  if (error) {
    console.error("❌ Error inserting data:", error);
    status.textContent = "❌ Submission failed: " + error.message;
    status.className = "text-red-600 text-center mt-4";
  } else {
    console.log("✅ Data inserted:", data);
    status.textContent = "✅ Submitted successfully!";
    status.className = "text-green-600 text-center mt-4";
    e.target.reset();
  }
});
