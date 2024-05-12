const DriverPost = require('../models/DriverPost');

module.exports = (req, res) => {
    const userId = req.session.userId; // Assuming userId is stored in the session

    // Find the user by ID
    DriverPost.findById(userId)
        .then(user => {
            if (user) {
                // User found, update the user's details with the provided data
                user.firstName = req.body.firstName || user.firstName;
                user.lastName = req.body.lastName || user.lastName;
                user.licenseNumber = req.body.licenseNumber || user.licenseNumber;
                user.age = req.body.age || user.age;
                user.dob = req.body.dob || user.dob;
                user.car_details.make = req.body.make || user.car_details.make;
                user.car_details.model = req.body.model || user.car_details.model;
                user.car_details.year = req.body.year || user.car_details.year;
                user.car_details.platNumber = req.body.platNumber || user.car_details.platNumber;
                user.userStatus='Updated';
                // user.userId=req.session.userId;
                // Save the updated user details
                return user.save()
                    .then(() => {
                        res.render('g2test', {userDetails:user, issuccess: true, iserror: false,isappsuccess:false,isapperror:false });
                    })
                    .catch(error => {
                        console.error("Error updating user:", error);
                        res.status(500).send("Error updating user");
                    });
            } else {
                // User not found
                console.log("User not found");
                res.status(404).send("User not found");
            }
        })
        .catch(error => {
            console.error("Error finding user:", error);
            res.status(500).send("Error finding user");
        });
};
