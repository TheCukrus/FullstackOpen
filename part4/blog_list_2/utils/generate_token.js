const crypto = require("crypto");
const config = require("./config");

const generate_token = () =>
{
    let token = crypto.createHash("sha256")
    token.update(Date.now() + config.SALT);

    return token.digest("base64");
}

module.exports = generate_token;