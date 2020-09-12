//Environment variables
require('dotenv').config();

const app = require('./server');
require('./database');

// Server is listening
server = app.listen(process.env.SERVER_PORT, () => {
    console.log('SERVER STARTED AT', process.env.SERVER_PORT)
});

require('./socketio.js');