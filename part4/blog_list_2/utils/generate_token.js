const crypto = require("crypto");
const config = require("./config");

const generate_token = (user_name, user_password) =>
{
    let token = crypto.createHash("sha256")
    token.update(user_name + user_password + config.SALT);

    return token.digest("base64");
}

module.exports = generate_token;