require('dotenv').config();

const express = require("express");
const cors = require('cors');
const router = require("./routes");

const delay = require('./middleware/delay');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());

// JSON parser
app.use(express.json());

// Body parser
app.use(express.urlencoded({extended:false}));

// For development only
// app.use(delay);

app.use(router);
app.use(errorHandler);

module.exports = app;