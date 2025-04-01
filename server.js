const express = require('express');
const axios = require('axios');
const app = express();
const API_KEY = 'AIzaSyCGzyUl2BVFjyZp67Z4OeFsomXHQzKIKM8';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/*
    Backend code for fetching the three nearest bicycle
    repair shops, based on the given user's postcode
    - Makes use of GeoCode and Places API from Google
    - Returns an array of the name and distance from
    each repair shop
*/
app.get('/fetchRepairShops', async (req, res) => {
    const { postcode } = req.query;

    if (!postcode) {
        return res.status(400).json({ error: 'Postcode is required' });
    }

    try {
        const geoRes = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&key=${API_KEY}`);
        const geoData = geoRes.data;

        if (geoData.status !== 'OK' || geoData.results.length === 0) {
            return res.status(400).json({ error: 'Invalid postcode' });
        }

        const { lat, lng } = geoData.results[0].geometry.location;

        const placesRes = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=bicycle_store&key=${API_KEY}`
        );
        const placesData = placesRes.data;

        if (placesData.status !== 'OK' || placesData.results.length === 0) {
            return res.status(400).json({ error: 'No bicycle repair shops found nearby.' });
        }

        const shopsAndLoc = placesData.results.map((shop) => {
            const { name, geometry } = shop;
            const shopLat = geometry.location.lat;
            const shopLng = geometry.location.lng;
            const distance = getDistance(lat, lng, shopLat, shopLng);

            return {
                name,
                distance
            };
        });

        const nearestShops = shopsAndLoc.sort((a, b) => a.distance - b.distance).slice(0, 3);

        res.json({ shops: nearestShops });
    } catch (error) {
        console.error('Error fetching data from Google API:', error);
        res.status(500).json({ error: 'An error occurred while fetching the data.' });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});