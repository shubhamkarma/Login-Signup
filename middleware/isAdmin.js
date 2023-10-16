
const User = require('../models/userModel')

const isAdmin = async(req,res,next)=>{
    let username = req.body.username
    let findUser = await User.findOne({username:username})
    
    if(findUser.role == 'admin'){
        console.log(findUser.role)
        next()
    }else{
        return res.sendStatus(401)
    }
}

module.exports = isAdmin