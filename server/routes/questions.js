import express from "express";
import fetch from 'node-fetch';
import axios from 'axios'
const router = express.Router()
// app get question
router.get("/:id?", async (req, res) => {
    const data = await fetch(`http://localhost:8080/question/${req.params.id ? req.params.id : ''}`)
        .then(data => data.json());
    res.json(data);
});

// router post
router.post("/", async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8080/question', {
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description
        })
        res.send(response.data)
    } catch (err) {
        res.send({ err })
        console.log(err)

    }
});
// app delete
router.delete('/:id', async (req, res) => {
    try {
        const data = await fetch(`http://localhost:8080/question/${req.params.id}`, {
            method: "DELETE"
        })
        res.send(data)
    } catch (err) {
        res.send({ err })
    }
})
// patch answers
router.patch("/:id", async (req, res) => {
    fetch(`http://localhost:8080/question/${req.params.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
    res.json({ success: true });
});

export default router