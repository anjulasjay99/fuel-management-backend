const router = require("express").Router();
const Customer = require('../models/Customer');
const QRCode = require('qrcode');



// Fetch customer details

router.route("/:id").get(async(req,res) =>{
    const id = req.params.id;
    await Customer.findById(id).then((customer) =>{
        res.json(customer);
    }).catch((err) =>{
        console.log(err);
    })
});

// Register Customer

router.route("/register").post(async(req,res) =>{
    // Array to store vehicles.
    var vehiclesArr = [];
    var qr_code;
    req.body.vehicles.forEach(function(vehicle){
        var vehicle = {
            vehicleId : "1",
            vehicleType : vehicle.vehicleType,
            vehicleChassis : vehicle.vehicleChassis,
            vehicleNumber : vehicle.vehicleNumber
        }
      
        vehiclesArr.push(vehicle);
    });

    // Generate QR code
        await QRCode.toDataURL(req.body.email).then(url =>{
             qr_code = url;
             console.log(qr_code);
             const customer = new Customer({
                 code : qr_code,
                 name : req.body.name,
                 surname : req.body.surname,
                 email : req.body.email,
                 telNo : req.body.telNo,
                 password : req.body.password,
                 vehicles : vehiclesArr
             });
                 customer.save().then((data) =>{
                 res.status(200).json({msg : "Success"});
             }).catch((err) =>{
                 res.status(400).json({error : err});
             })
        }).catch((err) =>{
            console.log(err);
        });


    // Inserting data to db

})

// Edit Customer - Email can not be updated
router.route("/edit").put(async(req,res) =>{
    const {
        name,
        surname,
        telNo,
        email
    } = req.body;

    await Customer.findOneAndUpdate(
        {email},
        {
            name,
            surname,
            telNo
        }
    ).then((data) =>{
        res.status(200).json({msg : "Success"});
    }).catch((err) =>{
        res.status(400).json({err : "Error"});
    });

});
// Unregister Customer 

router.route("/unregister").delete(async (req,res) =>{
    const { email } = req.body.email;

    await Customer.findOneAndDelete({ email }).then(() =>{
        res.status(200).json({msg : "Success"});
    }).catch((err) =>{
        res.status(400).json({msg : "Error"});
    })
})

// Add Vehicle

// Report 

module.exports = router;