const AppointmentPost=require('../models/Appointment')

module.exports=(req,res)=>{

     let timeArray;
   
    if (Array.isArray(req.body.time)) {
        timeArray=req.body.time
    }else{
        timeArray = [req.body.time];

    }

    const appointments = timeArray.map(time => ({
        date: req.body.date,
        time: time
    }));

    AppointmentPost.insertMany(appointments).then(appointment => {
        console.log("Blog user created", appointment);
        res.redirect('/');
    }).catch(error => {
        if (error) {
            const appointmentErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('appointmentErrors', appointmentErrors);
            req.flash('data', req.body);
           return res.redirect('/appointment');
        }
    });
    
}