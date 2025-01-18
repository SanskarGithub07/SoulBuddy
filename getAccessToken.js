const fs = require('fs');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

console.log(clientId, clientSecret);

const tokenUrl = "https://api.prokerala.com/token";

async function getAccessToken() {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    });

    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const accessToken = data.access_token;
    console.log("Access Token:", accessToken);

    fs.writeFileSync('access_token.txt', accessToken, 'utf8');
    console.log('Access token has been written to access_token.txt');

    return accessToken;
  } catch (error) {
    console.error("Failed to get access token:", error);
  }
}

getAccessToken();
