import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET route for all image IDs
app.get('/images', (req, res) => {
  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json()).then((response) => {
    res.status(200).send(response);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

// GET route for specific image based on :id param
app.get('/image/:id', (req, res) => {
  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${req.params.id}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json()).then((response) => {
    res.status(200).send(response);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});