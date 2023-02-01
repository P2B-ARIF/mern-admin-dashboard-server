import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// const bodyParser = require("body-parser");
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");

import clientRoutes from "'./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// ? CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ? Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes); 

// ? MONGOOSE SETUP
const port = process.env.PORT || 4000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(port, () => console.log(`Server port: ${port}`));
	})
	.catch(err => console.log(err, "did not connect"));

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = "";
// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	serverApi: ServerApiVersion.v1,
// });
// client.connect(err => {
// 	const collection = client.db("test").collection("devices");
// 	// perform actions on the collection object
// 	client.close();
// });
