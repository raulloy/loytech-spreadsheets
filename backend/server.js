import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routers/userRouter.js';

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
const port = 5000;

app.use(cors());

app.use('/api/users', userRouter);

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/banner-products', (req, res) => {
  res.send(data.banner);
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((product) => product._id == req.params.id);
  if (product) {
    res.send(product);
  } else {
    // res.sendStatus(404);
    res.status(404).send('Product not found!');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
