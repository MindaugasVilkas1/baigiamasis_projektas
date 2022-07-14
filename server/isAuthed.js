import 'dotenv/config'
import jwt from 'jsonwebtoken'

 async function isAuthed(req){
   if(req.headers ['authorization']){
    const token = req.headers.authorization.split(' ')[1];
     const bool = jwt.verify(token, process.env.SECRET_JWT_TOKEN , (err, result)=>{
        if (err) return false
        req.token = result
        return true
    })
    return bool
   }else{
    return false
   }
}
export default isAuthed