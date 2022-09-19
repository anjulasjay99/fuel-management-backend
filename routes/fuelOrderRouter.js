const router = require("express").Router();
const FuelOrder = require("../models/FuelOrder");

//fetch all fuel orders
router.route("/:id").get(async (req, res) => {
  const stationId = req.params.id;
  await FuelOrder.find({ stationId })
    .then((data) => {
      res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

//place new fuel order
router.route("/").post(async (req, res) => {
  const { 
    stationId,
    email, 
    type, 
    amount, 
    timeOfDelivery, 
    payment, 
    address, 
    city, 
    contactNo,
    province, 
    zipCode  
  } = req.body;

  const refNo = "FO" + Date.now().toString();
  const status = "In Progress";

  const newOrder = new FuelOrder({
    stationId,
    refNo,
    email,
    type,
    amount,
    timeOfDelivery,
    payment,
    status,
    address, 
    city, 
    province, 
    contactNo,
    zipCode
  });

  newOrder
    .save()
    .then((data) => {
      res.status(200).json({ status: true, msg: "Success" });
    })
    .catch((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

module.exports = router;
