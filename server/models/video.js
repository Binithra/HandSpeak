const mongoose=require("mongoose");

const videoSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,

        },
        imageURL:{
            type:String,
            required:true,
        },

        videoURL:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,

        },

    },
    {timestamps:true}
);

module.exports=mongoose.model("video",videoSchema);