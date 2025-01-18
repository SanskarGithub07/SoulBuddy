import {fetchDailyHoroscope} from './getHoroscope.js';
import {fetchKundaliDetails} from './fetchKundali.js';

const apiKey = "";

const userSign = "virgo"; 
const dateTime = "2025-01-18T15:19:21+05:30"; 
fetchDailyHoroscope(userSign, dateTime, apiKey);

const ayanamsa = 1; 
const coordinates = "10.214747,78.097626"; 
const datetime = "2025-01-18T15:19:21+05:30"; 
const language = "en"; 

fetchKundaliDetails(ayanamsa, coordinates, datetime, language, apiKey);
