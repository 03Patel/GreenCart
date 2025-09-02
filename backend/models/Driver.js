import mongoose, { Types } from "mongoose";

const DriverSchema = new mongoose.Schema(
{
    name:{
        type:String,
        require:true
    },
    currentShiftHours:{
        type:Number,
        default:0
    },
    past7DayHours:{
        type:[Number],
        default:[]
    },
    fatigueNextDay:{
        type:Boolean,
        default:false
    }

}
)