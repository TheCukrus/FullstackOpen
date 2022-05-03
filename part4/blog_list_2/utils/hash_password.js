const crypto = require("crypto");
const config = require("./config");

const hash_password = (user_password) =>
{
    let hash = crypto.createHash("sha256")
    hash.update(user_password + config.SALT);

    return hash.digest("base64");
}

module.exports = hash_password;