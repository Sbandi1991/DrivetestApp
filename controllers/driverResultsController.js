const DriverPost = require('../models/DriverPost');

module.exports= async (req,res)=>{
    const testType = req.query.testType;
    console.log('testType..!!',testType)

    const driverPosts = await DriverPost.find({ appointmentType:testType});

    const filteredDriverPosts = driverPosts.filter(post => post.testResult === true || post.testResult === false);

    console.log('driverPosts..!!',filteredDriverPosts)
    res.json(filteredDriverPosts);

    
    }