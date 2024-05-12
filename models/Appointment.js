const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const appointmentSchema=new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isTimeSlotAvailable: {
        type: Boolean,
        default: true
    }
})


const appointmentPost=mongoose.model('appointment',appointmentSchema)
module.exports=appointmentPost;