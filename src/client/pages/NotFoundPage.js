import React from 'react';

// argument is derived from the context prop passed down to the StaticRouter in the renderer helper
// prop gets renamed to staticContext automatically
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
    <div className="jumbotron jumbotron-fluid">
      <h1 className="display-3 bg-danger text-white text-center">
        Page Not Found
      </h1>
    </div>
  );
};

export default { component: NotFoundPage };
