import express from 'express';
import isAuthed from '../middleware.js';
const router = express.Router()
router.get("/", async (req, res)=>{
    const verify = await isAuthed(req)
    res.json({
        verify:verify,
        user_name:req.token.user_name,
        email:req.token.email,
        id: req.token.id
    
    })
})

export default router
