const DriverPost = require('../models/DriverPost');
const Appointment = require('../models/Appointment');


module.exports = async (req, res) => {

    const { date, time,Comment,result } = req.body;

    
   console.log('result..!!',result)


    const appointments = await Appointment.find({ date, time });
    

    const userIds = appointments.map(appointment => appointment._id); // Extract userIds from appointments

    

     const driverRecords = await DriverPost.find({ userId: { $in: userIds } });

    if (!driverRecords.length) {
        return res.status(404).json({ error: 'No driver records found for the provided date and time' });
    }

    console.log('driverRecords.....',driverRecords)

    const updatedDriverRecords = await Promise.all(driverRecords.map(async (driverRecord) => {
        driverRecord.Comment = Comment;
        if(result=='pass'){
            driverRecord.testResult=true
        }
        if(result=='fail'){
            driverRecord.testResult=false
        }
        return await driverRecord.save();
    }));

    
    res.redirect('/examiner')

}