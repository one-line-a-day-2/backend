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
  updateEntryPerUser
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
