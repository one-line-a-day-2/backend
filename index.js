
// load .env variables
require('dotenv').config(); 
let port;
const { server } = require('./api/server.js');
console.log(process.env.DB_ENV);
if(process.env.DB_ENV === 'development'){
  port = 5000;
}else{
  port = process.env.PORT;
}

server.listen(port, () => {
  console.log(`Server listening ${port}`);
});
