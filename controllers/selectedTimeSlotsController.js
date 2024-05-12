const AppointmentPost=require('../models/Appointment')


module.exports= async (req,res)=>{

    try {
        const { date } = req.query;
        const appointments = await AppointmentPost.find({ date: date });
        
        console.log('appointments..!!',appointments)

        res.json(appointments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }



}