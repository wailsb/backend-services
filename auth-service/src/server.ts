import router from "./v1/app";
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // Load variables from .env
const cors = require("cors");
// v1 api routes
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use("/api/v1", router);

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`api v1 service is running on http://localhost:${PORT}`);
});

