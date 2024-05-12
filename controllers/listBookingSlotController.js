const AppointmentPost=require('../models/Appointment')

module.exports= async (req,res)=>{
    try {
        // const { date } = req.query;
        const appointments = await AppointmentPost.find({ isTimeSlotAvailable: false }).sort({ date: 1, time: 1 });
        const formattedAppointments = appointments.map(appointment => ({
            id:appointment._id.toString(),
            date: appointment.date.toISOString().split('T')[0], // Only date without time
            time: appointment.time
        }));
        console.log('appointments..!!',appointments)

        res.json(formattedAppointments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
    }