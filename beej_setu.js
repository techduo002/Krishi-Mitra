// Initialize Supabase client
const SUPABASE_URL = "https://kghafvoigkbcnpsikeow.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaGFmdm9pZ2tiY25wc2lrZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0ODI4OTIsImV4cCI6MjA3NjA1ODg5Mn0.F-b888j82DAx-IIkQacyQnJS1eBXnZdYVL8y_AI50DI";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// 🌾 Handle form submission
document.getElementById("beejForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const farmer_name = document.getElementById("farmer_name").value;
  const location = document.getElementById("location").value;
  const soil_type = document.getElementById("soil_type").value;
  const soil_ph = parseFloat(document.getElementById("soil_ph").value);
  const rainfall = parseFloat(document.getElementById("rainfall").value);

  // 🌾 Get recommendations based on simple logic
  const recommendation = getCropRecommendation(soil_type, soil_ph, rainfall);

  // Store data in Supabase
  const { data, error } = await supabase.from("beej_setu_data").insert([
    {
      farmer_name,
      location,
      soil_type,
      soil_ph,
      rainfall,
      crop_name: recommendation.crop
    }
  ]);

  if (error) {
    alert("Error saving data: " + error.message);
    console.error(error);
    return;
  }

  // Display Recommendations
  document.getElementById("recommendationSection").classList.remove("hidden");
  document.getElementById("cropRecommendation").textContent = recommendation.crop;
  document.getElementById("cost").textContent = recommendation.cost;
  document.getElementById("requirements").textContent = recommendation.requirements;
  document.getElementById("tools").textContent = recommendation.tools;
  document.getElementById("time").textContent = recommendation.time;
});

// 🌾 Crop Recommendation Logic
function getCropRecommendation(soil, ph, rain) {
  let crop, cost, requirements, tools, time;

  if (soil === "loamy" && ph >= 6 && ph <= 7.5 && rain >= 700 && rain <= 1200) {
    crop = "Wheat";
    cost = "₹25,000 - ₹35,000 per acre";
    requirements = "Moderate irrigation, organic manure, fertilizers like urea and DAP";
    tools = "Tractor, seed drill, harrow, thresher";
    time = "4-5 months";
  } else if (soil === "clay" && ph >= 5.5 && rain > 1000) {
    crop = "Rice";
    cost = "₹30,000 - ₹40,000 per acre";
    requirements = "High water availability, nitrogen-rich soil, good drainage";
    tools = "Paddy transplanter, harvester, puddler";
    time = "3-4 months";
  } else if (soil === "sandy" && ph >= 6 && rain < 800) {
    crop = "Groundnut";
    cost = "₹20,000 - ₹25,000 per acre";
    requirements = "Dry climate, well-drained sandy loam soil";
    tools = "Tractor, seed drill, harrow";
    time = "4 months";
  } else if (soil === "black" && ph >= 6.5 && rain >= 700) {
    crop = "Cotton";
    cost = "₹35,000 - ₹45,000 per acre";
    requirements = "Well-drained black soil, moderate rainfall, warm climate";
    tools = "Cotton planter, cultivator, sprayer";
    time = "5-6 months";
  } else if (soil === "red" && ph >= 5.5 && rain >= 500) {
    crop = "Millet (Bajra)";
    cost = "₹15,000 - ₹20,000 per acre";
    requirements = "Low water need, resistant to dry weather";
    tools = "Seeder, hoe, sickle";
    time = "3 months";
  } else {
    crop = "No strong match found — Try soil improvement or irrigation control.";
    cost = "Varies";
    requirements = "Consult local Krishi center for hybrid seeds.";
    tools = "Basic tools depending on crop type.";
    time = "—";
  }

  return { crop, cost, requirements, tools, time };
}
