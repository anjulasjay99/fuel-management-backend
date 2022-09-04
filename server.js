const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fuelStationRouter = require("./routes/fuelStationRouter");
const fuelOrderRouter = require("./routes/fuelOrderRouter");
const complaintRouter = require("./routes/complaintsRouter");
const unregisteredStationRouter = require("./routes/unregisteredStationRouter");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //  useCreateIndex: true,
  //  useNewUrlParser: true,
  useUnifiedTopology: true,
  //  useFindAndModify: false,
});

//routers
app.use("/fuelStations", fuelStationRouter);
app.use("/fuelOrders", fuelOrderRouter);
app.use("/complaints", complaintRouter);
app.use("/unregisterStation", unregisteredStationRouter);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

module.exports = app;
