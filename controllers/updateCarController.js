const DriverPost=require('../models/DriverPost')


module.exports= async (req, res) => {
    try {
        let licenseNO = req.body.licenseNumber;      
   
        const updatedCarDetails = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            platNumber: req.body.platNumber,
        };

        // Find the user by licenseNumber and update the car details
        const user = await DriverPost.findOneAndUpdate(
            { licenseNumber: String(licenseNO) },
            { $set: { car_details: updatedCarDetails } },
            { new: true }
        );

        if (user) {
            console.log('Car information updated successfully:', user);
            res.render('gtest',{user,issuccess:true,iserror:false}); // Redirect to G_page or another page after update
        } else {
            console.log('User not found or car information not updated.');
            res.status(404).send('User not found or car information not updated.');
        }
    } catch (error) {
        console.error('Error updating car information:', error);
        res.status(500).send('Error updating car information.');
    }
}