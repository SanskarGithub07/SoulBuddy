const apiUrl = "https://api.prokerala.com/v2/horoscope/daily";

export async function fetchDailyHoroscope(sign, dateTime, apiKey) {
  try {
    const encodedDateTime = encodeURIComponent(dateTime);

    const headers = new Headers({
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    });

    const response = await fetch(`${apiUrl}?datetime=${encodedDateTime}&sign=${sign}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("API Response:", data);

    if (data && data.data && data.data.daily_prediction && data.data.daily_prediction.prediction) {
      console.log(`Horoscope for ${sign.charAt(0).toUpperCase() + sign.slice(1)}:`);
      console.log(data.data.daily_prediction.prediction);
    } else {
      console.error("Horoscope prediction not found in response.");
    }
  } catch (error) {
    console.error("Failed to fetch horoscope:", error);
  }
}
