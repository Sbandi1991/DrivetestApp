module.exports=(req,res,next)=>{

    const driverData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        licenseNumber: req.body.licenseNumber,
        age: req.body.age,
        dob: req.body.dob,
        car_details: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            platNumber: req.body.platNumber,
        },
    };

    if ( !req.body.make || !req.body.model || !req.body.year || !req.body.platNumber) {

        return res.render('gtest',{user:driverData,issuccess:false,iserror:true});
    }

    console.log('Custom middleware called')
    next()
}
