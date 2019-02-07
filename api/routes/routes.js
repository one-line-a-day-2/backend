///
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {
  authenticate,
  generateToken,
  checkUser,
  checkEntry,
  checkEntryForDate
} = require("../helpers/helpers.js");
const db = require("../database/dbConfig");

module.exports = server => {
  server.get("/", test);
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/users", authenticate, getUsers);
  server.get("/api/users/:userID", authenticate, checkUser, getUser);
  server.delete("/api/users/:userID", authenticate, checkUser, deleteUser);
  server.put("/api/users/:userID", authenticate, checkUser, updateUser);
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
    checkEntryForDate,
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
  data.length > 0
    ? res.status(200).json(data)
    : res.status(404).json({ message: "does not exist" });
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
        res.status(200).json({ token: token, id: user.id });
      } else {
        res.status(401).json({ message: "Incorrect Username or Password" });
      }
    })
    .catch(serverError(res));
}

function deleteUser(req, res) {
  const { userID } = req.params;
  db("users")
    .where({ id: userID })
    .del()
    .then(delSuccess(res))
    .catch(serverErrorGetId(res));
}

function updateUser(req, res) {
  const { userID } = req.params;
  let { username, firstname, lastname, password, email } = req.body;
  password = bcrypt.hashSync(password, 16);
  db("users")
    .where({ id: userID })
    .then(data => {
      db("users")
        .where({ id: userID })
        .first()
        .update({
          id: data.id,
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email,
          created_at: data.created_at
        })
        .then(count => {
          if (count) {
            res.status(202).json(count);
          } else {
            res.status(404).json({ message: "User Does Not Exist" });
          }
        })
        .catch(serverError(res));
    })
    .catch(serverErrorGetId(res));
}

function getUsers(req, res) {
  db("users")
    .then(data => {
      if (data.length > 0) {
        let passremoved = [];
        data.map(item => {
          let { id, username, firstname, lastname, email, created_at } = item;
          passremoved.push({
            id: id,
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            created_at: created_at
          });
        });
        res.status(200).json(passremoved);
      } else {
        res.status(404).json({ message: "does not exist" });
      }
    })
    .catch(serverError(res));
}

function getUser(req, res) {
  const { userID } = req.params;
  db("users")
    .where({ id: userID })
    .then(data => {
      if (data.length > 0) {
        let passremoved = [];
        data.map(item => {
          let { id, username, firstname, lastname, email, created_at } = item;
          passremoved.push({
            id: id,
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            created_at: created_at
          });
        });
        res.status(200).json(passremoved);
      } else {
        res.status(404).json({ message: "does not exist" });
      }
    })
    .catch(serverErrorGetId(res));
}

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
  const { entryID } = req.params;
  let { entry, user_id } = req.body;
  const { userID } = req.params;

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
