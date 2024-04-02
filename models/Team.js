import mongoose,{Schema} from "mongoose";

const TeamSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    users:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]
})

export default mongoose.model("Team",TeamSchema)