import {fetchDailyHoroscope} from './getHoroscope.js';
import {fetchKundaliDetails} from './fetchKundali.js';
import { fetchChart } from './fetchChart.js';
import { getCoordinatesNominatim } from './fetchCoordinates.js';
const apiKey = "";

const userSign = "virgo"; 
const dateTime = "2025-01-18T15:19:21+05:30"; 
fetchDailyHoroscope(userSign, dateTime, apiKey);

const ayanamsa = 1; 
const coordinates = "10.214747,78.097626"; 
const datetime = "2025-01-18T15:19:21+05:30"; 
const language = "en"; 

fetchKundaliDetails(ayanamsa, coordinates, datetime, language, apiKey);

const la = 'en'; 
const chartType = 'rasi';
const chartStyle = 'north-indian'; 
const format = 'svg'; 

fetchChart(ayanamsa, coordinates, datetime, la, chartType, chartStyle, format, apiKey);

const city = "New York"; 
const state = "NY";      

try {
    const coordinates = await getCoordinatesNominatim(city, state);

    if (coordinates) {
        console.log(`Latitude: ${coordinates.lat}`);
        console.log(`Longitude: ${coordinates.lng}`);
    }
} catch (error) {
    console.error("Error in main function:", error);
}



