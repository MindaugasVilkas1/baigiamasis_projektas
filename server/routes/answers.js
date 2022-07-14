import express from "express";
import fetch from 'node-fetch';
import axios from 'axios'
const router = express.Router()
// app get question
router.get("/", async (req, res) => {
    const data = await fetch(`http://localhost:8080/answer/${req.params.id?req.params.id:''}`)
    .then(data => data.json());
    res.json(data);
  });
  // router post
  router.post("/", async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8080/answer', {
            user_id:req.body.user_id,
            question_id: req.body.question_id,
            answer:req.body.answer
        })
        res.send(response.data)
    } catch (err) {
        res.send({ err })
        console.log(err)

    }
});

export default router