
// load .env variables
require('dotenv').config(); 
const { server } = require('./api/server.js');

// const port = process.env.PORT
const port = 5000;

console.log(port);
server.listen(port, () => {
  console.log(`Server listening ${port}`);
});
