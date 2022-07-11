import express from 'express'
import bcrypt from 'bcrypt';
import axios from 'axios'

const router = express.Router()
// register add user
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        
        const response = await axios.post('http://localhost:8080/user', {
            user_name: req.body.user_name,
            email: req.body.email,
            password: hashedPass
        })
        res.send(response.data)
    } catch (err) {
        res.send({ err })

    }
});

export default router;