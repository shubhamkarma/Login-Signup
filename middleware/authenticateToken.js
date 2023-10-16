const jwt = require('jsonwebtoken')

const authentication = (req,res,next)=>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.sendStatus(401)
    }
    // console.log('auth')
    const JWT_SECRET = 'xyz'
    jwt.verify(token, JWT_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        next()
    })
}



module.exports = authentication