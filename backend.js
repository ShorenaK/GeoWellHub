import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("frontend"));

// Health check endpoint to verify the API is working
app.get("/api/health", (req, res) => {
  res.json({ message: "GeoWell Hub API is working" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});