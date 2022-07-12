import express from "express";
import fetch from 'node-fetch';

const router = express.Router()
// app get question
router.get("/", async (req, res) => {
    const data = await fetch(`http://localhost:8080/answer/${req.params.id?req.params.id:''}`)
    .then(data => data.json());
    res.json(data);
  });

export default router