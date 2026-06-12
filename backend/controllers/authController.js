const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../config/localDB");

const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    await db.read();

    if (!db.data.users) {
      db.data.users = [];
    }

    const existingUser = db.data.users.find(
      user => user.email === email
    );

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      membership: "None"
    };

    db.data.users.push(newUser);

    await db.write();

    res.json({
      msg: "Registration Successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error"
    });

  }

};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    await db.read();

    const user = db.data.users.find(
      user => user.email === email
    );

    if (!user) {
      return res.status(400).json({
        msg: "Invalid Credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      "harish_secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        membership: user.membership
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error"
    });

  }

};

module.exports = {
  register,
  login
};