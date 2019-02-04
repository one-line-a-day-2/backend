require("dotenv").config();
const bcrypt = require("bcryptjs");
const {
  authenticate,
  generateToken,
  checkUser,
  checkEntry
} = require("../helpers/helpers.js");
const db = require("../database/dbConfig");

module.exports = server => {
  server.get("/", test);
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/users", authenticate, getUsers);
  server.get("/api/users/:userID", authenticate, checkUser, getUser);

  server.get(
    "/api/users/:userID/entries",
    authenticate,
    checkUser,
    getAllEntriesPerUser
  );
  server.post(
    "/api/users/:userID/entries",
    authenticate,
    checkUser,
    postEntriesPerUser
  );
  server.get(
    "/api/users/:userID/entries/:entryID",
    authenticate,
    checkUser,
    checkEntry,
    getEntryPerUser
  );
  server.delete(
    "/api/users/:userID/entries/:entryID",
    authenticate,
    checkUser,
    checkEntry,
    deleteEntryPerUser
  );
  server.put(
    "/api/users/:userID/entries/:entryID",
    authenticate,
    checkUser,
    checkEntry,
    updateEntryPerUser
  );
};

const serverError = res => err => {
  res.status(500).json(err);
};
const getSuccess = res => data => {
  res.status(200).json(data);
};

const delSuccess = res => data => {
  res.status(204).json(data);
};

const postSuccess = res => id => {
  res.status(201).json(id);
};
const serverErrorPost = res => err => {
  res.status(422).json(err);
};

const serverErrorGetId = res => err => {
  res.status(404).json(err);
};

function test(req, res) {
  res.status(200).json(`Sanity Check Server is Connected: ${process.env.PORT}`);
}

function register(req, res) {
  const userInfo = req.body;
  userInfo.password = bcrypt.hashSync(userInfo.password, 16);
  db("users")
    .insert(userInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
}

function login(req, res) {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ message: "Incorrect Username or Password" });
      }
    })
    .catch(serverError(res));
}

function getUsers(req, res) {
  db("users")
    .then(getSuccess(res))
    .catch(serverError(res));
}

function getUser(req, res) {
  const { userID } = req.params;
  db("users")
    .where({ id: userID })
    .then(getSuccess(res))
    .catch(serverErrorGetId(res));
}

function getAllEntriesPerUser(req, res) {
  const { userID } = req.params;
  db("entries")
    .where({ user_id: userID })
    .then(getSuccess(res))
    .catch(serverError(res));
}

function postEntriesPerUser(req, res) {
  const entryInfo = req.body;
  db("entries")
    .insert(entryInfo)
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
  const { entryID } = req.params;
  const { id, entry, user_id, updated_at } = req.body;
  db("entries")
    .where({ id: entryID })
    .first()
    .then(entry => {
      let initialDate = entry;
      initialDate += "";
      console.log("yeet entry:", initialDate);
      db("entries")
        .where({ id: entryID }).first()
        .update({ id, entry, user_id, updated_at, created_at: initialDate })
        .then(count => {
          if (count) {
            res.status(202).json(count);
          } else {
            res.status(404).json({ message: "Entry Does Not Exist" });
          }
        })
        .catch(serverError(res));
    })
    .catch(serverError(res));
}
