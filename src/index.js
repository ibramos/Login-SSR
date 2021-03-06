import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

const PORT = 3000;

app.use(
  '/api',
  proxy('http://loginssrapi.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);
// serve client side output via webpack.client.js
app.use(express.static('public'));

// html generated from the renderer helper will be the template served for SEO optimization and faster loading time
// bundle.js created by the webpack.client provides the functionality for the template

// BrowserRouter has the ability to look directly at the browser's address bar to figure out the current path and what set of components it needs to show on the screen
// BrowserRouter doesn't work in the server which is why StaticRouter is needed
// StaticRouter needs to be told exactly what the current path it needs to consider which is achieved by passing the request object into the renderer helper

// express serves as the middleware for all incoming HTTP requests which gets passed down to React Router to decide the outcome
app.get('*', (req, res) => {
  const store = createStore(req);

  // helps figure out what components to show on screen based on a given URL without actually having to render the application via react-router-config module
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map(promise => {
      // wrap each individual promise around a promise so that Promise.all will still resolve even if one of the promises fail
      // prevents server from hanging
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    // if a url property is defined on the context object, the content should not be sent over and the user should be redirected to the new url
    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
