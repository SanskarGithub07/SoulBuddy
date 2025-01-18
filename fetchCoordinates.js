export async function getCoordinatesNominatim(city, state) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${city}&state=${state}&format=json`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            const lat = data[0].lat;
            const lng = data[0].lon;
            return { lat, lng };
        } else {
            throw new Error('No results found for the given city and state');
        }
    } catch (error) {
        console.error('Error fetching geocode data:', error);
    }
}