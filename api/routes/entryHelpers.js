let moment = require("moment");
const {
  serverError,
  getSuccess,
  delSuccess,
  postSuccess,
  serverErrorPost,
  serverErrorGetId
} = require("../helpers/responseHelpers.js");

const db = require("../database/dbConfig");

module.exports = {
  getAllEntriesPerUser,
  postEntriesPerUser,
  getEntryPerUser,
  deleteEntryPerUser,
  updateEntryPerUser,
  tenYearInitialize
};


function getAllEntriesPerUser(req, res) {
  const { userID } = req.params;
  // console.log("userID",userID);
  db("entries")
    .where({ user_id: userID })
    .then(getSuccess(res))
    .catch(serverError(res));
}

function postEntriesPerUser(req, res) {
  let { entry, user_id } = req.body;
  db("entries")
    .insert({
      entry: entry,
      user_id: user_id
    })
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
}

// function tenYearInitialize(req, res){
//   console.log("body",req.body);
//   let {userId} = req.body;
//   console.log("userId",userId);
//   let end = moment().add(10, 'y').format('YYYY MM DD ddd'); 
//   let stop = false;
//   let count = 0

//   // let val = moment().add(count, 'd').format('YYYY MM DD ddd');
//   // console.log("val",val);
//   // db("entries")
//   //   .insert({
//   //     entry: "...",
//   //     user_id: userId,
//   //     date: val
//   //   })
//   //   .then(postSuccess(res))
//   //   .catch(serverErrorPost(res));

//   // while(stop !== true){
//   function callback(){
//     let val = moment().add(count, 'd').format('YYYY MM DD ddd');
//     if(val === end){
//       // stop = true;
//       postSuccess(res);
//       return;
//     }else{
//       count++;
//     }
//     console.log("val", val);
//     db("entries")
//     .insert({
//       entry: "...",
//       user_id: userId,
//       date: val
//     })
//     .then((data)=>{
//       console.log("data", data)
//     }).then(()=>{ 
//         callback();
//     })
//     .catch(serverErrorPost(res));
    
//   }
//   callback();
// }

function tenYearInitialize(req, res){
  console.log("body",req.body);
  let {userId} = req.body;
  console.log("userId",userId);
  let end = moment().add(10, 'y').format('YYYY-MM-DD ddd'); 
  let stop = false;
  // let reachedMax = false;
  let max = 100;
  // let division = (365*10) / max;
  let count = 0
  let countDay = 0
  let obj;
  let bulkArray = [];
  let test = [{ entry: '...', user_id: 29, date: '2019 10 20 Sun' },
  { entry: '...', user_id: 29, date: '2019 10 21 Mon' },
  { entry: '...', user_id: 29, date: '2019 10 22 Tue' },
  { entry: '...', user_id: 29, date: '2019 10 23 Wed' },
  { entry: '...', user_id: 29, date: '2019 10 24 Thu' },
  { entry: '...', user_id: 29, date: '2019 10 25 Fri' },
  { entry: '...', user_id: 29, date: '2019 10 26 Sat' },];

  // db("entries").insert({
  //    entry: '...', user_id: 21, date: '2019 10 20 Sun' 
  // }).then(
  //   postSuccess(res)
  // ).catch(serverErrorPost(res));

  while(stop !== true){
    reachedMax = false;
    console.log("loop");
    while(reachedMax !== true){
      let val = moment().add(countDay, 'd').format('YYYY-MM-DD ddd');
      console.log("count", count);  
      console.log("val", val);
      obj = {
        entry: "...",
        user_id: userId,
        date: val
      }
      if(val === end){
        bulkArray.push(obj);
        db("entries").insert(bulkArray)
        .then(postSuccess(res))
        .catch(serverErrorPost(res));
        stop = true;
        reachedMax = true;
      }
      else if(count === max){
        // console.log("bulkArray", bulkArray);
        // console.log("test", test);
        console.log("Posting");
        db("entries").insert(bulkArray)
        .then(postSuccess(res))
        .catch(serverErrorPost(res));
        reachedMax = true;
        bulkArray = [];
        count = 0;
      }else{
        count++;
        countDay++;
        bulkArray.push(obj);
      }
    } 
  }
}

function getEntryPerUser(req, res) {
  const { entryID } = req.params;
  db("entries")
    .where({ id: entryID })
    .then(getSuccess(res))
    .catch(serverErrorGetId(res));
}

function deleteEntryPerUser(req, res) {
  const { entryID } = req.params;
  db("entries")
    .where({ id: entryID })
    .del()
    .then(delSuccess(res))
    .catch(serverErrorGetId(res));
}

function updateEntryPerUser(req, res) {
  // req.body = {
  //   entry: "string",
  //   user_id: "integer equal to the associated user id"
  // };
  const { entryID, userID } = req.params;
  let { entry, user_id } = req.body;

  db("entries")
    .where({ id: entryID })
    .then(data => {
      db("entries")
        .where({ id: entryID })
        .first()
        .update({
          id: data.id,
          entry: entry,
          user_id: user_id,
          created_at: data.created_at
        })
        .then(count => {
          if (count) {
            res.status(202).json(count);
          } else {
            res.status(404).json({ message: "Entry Does Not Exist" });
          }
        })
        .catch(serverError(res));
    })
    .catch(serverErrorGetId(res));
}
