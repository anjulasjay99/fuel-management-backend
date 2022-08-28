const router = require("express").Router();
const FuelOrder = require("../models/FuelOrder");

//fetch all fuel orders
router.route("/").get(async (req, res) => {
  await FuelOrder.find()
    .then((data) => {
      res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

//place new fuel order
router.route("/").post(async (req, res) => {
  const { email, type, amount, timeOfDelivery, payment } = req.body;
  const refNo = "FO" + Date.now().toString();
  const status = "In Progress";

  const newOrder = new FuelOrder({
    refNo,
    email,
    type,
    amount,
    timeOfDelivery,
    payment,
    status,
  });

  newOrder
    .save()
    .then((data) => {
      res.status(200).json({ status: true, msg: "Success" });
    })
    .then((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

module.exports = router;
