const DriverPost = require('../models/DriverPost');
const AppointmentPost=require('../models/Appointment')


module.exports = async (req, res) => {

    const userId=req.session.userId;

    try {

        const user = await DriverPost.findById(userId);
        const appointment = await AppointmentPost.findById(user.userId);
        

        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = appointment.date.toLocaleDateString('en-US', options);

        res.render('driverdashboard', { user: user, date:formattedDate, time: appointment.time });
    }catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).send("Error booking appointment");
    }

}