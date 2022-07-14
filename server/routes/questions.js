import express from "express";
import fetch from 'node-fetch';
import axios from 'axios'
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
            user_id:req.body.user_id,
            title: req.body.title,
            description:req.body.description
        })
        res.send(response.data)
    } catch (err) {
        res.send({ err })
        console.log(err)

    }
});

export default router