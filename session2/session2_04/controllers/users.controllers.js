const usersJSON = require("../users.json");

const getUsers = (req, res) => {
  res.header({ "content-type": "application/json" }).send(usersJSON.data);
};
const getUserById = (req, res) => {
  const { uuid } = req.params;
  console.log(uuid);
  const reqUser = usersJSON.data.find((user) => user.login.uuid === uuid);
  if (reqUser) {
    return res.header({ "content-type": "application/json" }).send(reqUser);
  } else {
    return res
      .status(404)
      .send({ message: `User with uuid: ${uuid} can not be found` });
  }
};

const searchUsers = (req, res) => {
  let { gender, age } = req.query;
  if (gender && age) {
    return res.header({ "content-type": "application/json" }).send(
      usersJSON.data.filter(
        (user) => user.gender === gender && String(user.dob.age) === age
      )
      //toString() Method:(Syntax: value.toString())This method is called on an object or value and converts it to a string. It works on most objects, including numbers, booleans, arrays, and objects. If the value is null or undefined, calling toString() on it will throw an error because null and undefined don't have a toString() method.
      //String() Function: (Syntax: String(value)) This is a global function that converts any value to a string. It can be used on any value, including null and undefined, without throwing an error. When used on null or undefined, it returns the strings "null" and "undefined", respectively.
    );
  } else if (gender) {
    return res
      .header({ "content-type": "application/json" })
      .send(usersJSON.data.filter((user) => user.gender === gender));
  } else if (age) {
    return res
      .header({ "content-type": "application/json" })
      .send(usersJSON.data.filter((user) => String(user.dob.age) === age));
  } else {
    return res
      .header({ "content-type": "application/json" })
      .send({ message: `Enter either age or gender` });
  }
};

module.exports = {
  getUsers,
  getUserById,
  searchUsers,
};
