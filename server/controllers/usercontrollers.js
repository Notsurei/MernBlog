const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const getAllUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (error) {
    return res.status(500).json("an error has occured when finding users");
  }

  if (!users) {
    return res.status(404).json("No accounts founded");
  }
  return res.status(200).json(users);
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return res.status(500).json("an error has occured when finding user");
  }

  if (existingUser) {
    return res.status(400).json("email is already existing");
  }

  const Account = new User({
    name,
    email,
    password,
  });

  try {
    if (!name || !email || !password) {
      res.status(500).json("please fill all the field");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("invalid email");
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("invalid password");
    }
    const salt = await bcrypt.genSalt(10);
    Account.password = await bcrypt.hash(Account.password, salt);
    Account.resetToken = undefined;
    Account.expiredToken = undefined;
    Account.save();
  } catch (error) {
    return res.status(500).json("an error has occured when signing up");
  }

  return res.status(200).json(Account);
};

const deleteUser = async (req, res, next) => {
  let { id } = req.params;
  const find = await User.findById(id);

  if (!find) {
    return res.status(404).json("user not found");
  }

  await User.findByIdAndDelete(id);
  return res.status(200).json("deleted account");
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return res.status(500).json("an error has occured when finding user");
  }

  if (!existingUser) {
    return res.status(404).json("user not found");
  }
  const invalidPassword = await bcrypt.compare(password, existingUser.password);

  if (!invalidPassword) {
    return res.status(500).json("invalid password");
  } else {
    return res
      .status(200)
      .json({ message: "correct user", user: existingUser });
  }
};

const getOneUser = async (req, res, next) => {
  let id = req.params;

  const find = await User.findById(id);

  if (!find) {
    return res.status(404).json("user not found");
  }
  return res.status(200).json(find);
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const client = await User.findOne({ email });

    if (!client) {
      return res.status(404).json("user not found");
    }

    const generatedToken = crypto.randomBytes(10);

    if (!generatedToken) {
      return res.status(500).json("an error has occurred, try again");
    }

    const convertTokenToString = generatedToken.toString("hex");

    client.resetToken = convertTokenToString;
    client.expiredToken = Date.now() + 1800000;

    await client.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "KVBLog support<support@kvblog.com>",
      to: email,
      subject: "Reset Password",
      text: `Please use the following token to reset your password: ${client.resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json("an error has occurred, try again");
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          message: "Your reset code has been sent, check your email",
          data: {
            resetToken: client.resetToken,
            expiredToken: client.expiredToken,
          },
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `An error has occurred -> ${error}`,
    });
  }
};

const resetPassword = async (req, res, next) => {
  const { email, resetToken, newPassword } = req.body;

  try {
    const client = await User.findOne({ email });

    if (!client) {
      return res.status(404).json("user not found");
    }

    const validToken = resetToken === client.resetToken;

    if (!validToken) {
      return res.status(400).json("Invalid reset Token");
    }

    if (!newPassword) {
      return res.status(400).json("please fill all the field");
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json("invalid password");
    }

    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(newPassword, salt);
    client.resetToken = undefined;
    client.expiredToken = undefined;

    await client.save();

    return res.status(200).json("Password reset successfully");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json("An error occurred while resetting the password");
  }
};

module.exports = {
  getAllUser,
  createUser,
  deleteUser,
  Login,
  getOneUser,
  forgotPassword,
  resetPassword,
};