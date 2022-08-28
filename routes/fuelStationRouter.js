const router = require("express").Router();
let FuelStation = require("../models/FuelStation");

//check if email already exists
router.route("/checkEmail").post(async (req, res) => {
  const { email } = req.body;

  await FuelStation.exists({ email })
    .then((data) => {
      if (data) {
        res.status(200).json({ status: true });
      } else {
        res.status(200).json({ status: false });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

//register fuel station
router.route("/register").post(async (req, res) => {
  const {
    email,
    password,
    stationName,
    type,
    address,
    city,
    province,
    zipCode,
    contactNo,
    ownerName,
    ownerNic,
    ownerContactNo,
    ownerEmail,
  } = req.body;

  const newFuelStation = new FuelStation({
    email,
    password,
    stationName,
    type,
    address,
    city,
    province,
    zipCode,
    contactNo,
    ownerName,
    ownerNic,
    ownerContactNo,
    ownerEmail,
  });

  await newFuelStation
    .save()
    .then((data) => {
      res.json({ status: true, msg: "Success" });
    })
    .catch((err) => {
      res.json({ status: false, error: err });
    });
});

//update fuel station
router.route("/").put(async (req, res) => {
  const {
    email,
    password,
    stationName,
    type,
    address,
    city,
    province,
    zipCode,
    contactNo,
    ownerName,
    ownerNic,
    ownerContactNo,
    ownerEmail,
  } = req.body;

  await FuelStation.findOneAndUpdate(
    { email },
    {
      email,
      password,
      stationName,
      type,
      address,
      city,
      province,
      zipCode,
      contactNo,
      ownerName,
      ownerNic,
      ownerContactNo,
      ownerEmail,
    }
  )
    .then((data) => {
      res.status(200).json({ status: true, msg: "Success" });
    })
    .catch((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

//delete fuel station
router.route("/").delete(async (req, res) => {
  const { email } = req.body;

  await FuelStation.findOneAndRemove({ email })
    .then((data) => {
      res.status(200).json({ status: true, msg: "Success" });
    })
    .catch((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

module.exports = router;
