import express from 'express'
import fetch from 'node-fetch';
const router = express.Router()
// app get user
router.get("/", async (req, res) => {
    const data = await fetch(`http://localhost:8080/user/${req.params.id?req.params.id:''}`)
    .then(data => data.json());
    let newData = data.map(element => {
        let obj = {};
        Object.entries(element).forEach(([key, val]) => {
            if (key!=='password')
                obj[key] = val;
        })
        return obj;
    });
    
    res.json(newData);
  });
  export default router