const verifyAuth = (req, res, next) => {
  if (req.headers.authorization !== process.env.password) {
    console.log(req.headers.authorization);
    console.log(process.env.password,"pass");

    return res.sendStatus(403);
  } else {
    next();
  }
};

module.exports = verifyAuth;
