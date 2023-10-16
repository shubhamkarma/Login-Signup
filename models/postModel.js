const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : String,
    author : {type : mongoose.Types.ObjectId, ref : "User"}
},{
    versionKey:false,
    timestamps:true
})

const Post = mongoose.model('Post',postSchema)

module.exports = Post;