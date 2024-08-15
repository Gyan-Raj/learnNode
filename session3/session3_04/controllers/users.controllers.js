const usersJSON = require("../users.json");

const getQueryErrors = require("../validations/userSearch.validation");

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

  const { error } = getQueryErrors({ gender, age });
  if (error) {
    return res.status(400).json(error);
  }
  if (gender && age) {
    return res
      .header({ "content-type": "application/json" })
      .send(
        usersJSON.data.filter(
          (user) => user.gender === gender && String(user.dob.age) === age
        )
      );
  } else if (gender) {
    return res
      .header({ "content-type": "application/json" })
      .send(usersJSON.data.filter((user) => user.gender === gender));
  } else {
    return res
      .header({ "content-type": "application/json" })
      .send(usersJSON.data.filter((user) => String(user.dob.age) === age));
  }
};

module.exports = {
  getUsers,
  getUserById,
  searchUsers,
};
