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

  let stationId = "";
  let success = false;
  //generating an unique station id
  while (!success) {
    //generate an id
    stationId =
      "FS" +
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");

    //check if generated id already exists
    await FuelStation.exists({ stationId })
      .then((status) => {
        if (status) {
          success = false;
        } else {
          success = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const newFuelStation = new FuelStation({
    stationId,
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
    stationId,
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
    { stationId },
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
