import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        orderId:{
            type: String,
            require:true,
            unique:true
        },
        value:{
            type:Number,
            require:true,

        },
        assignedRouteId :{
            type:String,
            require:true
        },
        deliveryTImeStamp:{
            type:Date,
            require:true
        }
    },
    {timeseries:true}
)
export default mongoose.model("Order",OrderSchema)