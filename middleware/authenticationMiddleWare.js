const DriverPost=require('../models/DriverPost')

module.exports=async (req,res,next)=>{
    try{
    
        if (!req.session.userId || !req.session.userType || req.session.userType !== 'Driver' ) {
            res.redirect('/login'); 
        } else {
            next();
        }
    }
        catch(error){
            console.log("Error recieving blog post",error)
            res.status(500).send("Error recieving blog post")
        }
    
    }