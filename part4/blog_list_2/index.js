const config = require('./utils/config.js');
const express1 = require("./app.js");

const express1_listener = express1.listen(config.PORT, config.NETWORK_DEVICE, () =>
{
    console.log(`Server running on port ${config.PORT}`)
})


module.exports = express1_listener;