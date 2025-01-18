import fs from "fs"

const baseUrl = "https://api.prokerala.com/v2/astrology/chart";

export async function fetchChart(ayanamsa, coordinates, datetime, la, chartType, chartStyle, format, apiKey) {
    try {
      const encodedDateTime = encodeURIComponent(datetime);
      const apiUrl = `${baseUrl}?ayanamsa=${ayanamsa}&coordinates=${coordinates}&datetime=${encodedDateTime}&la=${la}&chart_type=${chartType}&chart_style=${chartStyle}&format=${format}`;
  
      const headers = new Headers({
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "image/svg+xml",
      });
  
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('image/svg+xml')) {
        const svgData = await response.text();
        fs.writeFileSync('chart.svg', svgData);
        console.log('Chart saved as "chart.svg"');
      } else {
        console.error('Unexpected content type:', contentType);
      }
  
    } catch (error) {
      console.error("Failed to fetch Chart:", error);
    }
  }