import express from 'express';
import isAuthed from '../middleware.js';
const router = express.Router()
router.get('/', isAuthed, async(req, res)=>{
    res.send({message:'ok'})
})

export default router
