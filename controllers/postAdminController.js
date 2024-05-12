const DriverPost = require('../models/DriverPost');
const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    const userId = req.params.userId;

    console.log('userId...!!',userId)

    try {

        const user = await DriverPost.findById(userId);
        user.adminCheck=true;
        await user.save();
        console.log('user...!!',user)
        res.redirect('/admin');


    }catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).send("Error booking appointment");
    }



}