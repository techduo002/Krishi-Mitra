// Initialize Supabase client
const SUPABASE_URL = "https://kghafvoigkbcnpsikeow.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaGFmdm9pZ2tiY25wc2lrZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0ODI4OTIsImV4cCI6MjA3NjA1ODg5Mn0.F-b888j82DAx-IIkQacyQnJS1eBXnZdYVL8y_AI50DI";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Expanded crop data with over 30 crops, enhanced details, and sources
const crops = [
  {
    name: "Wheat",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy", "Clay", "Sandy"],
    rainfallMin: 750,
    rainfallMax: 1000,
    cost: "Approximately 50,000-60,000 INR per hectare (seeds, fertilizers, labor)",
    requirements: "Well-drained fertile soil, nitrogen-rich fertilizers, moderate irrigation if rainfall is low, cool climate",
    tools: "Plough, seed drill, harvester, irrigation pumps, cultivator",
    time: "120-150 days from sowing to harvest",
    yield: "4-6 tons per hectare",
    pests: "Aphids, termites, armyworms",
    diseases: "Rust, smut, powdery mildew",
    other: "Rabi crop, suitable for northern India; high yield in alluvial plains",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Wheat"]
  },
  {
    name: "Rice",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Clay", "Loamy", "Silty"],
    rainfallMin: 1500,
    rainfallMax: 3000,
    cost: "Approximately 70,000-80,000 INR per hectare (seeds, fertilizers, water management)",
    requirements: "Flooded fields for initial growth, high water requirement, phosphorus and potassium fertilizers, warm climate",
    tools: "Plough, transplanter, harvester, irrigation system, cono weeder",
    time: "90-150 days depending on variety",
    yield: "5-8 tons per hectare",
    pests: "Stem borer, leaf folder, brown planthopper",
    diseases: "Blast, bacterial blight, sheath blight",
    other: "Kharif crop, thrives in high humidity areas like eastern and southern India",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Rice"]
  },
  {
    name: "Maize",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Loamy", "Sandy", "Clay"],
    rainfallMin: 500,
    rainfallMax: 800,
    cost: "Approximately 60,000 INR per hectare",
    requirements: "Well-aerated soil, balanced NPK fertilizers, moderate water, warm temperatures",
    tools: "Plough, seed drill, cultivator, harvester",
    time: "90-120 days",
    yield: "4-6 tons per hectare",
    pests: "Fall armyworm, stem borer",
    diseases: "Leaf blight, rust",
    other: "Grown year-round with irrigation; good for fodder and grain",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Maize"]
  },
  {
    name: "Potato",
    phMin: 4.8,
    phMax: 6.5,
    soilTypes: ["Sandy", "Loamy"],
    rainfallMin: 500,
    rainfallMax: 700,
    cost: "Approximately 80,000-100,000 INR per hectare (seed tubers expensive)",
    requirements: "Loose soil for tuber growth, potash fertilizers, cool climate, avoids waterlogging",
    tools: "Plough, potato planter, digger, storage facilities",
    time: "90-120 days",
    yield: "20-30 tons per hectare",
    pests: "Aphids, potato tuber moth",
    diseases: "Late blight, black scurf",
    other: "Rabi crop in plains",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Potato"]
  },
  {
    name: "Cotton",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Clay", "Loamy"],
    rainfallMin: 500,
    rainfallMax: 1000,
    cost: "Approximately 75,000 INR per hectare",
    requirements: "Deep black soil preferred, boron and zinc if deficient, boll protection from pests, high temperature",
    tools: "Plough, seed drill, picker, ginning machine",
    time: "150-180 days",
    yield: "2-3 tons per hectare",
    pests: "Bollworm, whitefly",
    diseases: "Leaf spot, wilt",
    other: "Kharif crop, suitable for central and southern India",
    sources: ["https://www.pjtau.edu.in/Cost_Cultivation_Crops.html", "https://en.wikipedia.org/wiki/Cotton"]
  },
  {
    name: "Sugarcane",
    phMin: 6.5,
    phMax: 7.5,
    soilTypes: ["Loamy", "Clay", "Sandy"],
    rainfallMin: 1500,
    rainfallMax: 2500,
    cost: "Approximately 100,000-120,000 INR per hectare (long duration)",
    requirements: "High water and fertilizer input, trash mulching for moisture retention, tropical climate",
    tools: "Plough, sett planter, crusher for juice, irrigation canals",
    time: "12-18 months",
    yield: "80-100 tons per hectare",
    pests: "Borers, pyrilla",
    diseases: "Red rot, wilt",
    other: "Tropical crop, major in Uttar Pradesh and Maharashtra",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Sugarcane"]
  },
  {
    name: "Soybean",
    phMin: 6.0,
    phMax: 7.0,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 400,
    rainfallMax: 700,
    cost: "Approximately 35,000 INR per hectare",
    requirements: "Well-drained soil, rhizobium inoculation, moderate rainfall",
    tools: "Plough, seed drill, harvester",
    time: "90-120 days",
    yield: "2-3 tons per hectare",
    pests: "Pod borer, aphids",
    diseases: "Rust, charcoal rot",
    other: "Kharif crop, oilseed",
    sources: ["https://www.pjtau.edu.in/Cost_Cultivation_Crops.html", "https://en.wikipedia.org/wiki/Soybean"]
  },
  {
    name: "Barley",
    phMin: 6.0,
    phMax: 8.5,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 500,
    rainfallMax: 750,
    cost: "Approximately 40,000 INR per hectare",
    requirements: "Cool climate, fertile soil, nitrogen fertilizers",
    tools: "Plough, seed drill, harvester",
    time: "120-150 days",
    yield: "3-4 tons per hectare",
    pests: "Aphids, armyworm",
    diseases: "Rust, smut",
    other: "Rabi crop, used for malt and fodder",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Barley"]
  },
  {
    name: "Sorghum",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Loamy", "Clay"],
    rainfallMin: 300,
    rainfallMax: 600,
    cost: "Approximately 30,000 INR per hectare",
    requirements: "Drought tolerant, NPK fertilizers, dryland suitable",
    tools: "Plough, seed drill, harvester",
    time: "100-120 days",
    yield: "2-4 tons per hectare",
    pests: "Shoot fly, stem borer",
    diseases: "Grain mould, downy mildew",
    other: "Kharif crop, fodder and grain",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Sorghum"]
  },
  {
    name: "Pearl Millet",
    phMin: 6.0,
    phMax: 7.0,
    soilTypes: ["Sandy", "Loamy"],
    rainfallMin: 350,
    rainfallMax: 750,
    cost: "Approximately 25,000 INR per hectare",
    requirements: "Drought resistant, low fertility tolerance",
    tools: "Plough, seed drill, harvester",
    time: "80-100 days",
    yield: "2-3 tons per hectare",
    pests: "Shoot fly",
    diseases: "Downy mildew",
    other: "Kharif crop, arid regions",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Pearl_millet"]
  },
  // Adding more crops to reach over 30
  {
    name: "Finger Millet",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 500,
    rainfallMax: 1000,
    cost: "Approximately 30,000 INR per hectare",
    requirements: "Organic matter rich soil, moderate fertilizers",
    tools: "Plough, seed drill, harvester",
    time: "90-120 days",
    yield: "1.5-2.5 tons per hectare",
    pests: "Stem borer",
    diseases: "Blast",
    other: "Kharif crop, nutritious",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Finger_millet"]
  },
  {
    name: "Chickpea",
    phMin: 6.0,
    phMax: 8.0,
    soilTypes: ["Loamy", "Clay"],
    rainfallMin: 400,
    rainfallMax: 600,
    cost: "Approximately 30,000 INR per hectare",
    requirements: "Well-drained soil, rhizobium, cool dry climate",
    tools: "Plough, seed drill, harvester",
    time: "140-160 days",
    yield: "1-2 tons per hectare",
    pests: "Pod borer",
    diseases: "Wilt, ascochyta blight",
    other: "Rabi pulse crop",
    sources: ["https://www.pjtau.edu.in/Cost_Cultivation_Crops.html", "https://en.wikipedia.org/wiki/Chickpea"]
  },
  {
    name: "Pigeon Pea",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 600,
    rainfallMax: 1000,
    cost: "Approximately 30,000 INR per hectare",
    requirements: "Deep rooted, drought tolerant, N fixation",
    tools: "Plough, seed drill, harvester",
    time: "150-200 days",
    yield: "1-1.5 tons per hectare",
    pests: "Pod borer, plume moth",
    diseases: "Wilt, sterility mosaic",
    other: "Kharif pulse",
    sources: ["https://www.pjtau.edu.in/Cost_Cultivation_Crops.html", "https://en.wikipedia.org/wiki/Pigeon_pea"]
  },
  {
    name: "Lentil",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 300,
    rainfallMax: 500,
    cost: "Approximately 25,000 INR per hectare",
    requirements: "Cool climate, low water",
    tools: "Plough, seed drill, harvester",
    time: "110-140 days",
    yield: "1-1.5 tons per hectare",
    pests: "Aphids",
    diseases: "Rust, wilt",
    other: "Rabi pulse",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Lentil"]
  },
  {
    name: "Mustard",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 300,
    rainfallMax: 500,
    cost: "Approximately 35,000 INR per hectare",
    requirements: "Cool dry climate, sulfur fertilizers",
    tools: "Plough, seed drill, harvester",
    time: "120-150 days",
    yield: "1-2 tons per hectare",
    pests: "Aphids, sawfly",
    diseases: "White rust, alternaria blight",
    other: "Rabi oilseed",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Mustard_plant"]
  },
  {
    name: "Groundnut",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Sandy", "Loamy"],
    rainfallMin: 500,
    rainfallMax: 750,
    cost: "Approximately 90,000 INR per hectare",
    requirements: "Light soil, gypsum for calcium",
    tools: "Plough, seed drill, digger",
    time: "90-120 days",
    yield: "2-3 tons per hectare",
    pests: "Leaf miner, aphids",
    diseases: "Rust, leaf spot",
    other: "Kharif oilseed",
    sources: ["https://www.pjtau.edu.in/Cost_Cultivation_Crops.html", "https://en.wikipedia.org/wiki/Peanut"]
  },
  {
    name: "Sunflower",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy", "Clay"],
    rainfallMin: 500,
    rainfallMax: 750,
    cost: "Approximately 40,000 INR per hectare",
    requirements: "Well-drained soil, boron",
    tools: "Plough, seed drill, harvester",
    time: "90-110 days",
    yield: "1.5-2.5 tons per hectare",
    pests: "Head moth",
    diseases: "Alternaria, rust",
    other: "Oilseed crop",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Sunflower"]
  },
  {
    name: "Sesame",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Sandy", "Loamy"],
    rainfallMin: 400,
    rainfallMax: 600,
    cost: "Approximately 25,000 INR per hectare",
    requirements: "Drought tolerant, low inputs",
    tools: "Plough, seed drill, harvester",
    time: "90-120 days",
    yield: "0.5-1 ton per hectare",
    pests: "Leaf roller",
    diseases: "Phyllody, root rot",
    other: "Kharif oilseed",
    sources: ["https://www.pjtau.edu.in/Cost_Cultivation_Crops.html", "https://en.wikipedia.org/wiki/Sesame"]
  },
  {
    name: "Tomato",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 600,
    rainfallMax: 800,
    cost: "Approximately 50,000 INR per hectare",
    requirements: "Well-drained soil, staking, high K",
    tools: "Plough, transplanter, harvester",
    time: "90-120 days",
    yield: "20-30 tons per hectare",
    pests: "Fruit borer, whitefly",
    diseases: "Blight, wilt",
    other: "Vegetable crop",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Tomato"]
  },
  {
    name: "Onion",
    phMin: 5.8,
    phMax: 6.5,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 500,
    rainfallMax: 700,
    cost: "Approximately 60,000 INR per hectare",
    requirements: "Bulb formation needs cool weather",
    tools: "Plough, transplanter, digger",
    time: "120-150 days",
    yield: "15-25 tons per hectare",
    pests: "Thrips",
    diseases: "Downy mildew, purple blotch",
    other: "Rabi vegetable",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Onion"]
  },
  {
    name: "Garlic",
    phMin: 5.5,
    phMax: 7.5,
    soilTypes: ["Loamy"],
    rainfallMin: 600,
    rainfallMax: 750,
    cost: "Approximately 70,000 INR per hectare",
    requirements: "Cool climate, well-drained soil",
    tools: "Plough, planter, harvester",
    time: "120-150 days",
    yield: "10-15 tons per hectare",
    pests: "Thrips",
    diseases: "White rot",
    other: "Rabi crop",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Garlic"]
  },
  {
    name: "Brinjal",
    phMin: 5.5,
    phMax: 6.8,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 600,
    rainfallMax: 1000,
    cost: "Approximately 40,000 INR per hectare",
    requirements: "Warm climate, regular watering",
    tools: "Plough, transplanter, harvester",
    time: "90-120 days",
    yield: "20-30 tons per hectare",
    pests: "Fruit borer",
    diseases: "Bacterial wilt",
    other: "Vegetable",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Eggplant"]
  },
  {
    name: "Okra",
    phMin: 6.0,
    phMax: 6.5,
    soilTypes: ["Loamy"],
    rainfallMin: 650,
    rainfallMax: 900,
    cost: "Approximately 30,000 INR per hectare",
    requirements: "Warm season, frequent harvesting",
    tools: "Plough, seed drill, harvester",
    time: "50-60 days to first harvest",
    yield: "10-15 tons per hectare",
    pests: "Jassids, fruit borer",
    diseases: "Yellow vein mosaic",
    other: "Kharif vegetable",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Okra"]
  },
  {
    name: "Cabbage",
    phMin: 6.0,
    phMax: 7.0,
    soilTypes: ["Loamy", "Clay"],
    rainfallMin: 500,
    rainfallMax: 700,
    cost: "Approximately 40,000 INR per hectare",
    requirements: "Cool climate, high humidity",
    tools: "Plough, transplanter, harvester",
    time: "90-120 days",
    yield: "30-40 tons per hectare",
    pests: "Cabbage looper",
    diseases: "Black rot",
    other: "Rabi vegetable",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Cabbage"]
  },
  {
    name: "Cauliflower",
    phMin: 6.0,
    phMax: 7.0,
    soilTypes: ["Loamy"],
    rainfallMin: 500,
    rainfallMax: 700,
    cost: "Approximately 45,000 INR per hectare",
    requirements: "Cool temperatures, boron",
    tools: "Plough, transplanter, harvester",
    time: "90-120 days",
    yield: "20-30 tons per hectare",
    pests: "Aphids",
    diseases: "Club root",
    other: "Rabi vegetable",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Cauliflower"]
  },
  {
    name: "Carrot",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Sandy", "Loamy"],
    rainfallMin: 500,
    rainfallMax: 750,
    cost: "Approximately 50,000 INR per hectare",
    requirements: "Deep loose soil, cool climate",
    tools: "Plough, seed drill, digger",
    time: "90-110 days",
    yield: "20-30 tons per hectare",
    pests: "Carrot fly",
    diseases: "Leaf blight",
    other: "Rabi root crop",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Carrot"]
  },
  {
    name: "Radish",
    phMin: 6.0,
    phMax: 7.0,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 400,
    rainfallMax: 600,
    cost: "Approximately 20,000 INR per hectare",
    requirements: "Quick growing, cool season",
    tools: "Plough, seed drill, harvester",
    time: "40-60 days",
    yield: "15-20 tons per hectare",
    pests: "Flea beetle",
    diseases: "White rust",
    other: "Rabi crop",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Radish"]
  },
  {
    name: "Spinach",
    phMin: 6.0,
    phMax: 7.0,
    soilTypes: ["Loamy"],
    rainfallMin: 300,
    rainfallMax: 500,
    cost: "Approximately 25,000 INR per hectare",
    requirements: "Cool weather, nitrogen rich",
    tools: "Plough, seed drill, harvester",
    time: "40-50 days",
    yield: "10-15 tons per hectare",
    pests: "Leaf miner",
    diseases: "Downy mildew",
    other: "Leafy vegetable",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Spinach"]
  },
  {
    name: "Peas",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 400,
    rainfallMax: 600,
    cost: "Approximately 40,000 INR per hectare",
    requirements: "Cool season, support for vines",
    tools: "Plough, seed drill, harvester",
    time: "60-90 days",
    yield: "5-10 tons per hectare",
    pests: "Pea aphid",
    diseases: "Powdery mildew",
    other: "Rabi pulse/vegetable",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Pea"]
  },
  {
    name: "Beans",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy"],
    rainfallMin: 500,
    rainfallMax: 750,
    cost: "Approximately 35,000 INR per hectare",
    requirements: "Warm season, regular watering",
    tools: "Plough, seed drill, harvester",
    time: "60-80 days",
    yield: "10-15 tons per hectare",
    pests: "Bean beetle",
    diseases: "Rust",
    other: "Vegetable",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Bean"]
  },
  {
    name: "Cucumber",
    phMin: 5.5,
    phMax: 7.0,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 600,
    rainfallMax: 800,
    cost: "Approximately 40,000 INR per hectare",
    requirements: "Warm climate, trellis support",
    tools: "Plough, seed drill, harvester",
    time: "50-70 days",
    yield: "20-30 tons per hectare",
    pests: "Cucumber beetle",
    diseases: "Powdery mildew",
    other: "Vegetable",
    sources: ["https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf", "https://en.wikipedia.org/wiki/Cucumber"]
  },
  {
    name: "Pumpkin",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy"],
    rainfallMin: 500,
    rainfallMax: 700,
    cost: "Approximately 30,000 INR per hectare",
    requirements: "Warm season, space for vines",
    tools: "Plough, seed drill, harvester",
    time: "90-120 days",
    yield: "20-30 tons per hectare",
    pests: "Squash bug",
    diseases: "Powdery mildew",
    other: "Vegetable",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Pumpkin"]
  },
  {
    name: "Watermelon",
    phMin: 5.5,
    phMax: 6.5,
    soilTypes: ["Sandy", "Loamy"],
    rainfallMin: 500,
    rainfallMax: 700,
    cost: "Approximately 35,000 INR per hectare",
    requirements: "Warm climate, sandy soil for drainage",
    tools: "Plough, seed drill, harvester",
    time: "80-100 days",
    yield: "30-40 tons per hectare",
    pests: "Aphids, fruit fly",
    diseases: "Fusarium wilt",
    other: "Summer crop",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Watermelon"]
  },
  {
    name: "Tea",
    phMin: 4.5,
    phMax: 5.5,
    soilTypes: ["Loamy"],
    rainfallMin: 1500,
    rainfallMax: 3000,
    cost: "Approximately 100,000 INR per hectare",
    requirements: "Acidic soil, high rainfall, sloping land",
    tools: "Pruning shears, plucker",
    time: "3-5 years to first harvest, ongoing",
    yield: "1-2 tons per hectare",
    pests: "Tea mosquito bug",
    diseases: "Blister blight",
    other: "Plantation crop",
    sources: ["https://www.agrifarming.in/most-profitable-crops-high-profit-cash-crops-in-india", "https://en.wikipedia.org/wiki/Tea"]
  },
  {
    name: "Coffee",
    phMin: 5.0,
    phMax: 6.0,
    soilTypes: ["Loamy"],
    rainfallMin: 1500,
    rainfallMax: 2500,
    cost: "Approximately 120,000 INR per hectare",
    requirements: "Shaded, well-drained soil, altitude 600-1600m",
    tools: "Pruning tools, picker",
    time: "3-4 years to harvest, ongoing",
    yield: "1-2 tons per hectare",
    pests: "Coffee borer",
    diseases: "Rust",
    other: "Plantation crop",
    sources: ["https://www.jagranjosh.com/general-knowledge/list-of-major-crops-of-india-temperature-rainfall-soil-1473918924-1", "https://en.wikipedia.org/wiki/Coffee"]
  },
  {
    name: "Green Gram",
    phMin: 6.0,
    phMax: 7.5,
    soilTypes: ["Loamy", "Sandy"],
    rainfallMin: 300,
    rainfallMax: 500,
    cost: "Approximately 25,000 INR per hectare",
    requirements: "Short duration, N fixation",
    tools: "Plough, seed drill, harvester",
    time: "60-90 days",
    yield: "0.8-1.2 tons per hectare",
    pests: "Pod borer",
    diseases: "Yellow mosaic",
    other: "Pulse crop",
    sources: ["https://www.pjtau.edu.in/Cost_Cultivation_Crops.html", "https://en.wikipedia.org/wiki/Mung_bean"]
  }
  // You can add even more if needed, but this is over 30
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

    let recHtml = '<h3 class="text-2xl font-bold text-green-700 mb-4">Enhanced Crop Recommendations</h3>';
    if (recs.length === 0) {
      recHtml += '<p class="text-gray-600">No suitable crops found based on provided details. Try adjusting your inputs.</p>';
    } else {
      if (recs[0]) {
        recHtml += `<p class="font-bold text-lg mb-2">Best Recommended Crop: ${recs[0].crop} ${recs[0].isEntered ? '(Your Entered Crop)' : ''}</p>`;
      }
      recHtml += '<ul class="space-y-6">';
      recs.forEach(rec => {
        const suitability = rec.maxScore > 0 ? Math.round((rec.score / rec.maxScore) * 100) + '%' : 'N/A';
        recHtml += `
          <li class="p-6 bg-green-100 rounded-lg shadow-md">
            <h4 class="font-semibold text-xl ${rec.isEntered ? 'text-blue-600' : 'text-green-800'}">${rec.crop} ${rec.isEntered ? '(Your Entered Crop)' : ''}</h4>
            <p class="text-sm text-gray-700">Suitability: ${suitability}</p>
            <p class="text-sm text-gray-700">Cost: ${rec.details.cost}</p>
            <p class="text-sm text-gray-700">Requirements: ${rec.details.requirements}</p>
            <p class="text-sm text-gray-700">Tools Required: ${rec.details.tools}</p>
            <p class="text-sm text-gray-700">Time Taken: ${rec.details.time}</p>
            <p class="text-sm text-gray-700">Expected Yield: ${rec.details.yield}</p>
            <p class="text-sm text-gray-700">Common Pests: ${rec.details.pests}</p>
            <p class="text-sm text-gray-700">Common Diseases: ${rec.details.diseases}</p>
            <p class="text-sm text-gray-700">Other Info: ${rec.details.other}</p>
            <p class="text-sm text-gray-700">Sources for Verification: `;
        rec.details.sources.forEach(source => {
          recHtml += `<a href="${source}" target="_blank" class="text-blue-500 hover:underline mr-2">${source}</a>`;
        });
        recHtml += `</p>
          </li>
        `;
      });
      recHtml += '</ul>';
    }
    recDiv.innerHTML = recHtml;

    e.target.reset();
  }
});
