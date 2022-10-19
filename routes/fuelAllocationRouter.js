const router = require("express").Router();
const FuelAllocation = require("../models/FuelAllocation");

//new fuel allocation
router.route("/").post(async (req, res) => {
  const {
    customerId,
    customerName,
    vehicleNumber,
    allocatedAmount,
    availableAmount,
    startDate,
    endDate,
  } = req.body;

  await FuelAllocation.replaceOne(
    { customerId, vehicleNumber, startDate },
    {
      customerId,
      customerName,
      vehicleNumber,
      allocatedAmount,
      availableAmount,
      startDate,
      endDate,
    },
    { upsert: true }
  )
    .then(() => {
      res.status(200).json({ msg: "Success" });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

//get fuel allocations
router.route("/").get((req, res) => {
  FuelAllocation.find()
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

//get fuel allocations by customer id
router.route("/:id").get((req, res) => {
  const customerId = req.params.id;
  FuelAllocation.find({ customerId })
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

module.exports = router;
