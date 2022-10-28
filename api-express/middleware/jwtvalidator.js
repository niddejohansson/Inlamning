//middleware
const jwtValidator = (req, res, next) => {
    console.log("jwt validator");
    return next();
  };

module.exports = jwtValidator;