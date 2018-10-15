const fs = require('fs');

const charImages = []; // Array containing the images for each character.
const cssImages = []; // Array containing the Character Select images for each character.

// Scope is here because charNames doesn't need to exist after charImages has been initialized.
{
  const charNames = ['luigi', 'mario', 'donkey_kong', 'link', 'samus', 'captain_falcon', 'ness', 'yoshi', 'kirby', 'fox', 'pikachu', 'jigglypuff'];
  for (let i = 0; i < charNames.length; i++) {
    charImages[charNames[i]] = fs.readFileSync(`${__dirname}/../data/images/chars/${charNames[i]}.png`);
    cssImages[charNames[i]] = fs.readFileSync(`${__dirname}/../data/images/css/${charNames[i]}.png`);
  }
}

// Return the image of a specific character.
const getImage = (request, response, params) => {
  if (charImages[params.char] != null) {
    response.writeHead(200, { 'Content-Type': 'image/png' });
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
  }

  const responseImg = charImages[params.char];

  switch (request.method) {
    case 'HEAD':
      break;

    case 'GET':
      if (responseImg != null) {
        response.write(responseImg);
      } else {
        const responseJSON = {
          error: 404,
          message: 'Image not found.',
        };

        response.write(JSON.stringify(responseJSON));
      }
      break;

    default:
      break;
  }

  response.end();
};

const getCSSImage = (request, response, params) => {
  if (cssImages[params.char] != null) {
    response.writeHead(200, { 'Content-Type': 'image/png' });
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
  }

  const responseImg = cssImages[params.char];

  switch (request.method) {
    case 'HEAD':
      break;

    case 'GET':
      if (responseImg != null) {
        response.write(responseImg);
      } else {
        const responseJSON = {
          error: 404,
          message: 'Image not found.',
        };

        response.write(JSON.stringify(responseJSON));
      }
      break;

    default:
      break;
  }

  response.end();
};

module.exports.getImage = getImage;
module.exports.getCSSImage = getCSSImage;
