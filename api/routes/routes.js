///
require("dotenv").config();

const {
  authenticate,
  checkUser,
  checkEntry,
  checkEntryForDate
} = require("../helpers/helpers.js");

const {
  register,
  login,
  deleteUser,
  updateUser,
  getUsers,
  getUsersQuantity,
  getUser,
  getUserReg
} = require("./userHelpers");

const {
  getAllEntriesPerUser,
  postEntriesPerUser,
  getEntryPerUser,
  deleteEntryPerUser,
  updateEntryPerUser,
  tenYearInitialize,
  getAllEntriesPerUserDelete
} = require("./entryHelpers");

module.exports = server => {
  // sanity check!
  server.get("/", test);
  // Creates a user using the information sent inside the body of the request. username and email require unique values, all values are require for post success.
  server.post("/api/register", register, getUserReg, tenYearInitialize);
  // Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client, via localstorage. equired Storage KEY: jwt. Example: localStorage.setItem("jwt", res.data.token);
  server.post("/api/login", login);
  // If the user is logged in, the response will contain an array of all the users in the database. If the user is not logged in the response will be an error code. (for testing!)
  server.get("/api/users", /*authenticate,*/ getUsers);
  // The response will be the integer of the current QTY of users (for home page)
  server.get("/api/users/quantity", getUsersQuantity);
  // 	userID is a dynamic variable set by the front end. If the user is logged in, and userID is correct, the response will be an object with the user info. If the user is not logged in or does not exist, the response will be an error code.
  server.get("/api/users/:userID", /*authenticate,*/ /*checkUser,*/ getUser);
  // userID is a dynamic variable set by the front end. If the user is logged in, and userID is correct, the response will be an empty object and the user will be deleted from the database. If the user is not logged-in or does not exist, the response will be an error code.
  server.delete("/api/users/:userID", /*authenticate,*/ /*checkUser,*//*getAllEntriesPerUserDelete,*/ deleteUser);
  // userID is a dynamic variable set by the front end. If the user is logged in, and userID is correct, the response will be 1. If the user is not logged-in or does not exist, the response will be an error code. All values are required for put success.
  server.put("/api/users/:userID", /*authenticate,*/ /*checkUser,*/ updateUser);
  // 	userID is a dynamic variable set by the front end. If the user is logged in, and userID is correct, the response will an object with the users entry info. If the user is not logged or has no entries, the response will be an error code.
  server.get(
    "/api/users/:userID/entries",
    authenticate,
    checkUser,
    getAllEntriesPerUser
  );
  // userID is a dynamic variable set by the front end. If the user is logged in, and userID is correct, the response will be a new entry. If the user is not logged in, the response will be an error code. All values are required for a successful post.
  // server.post(
  //   "/api/users/:userID/entries",
  //   /*authenticate,*/
  //   /*checkUser,*/
  //   checkEntryForDate,
  //   postEntriesPerUser
  // );
  // userID and entryID are dynamic variable's set by the front end. If the user is logged in, userID/entryID are correct, and the entry exists, the response will be an object with the users entry. If the user is not logged-in or userID/entryID are incorrect or does not contain the entry, the response will be an error code.
  server.get(
    "/api/users/:userID/entries/:entryID",
    /*authenticate,*/
    /*checkUser,*/
    /*checkEntry,*/
    getEntryPerUser
  );
  // userID and entryID are dynamic variable's set by the front end. If the user is logged in, userID/entryID are correct, and the entry exists, the response will be an empty object and the entry shall be removed from the database. If the user is not logged-in or userID/entryID are incorrect or does not contain the entry, the response will be an error code.
  server.delete(
    "/api/users/:userID/entries/:entryID",
    /*authenticate,*/
    /*checkUser,*/
    /*checkEntry,*/
    deleteEntryPerUser
  );
  // userID and entryID are dynamic variable's set by the front end. If the user is logged in, userID/entryID are correct, and the entry exists, the response will be a 1. If the user is not logged-in or userID/entryID are incorrect or does not contain the entry, the response will be an error code. All values are required for a successful put.
  server.put(
    "/api/users/:userID/entries/:entryID",
    authenticate,
    checkUser,
    checkEntry,
    updateEntryPerUser
  );
};



function test(req, res) {
  res.status(200).json(`Sanity Check Server is Connected: ${process.env.PORT}`);
}