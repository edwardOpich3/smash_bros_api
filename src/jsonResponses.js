const fs = require("fs");

const characters = [];
{
    const charNames = ["luigi", "mario", "donkey_kong", "link", "samus", "captain_falcon", "ness", "yoshi", "kirby", "fox", "pikachu", "jigglypuff"];
    for(let i = 0; i < charNames.length; i++){
        characters[charNames[i]] = JSON.parse(fs.readFileSync(__dirname + "/../data/characters/" + charNames[i] + "/character.json"));
    }
}

const getCharacter = (request, response, params) => {
    const responseJSON = characters[params.char];

    if(responseJSON != null){
        const stringJSON = JSON.stringify(responseJSON);

        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(stringJSON);
    } else {
        response.writeHead(404, { "Content-Type": "application/json" });
    }

    response.end();
};

module.exports.getCharacter = getCharacter;