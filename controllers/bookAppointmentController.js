const DriverPost = require('../models/DriverPost');
const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    const userId = req.session.userId;
    const { date, time } = req.body;
    const testType = req.params.testType;
console.log('testType....',testType)

    try {
        // Find the user by ID
        const user = await DriverPost.findById(userId);
        let existingAppointment={}
        if (!user) {
            console.log("User not found");
        }
     
        // Check if the selected time slot is available
        existingAppointment = await Appointment.findOne({ date, time });
    
        // Update user's appointment date
        if (user.userId) {
            console.log("User already has an appointment booked");
            if(user.firstName===''){
                res.render('g2test', { userDetails: null, issuccess: false, iserror: false,isappsuccess:false,isapperror:true });
            }else{
                res.render('g2test', { userDetails: user, issuccess: false, iserror: false,isappsuccess:false,isapperror:true });

            }
        } else {
        existingAppointment.isTimeSlotAvailable = false;
        await existingAppointment.save();
        user.userId =existingAppointment._id; 
        user.appointmentType=testType;
        await user.save();
        if(user.firstName===''){
        res.render('g2test', { userDetails: null, issuccess: false, iserror: false,isappsuccess:true,isapperror:false });
        }else{
            res.render('g2test', { userDetails: user, issuccess: false, iserror: false,isappsuccess:true,isapperror:false });

        }
        }

       
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).send("Error booking appointment");
    }
};
