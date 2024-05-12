const DriverPost = require('../models/DriverPost');
const Appointment = require('../models/Appointment');

// Controller to fetch user details based on appointment ID
module.exports = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const appointment = await Appointment.findById(appointmentId);
        
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        const user = await DriverPost.findOne({ userId: appointment._id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

       console.log('user...!!',user)

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            appointmentType:user.appointmentType,
            date:appointment.date,
            time:appointment.time,
            Comment:user.Comment,
            testResult:user.testResult,
            platNumber: user.car_details.platNumber
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
