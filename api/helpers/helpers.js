const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET;

const db = require("../database/dbConfig");

// quickly see what this file exports
module.exports = {
  authenticate,
  generateToken,
  checkUser,
  checkEntry
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");
  console.log({ token: token });
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}

// Generate Token
function generateToken(user) {
  const { id, username } = user;
  const payload = {
    id: id,
    username: username
  };
  const options = {
    expiresIn: "45m"
  };
  return jwt.sign(payload, jwtKey, options);
}

// check for correct user
function checkUser(req, res, next) {
  const { id } = req.decoded;
  let { userID } = req.params;
  userID = Number(userID);
  if (id === userID) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Access Denied User Not Logged In/Incorrect User" });
  }
}

function checkEntry(req, res, next) {
  console.log(req.decoded);
  const { id } = req.decoded;
  let { entryID } = req.params;
  entryID = Number(entryID);
  console.log({ entry: entryID }, { id: id });
  db("entries")
    .where({ user_id: id, id: entryID })
    .then(entry => {
      console.log("entry", entry);
      if (entry.length > 0) {
        next();
      } else {
        res.status(404).json("Entry Does Not Exist");
      }
    })
    .catch(err => {
      res.status(400).json("didn;t't");
    });
}
