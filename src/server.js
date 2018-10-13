const http = require("http");

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log("Listening on localhost:" + port + "...");
}

http.createServer(onRequest).listen(port);