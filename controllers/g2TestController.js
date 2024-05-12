const DriverPost = require('../models/DriverPost');

module.exports= (req,res)=>{

    const userId = req.session.userId; 
    var time=""
    const data = req.flash('data')[0];

    if(typeof data !="undefined"){
        time=data.time
    }

    DriverPost.findById(userId)
    .then(user => {
        if (user && user.userStatus==='Updated') {
            res.render('g2test',{userDetails:user,issuccess:false,isappsuccess:false,isapperror:false,errors:req.flash('bookAppointmentErrors'),time:time})
        }else{
            res.render('g2test',{userDetails:null,issuccess:false,isappsuccess:false,isapperror:false,errors:req.flash('bookAppointmentErrors'),time:time})
        }
    });
   
}