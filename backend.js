import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Starting GeoWell Hub backend...");

app.listen(PORT, () => {
    console.log(`GeoWell Hub backend is running on port ${PORT}`);
});