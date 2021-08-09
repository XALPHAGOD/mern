const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.BACKEND_SERVER_PORT || 5000;

const app = express();

app.listen(PORT, console.log(`BACKEND SERVER PORT: ${PORT}`));
