const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fuelOrderSchema = new Schema({
  refNo: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: String, required: true },
  timeOfDelivery: { type: String, required: true },
  payment: { type: Number, required: true },
  status: { type: String, required: true },
});

const FuelOrder = mongoose.model("fuelOrder", fuelOrderSchema);

module.exports = FuelOrder;
