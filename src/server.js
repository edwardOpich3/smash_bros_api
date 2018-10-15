const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Struct holding all valid URLs that can be served
const urlStruct = {
  // Exact URL
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/getCharacter': jsonHandler.getCharacter,
  '/getImage': mediaHandler.getImage,
  '/getCSSImage': mediaHandler.getCSSImage,
  '/postComment': jsonHandler.postComment,

  // Error handling / Special cases
  notFound: htmlHandler.getNotFound,
};

// Request handler for the server
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  // Is the requested pathname a valid URL?
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else { // Otherwise, default to not found!
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on localhost:${port}...`);
