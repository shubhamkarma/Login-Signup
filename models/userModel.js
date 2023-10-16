const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    password : String,
    role     : String,
},{
    versionKey:false,
    timestamps:true,
    toJSON: { virtuals: true }
})

userSchema.virtual("posts", {
    ref: "Post",
    foreignField: "author",
    localField: "_id"
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
