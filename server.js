// // server.js
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5001;

// // 1️⃣ DEV-ONLY: force CORS before any route
// app.use(cors());

// // 2️⃣ JSON parser (for future POSTs)
// app.use(express.json());

// // 3️⃣ REQUEST LOGGER (optional)
// app.use((req, res, next) => {
//   console.log("🔥 Incoming:", req.method, req.path);
//   next();
// });

// // 4️⃣ Ping sanity check
// app.get("/ping", (req, res) => res.json({ pong: true }));

// // 5️⃣ INLINE TEST /trailers
// app.get("/trailers", (req, res) => {
//   console.log("► Inline GET /trailers hit");
//   return res.json([
//     { title: "Test trailer", url: "#", description: "This works!" },
//   ]);
// });

// // 6️⃣ Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // 7️⃣ Mount your real router (once inline test is confirmed)
// const trailerRoutes = require("./routes/trailers");
// app.use("/trailers", trailerRoutes);

// // 8️⃣ Health‐check
// app.get("/", (req, res) => res.send("🎥 Trailerflix backend is running"));

// app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// 1️⃣ CORS for all origins
app.use(cors());

// 2️⃣ JSON parser
app.use(express.json());

// 3️⃣ Logger
app.use((req, res, next) => {
  console.log("🔥 Incoming:", req.method, req.path);
  next();
});

// 4️⃣ Ping
app.get("/ping", (req, res) => res.json({ pong: true }));

// 5️⃣ Real router
const trailerRoutes = require("./routes/trailers");
app.use("/trailers", trailerRoutes);

// 6️⃣ Health-check root
app.get("/", (req, res) => res.send("🎥 Trailerflix backend is running"));

// 7️⃣ Connect to MongoDB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
