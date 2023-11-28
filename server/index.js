const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const categoriesRoute = require("./routes/categoryRoute");
// const productsRoute = require("./routes/productRoute");
mongoose.set("debug", true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
