const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const notFound = (request, response, params) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getCSS = getCSS;
module.exports.notFound = notFound;
