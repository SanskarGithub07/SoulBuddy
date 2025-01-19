import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import fs from  "fs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', './views');

function truncateToTwoDecimalPlaces(value) {
    return Math.floor(value * 100) / 100;
}

async function getCoordinatesNominatim(city, state) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${city}&state=${state}&format=json`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            let lat = data[0].lat;
            let lng = data[0].lon;

            // Truncate latitude and longitude to 2 decimal places
            lat = truncateToTwoDecimalPlaces(lat);
            lng = truncateToTwoDecimalPlaces(lng);

            // Return latitude and longitude as a string in the format "lat,lng"
            return `${lat},${lng}`;
        } else {
            throw new Error('No results found for the given city and state');
        }
    } catch (error) {
        console.error('Error fetching geocode data:', error);
    }
}

function convertToIST(utcTime) {
    const utcDate = new Date(`1970-01-01T${utcTime}Z`); // Create a Date object from UTC time
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5:30 hours in milliseconds
    const ISTDate = new Date(utcDate.getTime() + ISTOffset); // Adjust to IST by adding offset

    // Format the time to 15:19:21+05:30 format
    const hours = String(ISTDate.getHours()).padStart(2, '0');
    const minutes = String(ISTDate.getMinutes()).padStart(2, '0');
    const seconds = String(ISTDate.getSeconds()).padStart(2, '0');
    const timezoneOffset = "+05:30"; // Fixed IST offset

    return `${hours}:${minutes}:${seconds}${timezoneOffset}`;
}

app.get('/', (req, res) => {
  res.render('index');
});

function getJulianDate(date, time) {
    const [year, month, day] = [
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate()
    ];
    const [hours, minutes] = time.split(':').map(Number);

    let jdYear = year;
    let jdMonth = month;

    if (month <= 2) {
        jdYear -= 1;
        jdMonth += 12;
    }

    const A = Math.floor(jdYear / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (jdYear + 4716)) +
        Math.floor(30.6001 * (jdMonth + 1)) +
        day + B - 1524.5 +
        (hours + minutes / 60) / 24;
}

function calculateMoonLongitude(jd) {
    const D = jd - 2451545.0;

    const L = (218.316 + 13.176396 * D) % 360;
    const M = (134.963 + 13.064993 * D) % 360;
    const F = (93.272 + 13.229350 * D) % 360;

    let moonLongitude =
        L + 6.289 * Math.sin((M * Math.PI) / 180) -
        1.274 * Math.sin((2 * L - M) * Math.PI / 180) +
        0.658 * Math.sin((2 * L) * Math.PI / 180) -
        0.214 * Math.sin((2 * M) * Math.PI / 180);
    
    moonLongitude = (moonLongitude + 360) % 360;

    return moonLongitude;
}

function calculateRashi(birthDate, time) {
    const rashis = [
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces"
      ];
    const birthTime = time;

    if (!birthDate || !birthTime) {
        console.log("Error");
        return;
    }

    const date = new Date(birthDate);
    const julianDate = getJulianDate(date, birthTime);
    let moonLongitude = calculateMoonLongitude(julianDate);

    const ayanamsa = 23.5;
    let siderealLongitude = (moonLongitude - ayanamsa + 360) % 360;

    const rashiIndex = Math.floor(siderealLongitude / 30);
    return rashis[rashiIndex];
}


app.post('/submit', async (req, res) => {
  const { name, dateOfBirth, time, gender, state, city } = req.body;

  const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzMjljZmFiNS0yOTc3LTQzOTQtYmVlZi03ZmJiY2IxMDI0OTEiLCJqdGkiOiJhZTgyMjkzZGIzOTYzNjFjZmM0NjE4Njg4MmI0MjU4OGMyMjQ1MTNiZGE2ZDMyNzAwNTZlOWQ3OTJhZDc5ZGZiMDZmYmM4ZjY1MGFkYjkyZSIsImlhdCI6MTczNzI2NDA1NC40Mzc1ODYsIm5iZiI6MTczNzI2NDA1NC40Mzc1ODgsImV4cCI6MTczNzI2NzY1NC40Mzc0NzgsInN1YiI6IjE1ZmZiOTRiLTY5NDUtNGVlMS04MWQxLWRhMDUzN2Q3N2Q1MSIsInNjb3BlcyI6W10sImNyZWRpdHNfcmVtYWluaW5nIjoxMTk3LCJyYXRlX2xpbWl0cyI6W3sicmF0ZSI6NSwiaW50ZXJ2YWwiOjYwfV19.A4UHPsg9yoPgyd60hjGzBx_RcgDV3fVM6XhVmbJ7DeIZpCR4TmSk0shxRsXatdVaaOdVhFz4otLtRgHSLRAdy7wnCxCMyt5NE1CtFnsfEcYHSJ_GUabYCg2b8blXnAidl0dpOjw2805jTY_-Il243hL4PX5Jg8T2l5o4y3fz3WjfMI7odvX-Gky5TuZ_FYDWVVbUu1TF4caaAzDcfmEk4YeXPAXQDpfggh-SDN-Nf_xii36OXV0boCESXtPWtF3TtWO45p4mvjm0wzOmuedN9AFQS6aCrkbloMoAF3jUadCGYh5uFv5oMA0Hq83InjTYTCQmudT4jPVhZT69_XdTTw'; // Store this in environment variables
  const ayanamsa = '1';
  const coordinates = await getCoordinatesNominatim(city, state);
  const la = 'en';
  const rashi = calculateRashi(dateOfBirth, time);
  console.log(rashi);
  const convertedTime = convertToIST(time);
  const datetime = `${dateOfBirth}T${convertedTime}`;

  try {
    
    const apiUrl = 'https://api.prokerala.com/v2/astrology/kundli/advanced';
    const params = new URLSearchParams({
      ayanamsa,
      coordinates,
      datetime,
      la
    });

    const response = await axios({
      method: 'GET',
      url: `${apiUrl}?${params.toString()}`,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const chartUrl = 'https://api.prokerala.com/v2/astrology/chart';
    const chartParams = new URLSearchParams({
      ayanamsa,
      coordinates,
      datetime,
      la,
      chart_type: 'rasi',
      chart_style: 'north-indian',
      format: 'svg'
    });

    const chartResponse = await axios({
      method: 'GET',
      url: `${chartUrl}?${chartParams.toString()}`,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'image/svg+xml',
      }
    });

    // Save the chart as an SVG file
    const svgData = chartResponse.data;
    fs.writeFileSync('chart.svg', svgData);
    console.log('Chart saved as "chart.svg"');

    const svgBase64 = Buffer.from(svgData).toString('base64');
    const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;
    fs.writeFileSync('imgURL.txt', svgDataUrl);

    // Fetch Daily Horoscope
    const horoscopeUrl = `https://api.prokerala.com/v2/horoscope/daily`;
    const rashiDate = '2025-01-18T00:00:00+05:30';
    const horoscopeParams = new URLSearchParams({
      datetime: rashiDate,
      sign: rashi,
    });

    const horoscopeResponse = await axios({
      method: 'GET',
      url: `${horoscopeUrl}?${horoscopeParams.toString()}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const horoscopePrediction =
      horoscopeResponse.data?.data?.daily_prediction?.prediction || 'No prediction available.';

    // Render result page with all data
    const templateData = {
      userData: { name, dateOfBirth, time, gender, state, city },
      kundaliData: {
        ...response.data,
        chart: svgDataUrl, // Chart image as a data URL
      },
      horoscope: horoscopePrediction, // Add the horoscope prediction
    };

    res.render('result', { data: templateData });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    
    const errorMessage = error.response?.data?.message || 
                        'Error fetching Kundali details. Please try again.';
    
    res.render('error', { error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});