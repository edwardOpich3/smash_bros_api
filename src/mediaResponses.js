const fs = require('fs');

const charImages = [];  // Array containing the images for each character. Loaded at server bootup to avoid hassle.

// Scope is here because charNames doesn't need to exist after charImages has been initialized.
{
  const charNames = ['luigi', 'mario', 'donkey_kong', 'link', 'samus', 'captain_falcon', 'ness', 'yoshi', 'kirby', 'fox', 'pikachu', 'jigglypuff'];
  for (let i = 0; i < charNames.length; i++) {
    charImages[charNames[i]] = fs.readFileSync(`${__dirname}/../data/images/${charNames[i]}.png`);
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

module.exports.getImage = getImage;
