const router = require("express").Router();
const FuelAllocation = require("../models/FuelAllocation");

//new fuel allocation
router.route("/").post(async (req, res) => {
  const {
    stationId,
    customerId,
    customerName,
    allocatedAmount,
    startDate,
    endDate,
  } = req.body;

  const newAlloc = new FuelAllocation({
    stationId,
    customerId,
    customerName,
    allocatedAmount,
    startDate,
    endDate,
  });

  await newAlloc
    .save()
    .then(() => {
      res.status(200).json({ msg: "Success" });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

//get fuel allocations by station id
router.route("/:stationId").get((req, res) => {
  const stationId = req.params.stationId;
  FuelAllocation.find({ stationId })
    .then((data) => {
      res.status(200).json({ msg: "Success", data });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error", error });
    });
});

// Get Fuel Allocation by Customer 
router.route("/byCus/:id").get((req,res) =>{
  const id = req.params.id;
  FuelAllocation.find({ customerId : id }).then((data) =>{
    res.status(200).json(data);
  }).catch((err) =>{
    res.status(400).json({msg : "error"});
  })
})

module.exports = router;
