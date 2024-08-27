const usersJSON = require("../users.json");

const getQueryErrors = require("../validations/userSearch.validation");

const getUsers = (req, res) => {
  res.header({ "content-type": "application/json" }).send(usersJSON.data);
};
const getUserById = (req, res) => {
  const { uuid } = req.params;
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
    return res
      .header({ "content-type": "application/json" })
      .send(
        usersJSON.data.filter(
          (user) => user.gender === gender && user.dob.age === age
        )
      ); //String(user.dob.age) is not required as Joi has already taken care of age to be a number
  } else if (gender) {
    return res
      .header({ "content-type": "application/json" })
      .send(usersJSON.data.filter((user) => user.gender === gender));
  } else {
    return res
      .header({ "content-type": "application/json" })
      .send(usersJSON.data.filter((user) => user.dob.age === age)); //String(user.dob.age) is not required as Joi has already taken care of age to be a number
  }
};

module.exports = {
  getUsers,
  getUserById,
  searchUsers,
};
