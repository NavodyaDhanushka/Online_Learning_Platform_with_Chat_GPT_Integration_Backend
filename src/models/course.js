import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    content: {type:String, required:true},

    instructor: {type:mongoose.Schema.Types.ObjectId,
        ref:"Users", required:true},

    enrolledUsers: [{type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true},]

},{timestamps: true});

export default mongoose.model("Course", courseSchema);