const cors = require('cors');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const serverless = require('serverless-http');
const router = express.Router();

app.use(cors());

router.get('/api/waldom/:partNumber', async (req, res) => {
    try {
        const { partNumber } = req.params;
        const response = await axios.get(`https://www.waldom.com/api/v1/${process.env.WALDOM_API_KEY}/ProductSearch/${partNumber}/0/1/1`, {
            headers: {
                'Authorization': `Bearer ${process.env.WALDOM_API_KEY}`
            }
        });
        console.log(response.data)
        res.header("Access-Control-Allow-Origin", "*");
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.use('/.netlify/functions/app', router);
module.exports.handler = serverless(app);
