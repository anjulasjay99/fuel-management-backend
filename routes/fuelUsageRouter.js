const router = require("express").Router();
const FuelUsage = require("../models/FuelUsage");
const FuelAllocation = require("../models/FuelAllocation");

router.route("/").post(async (req, res) => {
  const {
    stationId,
    customerName,
    customerId,
    vehicleNumber,
    pumpedAmount,
    startDate,
  } = req.body;

  let availableAmount = 0;

  await FuelAllocation.find({ customerId, vehicleNumber, startDate })
    .then((data) => {
      availableAmount = parseFloat(data[0].availableAmount);
    })
    .catch((err) => {
      console.log(err);
    });

  availableAmount = availableAmount - parseFloat(pumpedAmount);

  await FuelAllocation.findOneAndUpdate(
    { customerId, vehicleNumber, startDate },
    { availableAmount: parseFloat(availableAmount) }
  )
    .then(() => {
      const data = new FuelUsage({
        stationId,
        customerName,
        customerId,
        vehicleNumber,
        pumpedAmount,
        date: new Date().toISOString().split("T")[0],
      });

      data
        .save()
        .then((data) => {
          res.status(200).json({ msg: "Success", data });
        })
        .catch((error) => {
          res.status(400).json({ msg: "Error", error });
        });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

router.route("/:id").get(async (req, res) => {
  const stationId = req.params.id;
  await FuelUsage.find({ stationId })
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

module.exports = router;
