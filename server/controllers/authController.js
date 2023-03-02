const { BadRequestError, UnAuthenticatedError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

module.exports = {
  register: async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        throw new BadRequestError("please provide all values");
      }
      const userAlreadyExists = await User.findOne({ email });
      if (userAlreadyExists) {
        throw new BadRequestError("Email already in use");
      }
      const user = await User.create({ name, email, password });
      res.status(StatusCodes.CREATED).json({
        user: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new BadRequestError("Please provide all values");
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }
      const token = user.createJWT();
      user.password = undefined;
      res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      next(error);
    }
  },
};
