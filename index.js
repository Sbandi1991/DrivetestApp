const express=require('express')
const ejs=require('ejs')
const mongoose = require('mongoose');
const expressSession=require('express-session')
const flash=require('connect-flash')


//Contolerr files
const postUserController = require('./controllers/postUserController');
const getUserContoller = require('./controllers/getUserContoller');
const updateCarController = require('./controllers/updateCarController');
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const g2TestController = require('./controllers/g2TestController');
const gTestController = require('./controllers/gTestController');
const signupController=require('./controllers/signupController');
const loginUserController=require('./controllers/loginUserController');
const logOutController=require('./controllers/logOutController');
const appointmentController=require('./controllers/appointmentController');
const appointmentCreateController=require('./controllers/appointmentCreateController')
const selectedTimeSlotsController=require('./controllers/selectedTimeSlotsController')
const bookAppointmentController=require('./controllers/bookAppointmentController')
const examinerController=require('./controllers/examinerController')
const listBookingSlotController=require('./controllers/listBookingSlotController')
const getUserDetailsContoller=require('./controllers/getUserDetailsContoller')
const getTestContoller=require('./controllers/getTestContoller')
const examinerFormController=require('./controllers/examinerFormController')
const adminController=require('./controllers/adminController')
const driverResultsController=require('./controllers/driverResultsController')
const postAdminController=require('./controllers/postAdminController')
const driverdashboardController=require('./controllers/driverdashboardController')
//conig express
const app = express()


//Middlewares
app.use(express.static('public'))
app.set('view engine','ejs')  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())

//session 
app.use(expressSession({
  secret:'keyboard cat'
}))

global.loggedIn=null;
global.UserType=null;

app.use("*",(req,res,next)=>{
  loggedIn=req.session.userId;
  UserType=req.session.userType;
  next()
})

console.log('loggedIn...!!',loggedIn)
console.log('UserType...!!',UserType)

//Server port
app.listen('5000',()=>{ 
    console.log('App is listening port 5000')
  })

//database connection
mongoose.connect('mongodb+srv://sruthi:sruthi@cluster0.y2rnkyf.mongodb.net/driver_app?retryWrites=true&w=majority')


//customer validation
const validationMiddleWare=require("./middleware/updateCarValidation")
const authenticationMiddleWare=require("./middleware/authenticationMiddleWare")
const appointmentMiddleWare=require("./middleware/appointmentMiddleWare")
const timeSlotMiddleWare=require("./middleware/timeSlotMiddleWare")


//Routes
app.get('/',homeController)

app.get('/login',loginController)

app.get('/g2test',authenticationMiddleWare,g2TestController)

app.get('/gtest',authenticationMiddleWare,getUserContoller)

app.post('/posts/user',postUserController)

//app.get('/get/user',getUserContoller)

app.post('/update/car',validationMiddleWare,updateCarController);

app.post('/signup/user',signupController);

app.post('/login/user',loginUserController);

app.get('/logout',logOutController);

app.get('/appointment',appointmentMiddleWare,appointmentController)


app.post('/create/appointment',appointmentCreateController)

app.get('/gettimeslots',timeSlotMiddleWare,selectedTimeSlotsController)

app.post('/book/appointment/:testType',bookAppointmentController)

app.get('/api/bookings',listBookingSlotController)

app.get('/examiner',examinerController)

app.get('/user-details/:appointmentId', getUserDetailsContoller)

app.get('/api/testtype', getTestContoller)

app.post('/post/examiner',examinerFormController)

app.get('/admin',adminController)

app.get('/api/getdriverresults',driverResultsController)

app.post('/post/admin/:userId',postAdminController)

app.get('/driverdashboard',driverdashboardController)

//for all unregistered routes or request
app.use((req,res)=> res.render('notfound'))