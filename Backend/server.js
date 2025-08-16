import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Allow your frontend's origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://8080-firebase-farmintel-1754904703142.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev',
}));

// Parse JSON bodies
app.use(express.json());

// Proxy for OpenEPI requests
app.post("/proxy", async (req, res) => {
  try {
    const { url, method = "GET", headers = {}, body } = req.body;

    // Call OpenEPI API from server (no CORS restrictions here)
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        // Make sure we forward correct content type
        "Content-Type": headers["Content-Type"] || "application/json"
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
