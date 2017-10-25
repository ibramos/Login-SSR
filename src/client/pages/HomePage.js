import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home Page to Login SSR</title>
        <meta property="og:title" content="Home Page to Login SSR" />
      </Helmet>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-3 text-center">Welcome to Login SSR!</h1>
        </div>
      </div>
    </div>
  );
};

export default { component: Home };
