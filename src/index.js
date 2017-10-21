import express from 'express';
import renderer from './helpers/renderer';

const app = express();

const PORT = 3000;

// serve client side output via webpack.client.js
app.use(express.static('public'));

// html generated from the renderer helper will be the template served for SEO optimization and faster loading time
// bundle.js created by the webpack.client provides the functionality for the template

// BrowserRouter has the ability to look directly at the browser's address bar to figure out the current path and what set of components it needs to show on the screen
// BrowserRouter doesn't work in the server which is why StaticRouter is needed
// StaticRouter needs to be told exactly what the current path it needs to consider which is achieved by passing the request object into the renderer helper

// express serves as the middleware for all incoming HTTP requests which gets passed down to React Router to decide the outcome
app.get('*', (req, res) => {
  res.send(renderer(req));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
