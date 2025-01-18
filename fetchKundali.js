const apiUrl = "https://api.prokerala.com/v2/astrology/kundli/advanced";

export async function fetchKundaliDetails(ayanamsa, coordinates, datetime, la, apiKey) {
    try {
      const encodedDatetime = encodeURIComponent(datetime);

      const apiUrlWithParams = `${apiUrl}?ayanamsa=${ayanamsa}&coordinates=${coordinates}&datetime=${encodedDatetime}&la=${la}`;
  
      const headers = new Headers({
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      });
  
      const response = await fetch(apiUrlWithParams, {
        method: "GET",
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();

      console.log("Actual Data: ", data);
  
    //   console.log("Kundali API Response Pretty: ", JSON.stringify(data, null, 2));  

    // if (data && data.data) {
    //   const kundaliDetails = data.data;
    //   console.log("Nakshatra Details:", JSON.stringify(kundaliDetails.nakshatra_details, null, 2));
    //   console.log("Mangal Dosha:", JSON.stringify(kundaliDetails.mangal_dosha, null, 2));
    //   console.log("Yoga Details:", JSON.stringify(kundaliDetails.yoga_details, null, 2));
    //   console.log("Dasha Periods:", JSON.stringify(kundaliDetails.dasha_periods, null, 2));
    //   console.log("Dasha Balance:", JSON.stringify(kundaliDetails.dasha_balance, null, 2));
    // } else {
    //   console.error("Kundali details not found in response.");
    // }
  } catch (error) {
    console.error("Failed to fetch Kundali details:", error);
  }
}