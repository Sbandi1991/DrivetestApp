const DriverPost = require('../models/DriverPost');
const Appointment = require('../models/Appointment');

// Controller to fetch appointments based on appointment type
module.exports = async (req, res) => {
    try {
        const testType = req.query.testType; // Assuming the appointmentType is passed in the request parameters

        console.log('testType..!!',testType)
        // Find the driver post with the specified appointmentType
        const driverPosts = await DriverPost.find({ appointmentType:testType });
        console.log('driverPost..!!',driverPosts)

        if (!driverPosts) {
            return res.status(404).json({ error: 'Driver post not found for the given appointment type' });
        }

        // Retrieve the appointment using the userId from the driver post
        const appointmentsPromises = driverPosts.map(async (driverPost) => {
            // Extract userId from the driver post
            const userId = driverPost.userId;
        
            try {
                // Find appointments with userId matching the userId of the driver post
                const appointments = await Appointment.find({_id:userId});
                return appointments;
            } catch (error) {
                console.error('Error fetching appointments for user:', userId);
                throw error; // Rethrow the error to be caught later
            }
        });
        console.log('appointmentsPromises..!!',appointmentsPromises)


        if (!appointmentsPromises) {
            return res.status(404).json({ error: 'Appointment not found for the given appointment type' });
        }
        const appointmentsArray = await Promise.all(appointmentsPromises);

        // Flatten the array of arrays of appointments into a single array
        const allAppointments = appointmentsArray.flat();

        if (allAppointments.length === 0) {
            return res.status(404).json({ error: 'Appointments not found for the given appointment type' });
        }
        console.log('allAppointments..!!',allAppointments)

        res.json(allAppointments);

       
      
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
