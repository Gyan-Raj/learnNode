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
  let validGenders = ["male", "female"];
  if (gender && !validGenders.includes(gender)) {
    return res
      .header({ "content-type": "application/json" })
      .status(400)
      .send({ message: `Gender must be one of: ${validGenders.join(", ")}` });
  }
  if (age && isNaN(age)) {
    return res
      .header({ "content-type": "application/json" })
      .status(400)
      .send({ message: `Age must be a valid number` });
  }
  if (age && age < 0) {
    return res
      .header({ "content-type": "application/json" })
      .status(400)
      .send({ message: `Age cannot be negative` });
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
  } else if (age) {
    return res
      .header({ "content-type": "application/json" })
      .send(usersJSON.data.filter((user) => String(user.dob.age) === age));
  } else {
    return res
      .header({ "content-type": "application/json" })
      .status(400)
      .send({ message: "Atleast one of 'gender' or 'age' must be present" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  searchUsers,
};
