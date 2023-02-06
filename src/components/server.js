const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/geocode', (req, res) => {
  const address = req.query.address;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAJwKOwIZVEh5XW1rV7hEknO38vFvXFtnY`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

app.get('/api/places', (req, res) => {
  const query = req.query.query;
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyAJwKOwIZVEh5XW1rV7hEknO38vFvXFtnY`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});