module.exports = {
  serverError,
  getSuccess,
  delSuccess,
  postSuccess,
  serverErrorPost,
  serverErrorGetId
};

function serverError(res) {
  return function func(err) {
    res.status(500).json(err);
  };
}

function getSuccess(res) {
  return function func(data) {
    data.length > 0
      ? res.status(200).json(data)
      : res.status(404).json({ message: "does not exist" });
  };
}

function delSuccess(res) {
  return function func(data) {
    res.status(204).json(data);
  };
}
function postSuccess(res) {
  return function func(id) {
    res.status(201).json(id);
  };
}
function serverErrorPost(res) {
  return function func(err) {
    res.status(422).json(err);
  };
}
function serverErrorGetId(res) {
  return function func(err) {
    res.status(404).json(err);
  };
}
// const serverError = res => err => {
//   res.status(500).json(err);
// };
// const getSuccess = res => data => {
//   data.length > 0
//     ? res.status(200).json(data)
//     : res.status(404).json({ message: "does not exist" });
// };

// const delSuccess = res => data => {
//   res.status(204).json(data);
// };

// const postSuccess = res => id => {
//   res.status(201).json(id);
// };
// const serverErrorPost = res => err => {
//   res.status(422).json(err);
// };

// const serverErrorGetId = res => err => {
//   res.status(404).json(err);
// };
