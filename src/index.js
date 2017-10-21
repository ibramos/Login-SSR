import express from 'express';
import renderer from './helpers/renderer';

const app = express();

const PORT = 3000;

// serve client side output via webpack.client.js
app.use(express.static('public'));

// html generated from the renderer helper will be the template served for SEO optimization and faster loading time
// bundle.js created by the webpack.client provides the functionality for the template
app.get('/', (req, res) => {
  res.send(renderer());
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
