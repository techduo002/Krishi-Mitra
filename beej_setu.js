// Initialize Supabase client
const SUPABASE_URL = "https://kghafvoigkbcnpsikeow.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaGFmdm9pZ2tiY25wc2lrZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0ODI4OTIsImV4cCI6MjA3NjA1ODg5Mn0.F-b888j82DAx-IIkQacyQnJS1eBXnZdYVL8y_AI50DI";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Crop data with optimal conditions and details
const crops = [
  {
    name: "Wheat",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy", "Clay", "Sandy"],
    rainfallMin: 500,
    rainfallMax: 1000,
    cost: "Approximately 20,000-30,000 INR per hectare (seeds, fertilizers, labor)",
    requirements: "Well-drained fertile soil, nitrogen-rich fertilizers, moderate irrigation if rainfall is low",
    tools: "Plough, seed drill, harvester, irrigation pumps",
    time: "120-150 days from sowing to harvest",
    other: "Rabi crop, suitable for northern India; high yield in alluvial plains"
  },
  {
    name: "Rice",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Clay", "Loamy", "Silty"],
    rainfallMin: 1500,
    rainfallMax: 3000,
    cost: "Approximately 25,000-40,000 INR per hectare (seeds, fertilizers, water management)",
    requirements: "Flooded fields for initial growth, high water requirement, phosphorus and potassium fertilizers",
    tools: "Plough, transplanter, harvester, irrigation system",
    time: "90-150 days depending on variety",
    other: "Kharif crop, thrives in high humidity areas like eastern and southern India"
  },
  {
    name: "Maize",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Loamy", "Sandy", "Clay"],
    rainfallMin: 500,
    rainfallMax: 800,
    cost: "Approximately 15,000-25,000 INR per hectare",
    requirements: "Well-aerated soil, balanced NPK fertilizers, moderate water",
    tools: "Plough, seed drill, cultivator, harvester",
    time: "90-120 days",
    other: "Grown year-round with irrigation; good for fodder and grain"
  },
  {
    name: "Potato",
    phMin: 5.2,
    phMax: 6.4,
    soilTypes: ["Sandy", "Loamy"],
    rainfallMin: 500,
    rainfallMax: 700,
    cost: "Approximately 30,000-50,000 INR per hectare (seed tubers are expensive)",
    requirements: "Loose soil to allow tuber growth, potash fertilizers, cool climate",
    tools: "Plough, potato planter, digger, storage facilities",
    time: "90-120 days",
    other: "Rabi crop in plains, avoids waterlogging"
  },
  {
    name: "Cotton",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Clay", "Loamy"],
    rainfallMin: 700,
    rainfallMax: 1200,
    cost: "Approximately 20,000-35,000 INR per hectare",
    requirements: "Deep black soil preferred, boron and zinc if deficient, boll protection from pests",
    tools: "Plough, seed drill, picker, ginning machine",
    time: "150-180 days",
    other: "Kharif crop, suitable for central and southern India"
  },
  {
    name: "Sugarcane",
    phMin: 6.5,
    phMax: 7.5,
    soilTypes: ["Loamy", "Clay", "Sandy"],
    rainfallMin: 1500,
    rainfallMax: 2500,
    cost: "Approximately 40,000-60,000 INR per hectare (long duration crop)",
    requirements: "High water and fertilizer input, trash mulching for moisture retention",
    tools: "Plough, sett planter, crusher for juice, irrigation canals",
    time: "12-18 months",
    other: "Tropical crop, major in Uttar Pradesh and Maharashtra"
  }
];

// Function to get recommendations
function getRecommendations(inputs) {
  const recs = [];
  const maxScore = (inputs.soil_ph !== null ? 1 : 0) + (inputs.soil_type ? 1 : 0) + (inputs.rainfall !== null ? 1 : 0);
  
  crops.forEach(crop => {
    let score = 0;
    
    if (inputs.soil_ph !== null) {
      if (inputs.soil_ph >= crop.phMin && inputs.soil_ph <= crop.phMax) {
        score += 1;
      } else if (Math.abs(inputs.soil_ph - crop.phMin) <= 0.5 || Math.abs(inputs.soil_ph - crop.phMax) <= 0.5) {
        score += 0.5; // slight chance if close
      }
    }
    
    if (inputs.soil_type && crop.soilTypes.includes(inputs.soil_type)) {
      score += 1;
    }
    
    if (inputs.rainfall !== null) {
      if (inputs.rainfall >= crop.rainfallMin && inputs.rainfall <= crop.rainfallMax) {
        score += 1;
      } else if (Math.abs(inputs.rainfall - crop.rainfallMin) <= 200 || Math.abs(inputs.rainfall - crop.rainfallMax) <= 200) {
        score += 0.5; // slight chance if close
      }
    }
    
    // Include if score > 0 (slightest chance) or if matches the entered crop name
    const isEnteredCrop = crop.name.toLowerCase() === inputs.crop_name.toLowerCase();
    if (score > 0 || isEnteredCrop) {
      recs.push({ crop: crop.name, score, maxScore, details: crop, isEntered: isEnteredCrop });
    }
  });
  
  // Sort by score descending, prioritize entered crop
  recs.sort((a, b) => {
    if (a.isEntered && !b.isEntered) return -1;
    if (!a.isEntered && b.isEntered) return 1;
    return b.score - a.score;
  });
  
  return recs;
}

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
  const recDiv = document.getElementById("recommendations");

  status.textContent = "⏳ Submitting...";
  status.className = "text-blue-600 text-center mt-4";
  recDiv.innerHTML = ""; // Clear previous recs

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

    // Generate recommendations
    const inputs = { crop_name, soil_ph, soil_type, rainfall };
    const recs = getRecommendations(inputs);

    let recHtml = '<h3 class="text-2xl font-bold text-green-700 mb-4">Crop Recommendations</h3>';
    if (recs.length === 0) {
      recHtml += '<p class="text-gray-600">No suitable crops found based on provided details. Try adjusting your inputs.</p>';
    } else {
      recHtml += '<ul class="space-y-4">';
      recs.forEach(rec => {
        const suitability = rec.maxScore > 0 ? Math.round((rec.score / rec.maxScore) * 100) + '%' : 'N/A';
        recHtml += `
          <li class="p-4 bg-green-100 rounded-lg">
            <h4 class="font-semibold ${rec.isEntered ? 'text-blue-600' : ''}">${rec.crop} ${rec.isEntered ? '(Your Entered Crop)' : ''}</h4>
            <p>Suitability: ${suitability}</p>
            <p>Cost: ${rec.details.cost}</p>
            <p>Requirements: ${rec.details.requirements}</p>
            <p>Tools Required: ${rec.details.tools}</p>
            <p>Time Taken: ${rec.details.time}</p>
            <p>Other Info: ${rec.details.other}</p>
          </li>
        `;
      });
      recHtml += '</ul>';
    }
    recDiv.innerHTML = recHtml;

    e.target.reset();
  }
});
