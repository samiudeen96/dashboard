// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from "./config/mongoDB.js";
// import cookieParser from "cookie-parser";
// import passport from "./config/passport.js";
// import authRoute from "./routes/authRoute.js";

// connectDB();

// const app = express();

// // ✅ CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true, // allows cookies
//   })
// );

// // ✅ Body parsers
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Passport initialization (no session)
// app.use(passport.initialize());

// // ✅ Routes
// app.get("/", (req, res) => res.send("API working..."));

// app.use("/api/auth", authRoute);

// // ✅ Start server locally
// export default app; // for Vercel

// // For local dev
// if (process.env.NODE_ENV !== "production") {
//   const port = process.env.PORT || 8000;
//   app.listen(port, () => console.log(`Server running on port ${port}`));
// }

// index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import authRoute from "./routes/authRoute.js";
import connectDB from "./config/mongoDB.js";

// ----------------------
// Express app
// ----------------------
const app = express();

// ✅ CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(cookieParser());

// ✅ Passport initialization (no session)
app.use(passport.initialize());

// ✅ Routes
app.get("/", (req, res) => res.json({ success: true, message: "API working..." }));
app.use("/api/auth", authRoute);

// ----------------------
// Serverless handler for Vercel
// ----------------------
export default async function handler(req, res) {
  try {
    // Connect to DB safely
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error("Serverless function error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}

// ----------------------
// Local development server
// ----------------------
if (process.env.NODE_ENV !== "production") {
  (async () => {
    try {
      await connectDB(); // Ensure DB connected
      const port = process.env.PORT || 8000;
      app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
      console.error("Local server error:", err);
    }
  })();
}
