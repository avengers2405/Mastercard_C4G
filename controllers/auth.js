const jwt = require("jsonwebtoken");
// const AWS = require("aws-sdk")
const { compare } = require("bcryptjs");
const axios = require("axios");
// const roleToModel = require("./roles");
const User = require("../models/user");
const { jwtSecretKey } = require("../config/configKeys");


const {
  reqString,
  email,
  preSaveHashPassword,
} = require("../models/schemaFields");
const bcrypt = require('bcryptjs');
const generateToken = (user) => {
    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecretKey,
      {
        expiresIn: "2h",
      }
    );
    return {
      success: true,
      token: token,
    };
  };

  exports.registerStudent = (req, res) => {
    const { name, email, password, mobile } = req.body;
    if (!(name, email, password && mobile)) {
      return res.status(400).json({ error: "All input is required" });
    }
    User.findOne({ email })
      .then((old) => {
        if (old) {
          return res
            .status(409)
            .send({ message: "User Already Exist. Please Login" })
            .json({ error: "User Already Exist. Please Login" });
        }
        
        const newStudent = new User({name, email, password, mobile});
        newStudent
          .save()
          .then((user) => {
            req.body.userId = user._id;
            res.send({ message: "Successfully Registered" });
          })
          .catch((err) => res.status(400).json({ error: err.message }));
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: err.message });
      });
  
  };
  
  exports.loginStudent = (req, res) => {
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ error: "All input is required" });
    }
    // check if user exists
    User.findOne({ email })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ error: "Email not found" });
        }

        
        const isMatch = await compare(password, user.password);
        // console.log(user);
        if (isMatch) {
          user.role = User.modelName;
          const token = generateToken(user);
          res.send({ message: "Login Successful", token: token, data: user });
          // return res.json(token);
        } else {
          return res.status(400).json({ error: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: "Invalid Credentials" });
      });
  };