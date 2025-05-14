const express = require("express");
const router = express.Router();
const Trailer = require("../models/Trailer");

// GET all trailers
router.get("/", async (req, res) => {
  try {
    const trailers = await Trailer.find();
    res.json(trailers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trailers" });
  }
});

// POST a new trailer (for future use)
router.post("/", async (req, res) => {
  const { title, description, url } = req.body;
  try {
    const trailer = new Trailer({ title, description, url });
    await trailer.save();
    res.status(201).json(trailer);
  } catch (err) {
    res.status(400).json({ error: "Failed to save trailer" });
  }
});

module.exports = router;
