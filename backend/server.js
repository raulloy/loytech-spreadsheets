const express = require('express');
const data = require('./data.js');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/banner-products', (req, res) => {
  res.send(data.banner);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
