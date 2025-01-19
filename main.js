import {fetchDailyHoroscope} from './getHoroscope.js';
import {fetchKundaliDetails} from './fetchKundali.js';
import { fetchChart } from './fetchChart.js';
import { getCoordinatesNominatim } from './fetchCoordinates.js';
const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhMGNjNGQ3NC1hYTQwLTQ5Y2EtOGUwNy0yYWM5ZTE2YTRiMjciLCJqdGkiOiJiMGFlZjdhNTk2NTAwZTk4NTgzMjBmYTdhMjI1MTRlOTI5NGE0NWYzZGZmODQ5YWM1YWRiMjIxNmU1YWU4NTE5MDEwMDY3MjU1NDIyOGNlZiIsImlhdCI6MTczNzIzODc4OS44MTE3MjYsIm5iZiI6MTczNzIzODc4OS44MTE3MjgsImV4cCI6MTczNzI0MjM4OS44MTE2MTcsInN1YiI6IjUyOWQwZWIyLTEwNTAtNDY0My1iZDI3LTc5MGQ4NTdmYjY4YiIsInNjb3BlcyI6W10sImNyZWRpdHNfcmVtYWluaW5nIjozMzksInJhdGVfbGltaXRzIjpbeyJyYXRlIjo1LCJpbnRlcnZhbCI6NjB9XX0.rZtdOd6j7-dLmeLOrFpiaQbdpKz6EEklnyLIAXkIzjtEDczdSZPAK4ZEF6UmAO9fmlv7f2GlwZIQR7jJ2my75JbaL_MThj5ejnThncR-xXPfVrOI-VSKYsnNyZFcJfe9owIAQm322K8g9FmVHAtg5DeIDavk7792mgPklZ8iCj31krmYAv9vsR4MX_noBeHqKXb38ewoVJOxgH2_g3vwcMv1eEKqjPVxiTkJzRGQxVfd4eZPBZPX_RUYiXqAu82AEF978-NJ-AbYfwHlXheixAABjJ2m_8LSaV5xCmKcaZSAT4iKpB-WK76ju9YbguHd2EIy7Ob0Bc6RTH8osoWCtw";

const userSign = "virgo"; 
const dateTime = "2025-01-18T15:19:21+05:30"; 
// fetchDailyHoroscope(userSign, dateTime, apiKey);

const ayanamsa = 1; 
const coordinates = "10.214747,78.097626"; 
const datetime = "2025-01-18T15:19:21+05:30"; 
const language = "en"; 

fetchKundaliDetails(ayanamsa, coordinates, datetime, language, apiKey);

const la = 'en'; 
const chartType = 'rasi';
const chartStyle = 'north-indian'; 
const format = 'svg'; 

// fetchChart(ayanamsa, coordinates, datetime, la, chartType, chartStyle, format, apiKey);

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



