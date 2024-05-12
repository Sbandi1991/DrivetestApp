const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt')
const uniqueValidator=require('mongoose-unique-validator')


const DriverPostSchema=new Schema({
    firstName: { type: String, default: ''},
    lastName: { type: String, default: '' },
    licenseNumber: { type: String, default: '' },
    age: { type: Number, default: 0 },
    dob:{ type: String, default: '' },
    
    userName:{
        type:String,
        required:[true,'Please provide userName'],
        unique:true

    },
    passWord:{
        type:String,
        required:[true,'Please provide password']

    },
    userType:String,
    car_details: {
        make: { type: String, default: '' },
        model: { type: String, default: '' },
        year: { type: Number, default: 0 },
        platNumber: { type: String, default: '' }
    },
    userStatus:{type: String, default: 'Created'},
    userId:{
        type:Schema.Types.ObjectId,
         ref:'Appointment'
    },
    appointmentType: {
        type: String
      },
      Comment:{
        type:String,default: ''
      },
      testResult: {
        type: Boolean 
      },
      adminCheck:{
        type:Boolean,default:false
      }

});

DriverPostSchema.plugin(uniqueValidator);


DriverPostSchema.pre('save', function(next){
    const user=this;

    if (!user.isModified('passWord')) {
        return next();
    }

    bcrypt.hash(user.passWord,10,(error,hash)=>{
     user.passWord=hash
     next()
    })
 })

const DriverPost=mongoose.model('driverpost',DriverPostSchema)
module.exports=DriverPost;




















































































































































































































































































































































































































































        
       