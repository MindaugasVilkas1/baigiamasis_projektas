import express from "express";
import fetch from 'node-fetch';

const router = express.Router()
// app get question
router.get("/:id?", async (req, res) => {
    const data = await fetch(`http://localhost:8080/question/${req.params.id?req.params.id:''}`)
    .then(data => data.json());
    res.json(data);
  });

  // router post
  router.post("/", async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8080/question', {
            user_id: req.params.id,
            title: req.body.email,
            description: hashedPass
        })
        res.send(response.data)
    } catch (err) {
        res.send({ err })

    }
});

export default router