module.exports=(req,res)=>{

    var time=""
    const data = req.flash('data')[0];

    if(typeof data !="undefined"){
        time=data.time
    }

    res.render('appointment',{
        // errors:req.session.validationErrors
        errors: req.flash('appointmentErrors'),
        time:time
        })
}