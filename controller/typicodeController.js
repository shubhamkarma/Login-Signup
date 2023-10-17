const axios = require('axios')

exports.posts = async(req,res)=>{
        console.log('typicode api called')
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response)=>{
            console.log(response.data)
            res.json(response.data)
        })
        .catch((err)=>{
            console.log(err)
            res.send('somthing is wrong')
        })
}