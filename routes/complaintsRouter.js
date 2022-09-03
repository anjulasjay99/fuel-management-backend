const router = require("express").Router();
const complaint = require("../models/complaints");

//fetch all feedbacks
router.route("/").get(async (req, res) => {
  await complaint.find()
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
  
  const newComplaint = new complaint({
    email,
    dateofComplaint,
    reason,
    complaintDetails,
  });

  newComplaint
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
  
    complaint
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
    let data = new complaint(req.body);
    complaint
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