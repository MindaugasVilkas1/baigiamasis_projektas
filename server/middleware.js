import 'dotenv/config'
import jwt from 'jsonwebtoken'

let isAuthed = (req, res, next)=>{
   if(req.headers ['authorization']){
    const SECRET_JWT_TOKEN = process.env.SECRET_JWT_TOKEN
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, SECRET_JWT_TOKEN , (err, result)=>{
        if (err) return res.status(400).send({err: 'Invalid Token'})
        req.token = result
        next()
    })
   }else{
    console.log('err verify')
    res.status(404).send({err: 'token not found'})
   }
}
export default isAuthed