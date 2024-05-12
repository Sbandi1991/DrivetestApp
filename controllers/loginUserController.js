const DriverPost=require('../models/DriverPost')
const bcrypt=require('bcrypt')


module.exports=(req,res)=>{
    const{userName,password}=req.body;

    if (!userName || !password) {
      req.flash('validationErrors', ['Username and password are required']);
      req.flash('data', req.body);
      return res.redirect('/login');
  }
  
    DriverPost.findOne({userName:userName}).then(user=>{
        if(user){
            bcrypt.compare(password,user.passWord,(error,data)=>{
              if(data){
                req.session.userId=user._id;
                req.session.userType=user.userType;
               
                  res.redirect('/')
               
                
              }else{
                res.redirect('/login')
              }
            })
        }else{
            res.redirect('/login')
        }
    }).catch(error=>{
      if (error) {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        return res.redirect('/login');
    }
    })

}