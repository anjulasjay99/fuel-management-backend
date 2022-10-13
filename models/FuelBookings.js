const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fuelBookingrSchema = new Schema({
    bookingId: { type: String, required: true },
    stationName: { type: String, required: true },
    stationCity: { type: String, required: true },
    litres: { type: String, required: true },
    fuelType: { type: String, required: true },
    date: { type: Number, required: true },
    vehicleNo: { type: String, required: true },
    vehicleType: { type: String, required: true },
});

const FuelBooking = mongoose.model("fuelbookings", fuelBookingrSchema);

module.exports = FuelBooking;
