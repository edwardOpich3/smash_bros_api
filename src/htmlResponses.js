const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const notFound = fs.readFileSync(`${__dirname}/../client/notFound.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Return the homepage.
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  switch (request.method) {
    case 'HEAD':
      break;

    case 'GET':
      response.write(index);
      break;

    default:
      break;
  }

  response.end();
};

// Return the 404 page.
const getNotFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });

  switch (request.method) {
    case 'HEAD':
      break;

    case 'GET':
      response.write(notFound);
      break;

    default:
      break;
  }

  response.end();
};

// Return the CSS.
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });

  switch (request.method) {
    case 'HEAD':
      break;

    case 'GET':
      response.write(css);
      break;

    default:
      break;
  }

  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getNotFound = getNotFound;
module.exports.getCSS = getCSS;
