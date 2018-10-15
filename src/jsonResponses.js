const fs = require('fs');

const characters = [];  // Array containing each character's info.
const comments = {};    // JSON object containing comments under each character by each user.

// Scope because charNames doesn't need to exist after characters and comments have been initialized.
{
  const charNames = ['luigi', 'mario', 'donkey_kong', 'link', 'samus', 'captain_falcon', 'ness', 'yoshi', 'kirby', 'fox', 'pikachu', 'jigglypuff'];
  for (let i = 0; i < charNames.length; i++) {
    characters[charNames[i]] = JSON.parse(fs.readFileSync(`${__dirname}/../data/characters/${charNames[i]}.json`));
    comments[charNames[i]] = {};
  }
}

// Returns info for a specific character, including any comments under them.
const getCharacter = (request, response, params) => {
  if (characters[params.char] != null) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
  }

  let responseJSON = characters[params.char];

  switch (request.method) {
    case 'HEAD':
      break;

    case 'GET':
      // Add the comments!
      responseJSON.comments = comments[params.char];

      if (responseJSON == null) {
        responseJSON = {
          error: 404,
          message: 'Requested character not found.',
        };
      }

      response.write(JSON.stringify(responseJSON));
      break;

    default:
      break;
  }

  response.end();
};

// Posts a comment under a specific character.
const postComment = (request, response, params) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    const requestJSON = JSON.parse(body);
    let responseJSON = {};

    if (requestJSON.username === '' || requestJSON.comment === '') {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      responseJSON = {
        status: 400,
        message: 'Incomplete comment form entry!',
      };
    } else if (comments[params.char] != null) {
      if (comments[params.char][requestJSON.username] != null) {
        response.writeHead(204, { 'Content-Type': 'application/json' });
      } else {
        response.writeHead(201, { 'Content-Type': 'application/json' });
        responseJSON = {
          status: 201,
          message: 'Comment uploaded.',
        };
      }

      comments[params.char][requestJSON.username] = requestJSON.comment;
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      responseJSON = {
        status: 404,
        message: 'Requested character not found.',
      };
    }

    response.write(JSON.stringify(responseJSON));
    response.end();
  });

  request.on('error', () => {
    const responseJSON = {
      error: 500,
      message: 'Something went wrong on our end.',
    };

    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
  });
};

module.exports.getCharacter = getCharacter;
module.exports.postComment = postComment;
