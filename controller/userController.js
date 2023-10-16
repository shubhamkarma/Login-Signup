const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Post = require('../models/postModel')

// Signup api
exports.signup = async(req,res)=>{
    console.log('--------> Signup api called')
    try {
        console.log(req.body)
        let findUser = await User.findOne({username:req.body.username})
        if(findUser){
            console.log('-------> User already found')
            console.log(findUser)
            res.send('User already found, Please login!!')
        }else{
            let hashPassword = await bcrypt.hashSync(req.body.password,10)
            let user = new User({
                username:req.body.username,
                password:hashPassword
            })
            let data = await user.save()
            if(data){
                console.log('--------> New user created')
                console.log(user)
                res.send('Thank you for signup!!!')
            }else{
                res.send('Try Again!!')
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("somthing is wrong")
    }
}

// login api
exports.login = (async(req,res)=>{
    console.log('------> login api called')
    console.log(req.body)
    try {
        let findUser = await User.findOne({username:req.body.username})
        if(findUser){
            bcrypt.compare(req.body.password, findUser.password, function(err, result) {
                if(result){
                    console.log('login successfully')
                    const JWT_SECRET = 'xyz'
                    ACCESS_TOKEN_EXPIRY=1000
                    let username = req.body.username
                    const accessToken = jwt.sign({username},JWT_SECRET, {expiresIn:  `${ACCESS_TOKEN_EXPIRY}s`})
                    res.send({accessToken})
                }else{
                    console.log(err)
                    res.send('Wrong password try again!!')
                }
            });
        }else{
            console.log('User not found, Please signup!!')
            res.send('User not found, Please signup!!')
        } 
        } catch (error) {
            console.log(error)
            res.status(500).send("somthing is wrong")
    }
    
})

// api for get all user with their posts
exports.allUser = ( async(req,res)=>{
    console.log('------> alluser api called')
    try {
        let allUsers = await User.find({role:{$in:['admin','user']}}).populate('posts')
        if(allUsers){
            res.send(allUsers) 
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("somthing is wrong")
    }
})

// api for create a post
exports.createPost = (async(req,res)=>{
    console.log('-----> post api called')
    try {
        let findUser = await User.findOne({username:req.body.username})
        let post = new Post({
            title : req.body.title,
            author : findUser._id
        })
        let savePost = await post.save()
        // console.log(savePost._id)
        res.send(savePost)
    } catch (error) {
        console.log(error)
        res.status(500).send("somthing is wrong")
    }
})

// api for get all posts by a user
exports.postByUser = ( async(req,res)=>{
    console.log('------> Posts api called')
    try {
        let findUser = await User.findOne({username:req.body.username}).populate('posts')
        if(findUser){
            console.log(findUser)
            res.send(findUser)
        }else{
            res.send("somthing is wrong")
        }
    }catch (error) {
        console.log(error)
        res.send("somthing is wrong")
    }
})
