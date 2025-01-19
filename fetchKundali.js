import fs from  "fs";

const apiUrl = "https://api.prokerala.com/v2/astrology/kundli/advanced";

export async function fetchKundaliDetails(ayanamsa, coordinates, datetime, la, apiKey) {
  try {
    const encodedDatetime = encodeURIComponent(datetime);
    const apiUrlWithParams = `${apiUrl}?ayanamsa=${ayanamsa}&coordinates=${coordinates}&datetime=${encodedDatetime}&la=${la}`;
    
    const response = await fetch(apiUrlWithParams, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // Log and save response for debugging
    console.log("API Response:", JSON.stringify(data, null, 2));
    
    try {
      fs.writeFileSync("kundaliDetails.json", JSON.stringify(data, null, 2));
      console.log("Kundali details saved to kundaliDetails.json");
    } catch (writeError) {
      console.error("Error saving response:", writeError);
    }

    return data;
  } catch (error) {
    console.error("Kundali API Error:", error);
    throw error; // Re-throw to handle in component
  }
}