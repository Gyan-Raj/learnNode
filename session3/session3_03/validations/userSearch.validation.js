const Joi = require("joi");

const validGenders = ["male", "female"];
const userSearchSchema = Joi.object({
  gender: Joi.string().valid(...validGenders),
  age: Joi.number().min(0).max(100),
}).or("gender", "age");

const getQueryErrors = ({ gender, age }) => {
  //This function will take in the arguement as an object and then validate it against the schema we just created
  const result = userSearchSchema.validate({ gender, age }); // The validate() function takes in the data and returns an object.
  console.log(result); //we get an object as response as stated at line above.

  /**
   * So, for request like: GET http://localhost:8082/users/search?gender=male we will get:
    { value: { gender: 'male', age: undefined } }

   * for request like: GET http://localhost:8082/users/search?age=49 we will get
    { value: { gender: undefined, age: 49 } }

   * for GET http://localhost:8082/users/search?age=49&gender=male we will get
    { value: { gender: 'male', age: 49 } }
   
   * i.e., if the query params are valid, we will get an object with just one key as "value" which again is an object
   */

  //Now,say we have incorrect query parameters, then we will again get an object but this time with 2 keys: one as "value" and second as "error" which has a lot of useful information about the data and the error it was subjected to.
  /**
   * So, GET http://localhost:8082/users/search?gender=xyz will give us:
    {
    value: { gender: 'xyz', age: undefined },
    error: [Error [ValidationError]: "gender" must be one of [male, female]] {
            _original: { gender: 'xyz', age: undefined },
            details: [ [Object] ]
        }
    }
   * GET http://localhost:8082/users/search?age=-50 will give:
   {
    value: { gender: undefined, age: '-50' },
    error: [Error [ValidationError]: "age" must be greater than or equal to 0] {
            _original: { gender: undefined, age: '-50' },
            details: [ [Object] ]
        }
    }
   * GET http://localhost:8082/users/search will give:
   {
    value: { gender: undefined, age: undefined },
    error: [Error [ValidationError]: "value" must contain at least one of [gender, age]] {
            _original: { gender: undefined, age: undefined },
            details: [ [Object] ]
        }
    }
   */
  return result;
};

// Now we can easily use this function in our searchUsersByQuery() controller

module.exports = getQueryErrors;
