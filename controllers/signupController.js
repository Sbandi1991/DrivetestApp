const DriverPost = require('../models/DriverPost');

module.exports = (req, res) => {
    try {
        // Check if password and confirm password match
        if (req.body.passWord !== req.body.confirmpsw) {
            throw new Error('Password and confirm password do not match');
        }

        const driverPostData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            licenseNumber: req.body.licenseNumber,
            age: req.body.age,
            dob: req.body.dob,
            userName: req.body.userName,
            passWord: req.body.passWord,
            userType: req.body.userType,
            car_details: {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                platNumber: req.body.platNumber,
            },
        };

        DriverPost.create(driverPostData).then(driverpost => {
            console.log("Blog user created", driverpost);
            res.redirect('/login');
        }).catch(error => {
            if (error) {
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
                req.flash('validationErrors', validationErrors);
                req.flash('data', req.body);
                return res.redirect('/login');
            }
        });
    } catch (error) {
        req.flash('validationErrors', [error.message]);
        req.flash('data', req.body);
        return res.redirect('/login');
    }
};
