import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    role:{type:String,
        enum:["student", "instructor"],
        default:"student"},

    enrolledCourse:[
        {type:mongoose.Schema.Types.ObjectId,ref:"course"},
    ],

    createdCourses:[
        {type:mongoose.Schema.Types.ObjectId,ref:"course"}
    ],
},
    {timestamps: true}
);

export default mongoose.model('Users', UserSchema);