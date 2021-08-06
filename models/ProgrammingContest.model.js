const mongoose = require("mongoose");
const PCSchema = new mongoose.Schema({
    team_name:{
        type:String,
        required:true,
    },
    name_one:{
        type:String,
        required:true,
    },
    name_two:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false,
    },
    institution:{
        type:String,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
    paid:{
        type:Number,
        required:true,
    },
    selected:{
        type:Boolean,
        required:true,
    },
    tshirt_one:{
        type:String,
        required:true,
    },
    tshirt_two:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

const ProgrammingContest = mongoose.model("ProgrammingContest",PCSchema);
module.exports = ProgrammingContest;