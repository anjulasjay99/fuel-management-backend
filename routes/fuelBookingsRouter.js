const router = require("express").Router();
const fuelBooking = require("../models/FuelBookings");

//fetch all feedbacks
router.route("/").get(async (req, res) => {
  await fuelBooking.find()
    .then((data) => {
      res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

//add new complaint
router.route("/").post(async (req, res) => {
  const { email, dateofComplaint, reason, complaintDetails} = req.body;
  
  const newfuelBooking = new fuelBooking({
    email,
    dateofComplaint,
    reason,
    complaintDetails,
  });

  newfuelBooking
    .save()
    .then((data) => {
      res.status(200).json({ status: true, msg: "Success" });
    })
    .then((err) => {
      res.status(400).json({ status: false, error: err });
    });
});

//delete a complaint
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
  
    fuelBooking
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).json("Deleted Successfully!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  });

//update a complaint
router.route("/update/:id").put((req, res) => {
    const id = req.params.id;
    let data = new fuelBooking(req.body);
    fuelBooking
      .findOneAndUpdate(id, {
        email: data.email,
        dateofComplaint: data.dateofComplaint,
        reason: data.reason,
        complaintDetails: data.complaintDetails,
      })
      .then(() => {
        res.status(200).json("Updated Successfully!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error!");
      });
  });

module.exports = router;