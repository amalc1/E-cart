const jwt = require("jsonwebtoken");

let checkAuth = (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];
    const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
    if (decoded) {
      next();
    } else {
      res.status(401).json("not authenticated");
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ authenticatedError: true });
  }
};

module.exports = { checkAuth };
