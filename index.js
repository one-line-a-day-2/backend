
// load .env variables
require('dotenv').config(); 
const { server } = require('./api/server.js');

let port;

if(process.env.DB_ENV === 'development'){
  port = 5000;
}else if(process.env.DB_ENV === 'production'){
  port = process.env.PORT;
}

// let moment = require("moment");
// let start = moment().format('YYYY MM DD ddd'); 
// let second = moment().add(1, 'd').format('YYYY MM DD ddd'); 
// let end = moment().add(10, 'y').format('YYYY MM DD ddd'); 

server.listen(port, () => {
  // console.log(start);
  // console.log(second);
  // console.log(end);

  // let stop = false;
  // let count = 0
  // while(stop !== true){
  //   let val = moment().add(count, 'd').format('YYYY MM DD ddd');
  //   if(val === end){
  //     stop = true;
  //   }else{
  //     count++;
  //   }
  //   console.log("val", val);
  // }

  console.log(`Server listening ${port}`);
});
