import mongoose from "mongoose";
const RouteSchema = new mongoose.Schema({
    routeId :{
        type:Number,
        require:true,
        unique:true
    },
    distanceKm:{
        type:Number,
        require:true
    },
    trafficLevel:{
        type:String,
        enum:["Low","Medium","High"],
        require:true
    },
    baseTimeMinutes:{
        type:Number,
        required:true
    },
   
},
 {timestamps:true}
);

export default mongoose.model("Route",RouteSchema);