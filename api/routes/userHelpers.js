const {
    generateToken
  } = require("../helpers/helpers.js");

const {
    serverError,
    getSuccess,
    delSuccess,
    postSuccess,
    serverErrorPost,
    serverErrorGetId
  } = require("../helpers/responseHelpers.js");

  const bcrypt = require("bcryptjs");  
  const db = require("../database/dbConfig");

  module.exports = {
    register,
    login,
    deleteUser,
    updateUser,
    getUsers,
    getUsersQuantity,
    getUser,
    getUserReg
  };

  // function register(req, res, next) {
  //   // req.body = {
  //   //   username: "string",
  //   //   password: "string",
  //   //   firstname: "string",
  //   //   lastname: "string",
  //   //   email: "string"
  //   // };
  //   const userInfo = req.body;
  //   // hash password, mutate req.body.password to reflect hash
  //   userInfo.password = bcrypt.hashSync(userInfo.password, 16);
  //   // insert user to database
  //   // let ID = 0;
  //   db("users")
  //     .insert(userInfo)
  //     .then((id)=>{ 
  //       console.log("id", id);
  //       req.body.userId = id[0]; 
  //       console.log("req.body.userId", req.body.userId);
  //       // res.status(201).json(id);
  //       next();
  //     })
  //     .catch(serverErrorPost(res));
    
  // }
  
  function login(req, res) {
    // req.body = {
    //   username: "string",
    //   password: "string"
    // };
    const creds = req.body;
    // create and respond with token if password matches database hash
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
    // req.body = {
    //   username: "string",
    //   password: "string",
    //   firstname: "string",
    //   lastname: "string",
    //   email: "string"
    // };
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
  
  function getUsersQuantity(req, res) {
    db("users")
      .then(data => {
        res.json(data.length);
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

  // function getUserReg(req, res, next) {
  //   const { userId } = req.body;
  //   console.log("userId", userId);
  //   console.log("req.body", req.body);
  //   db("users")
  //     .where({ id: userId })
  //     .then(data => {
  //       if (data.length > 0) {
  //       let { created_at } = data[0];
  //         req.body.created_at = created_at;
  //         // res.status(200);
  //         next();
  //       } else {
  //         res.status(404).json({ message: "does not exist" });
  //       }
  //     })
  //     .catch(serverErrorGetId(res));
  // }

  function register(req, res, next) {
    const userInfo = req.body;
    // hash password, mutate req.body.password to reflect hash
    userInfo.password = bcrypt.hashSync(userInfo.password, 16);
    // insert user to database
    db("users")
      .insert(userInfo)
      .then(()=>{ 
        next();
      })
      .catch(serverErrorPost(res));
    
  }

  // console.log("id", id);
  // req.body.userId = id[0]; 
  // console.log("req.body.userId", req.body.userId);

  function getUserReg(req, res, next) {
    
    db("users")
      .then(data => {
        if (data.length > 0) {
          const idArray = data.map((item)=>item.id);
          console.log("idArray",idArray);
          let userId = Math.max.apply(Math, idArray);
          console.log("userId", userId);
          req.body.userId = userId;
          next();
        } else {
          res.status(404).json({ message: "does not exist" });
        }
      })
      .catch(serverErrorGetId(res));
  }