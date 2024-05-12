const DriverPost=require('../models/DriverPost')


module.exports= async (req,res)=>{
    try {
        const userId = req.session.userId;
        const user = await DriverPost.findById(userId);
        if (user) {
            // Render user data
            res.render('gtest',{user,issuccess:false,iserror:false});
        } else {
            // Handle case where no user is found
            res.render('gtest',{ user: null ,isvisible:true,issuccess:false,iserror:false});
        }

    } catch (error) {
        console.log("Error receiving user information", error);
        res.status(500).send("Error receiving user information");
    }

}