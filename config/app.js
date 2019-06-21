const path = require('path');
const server = require(path.resolve(__dirname, './server'));
const hotReloader = require(path.resolve(__dirname, './hotReloader'));

// Activate the custom hotReloader
hotReloader.activate(server);

// start the server
server.start();
