const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UnregisteredStationSchema = new Schema({
  statioId: { type: String, required: true },
  stationNmae: { type: String, required: true },
  reason: { type: String, required: true },
});

const UnregisteredStation = mongoose.model(
  "UnregisteredStation",
  UnregisteredStationSchema
);

module.exports = UnregisteredStation;
