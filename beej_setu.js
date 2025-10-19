import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kghafvoigkbcnpsikeow.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY_HERE"; // Replace with your key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" });

  try {
    const { soil_ph, nitrogen, phosphorus, potassium, temperature, rainfall, humidity } = req.body;

    // simple logic for demo (AI model can replace later)
    let recommended_crop = "Wheat";
    if (soil_ph < 6) recommended_crop = "Rice";
    else if (temperature > 30) recommended_crop = "Cotton";
    else if (rainfall > 200) recommended_crop = "Sugarcane";
    else if (humidity > 70) recommended_crop = "Maize";

    // store in Supabase
    const { error } = await supabase
      .from("crop_recommendations")
      .insert([
        {
          soil_ph,
          nitrogen,
          phosphorus,
          potassium,
          temperature,
          rainfall,
          humidity,
          recommended_crop,
        },
      ]);

    if (error) throw error;

    res.status(200).json({ recommended_crop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
