require('dotenv').config();

const express = require("express");
const cors = require('cors');
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

// JSON parser
app.use(express.json());

// Body parser
app.use(express.urlencoded({extended:false}));

app.use(router);
app.use(errorHandler);

module.exports = app;
