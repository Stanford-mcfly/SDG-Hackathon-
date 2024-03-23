const mongoose = require('mongoose');
const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const Registermodel = require("./models/registerdb");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require('express-session');

const connectionString = 'mongodb+srv://vijay:vijay67@sdg.uilubmu.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
//FF
app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if your using https
  }));

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      next();
    } else {
      res.json({ message: "Unauthorized" , success: false});
    }
  }

  app.post("/register", async (req, res) => {
    try {
      const existingUser = await Registermodel.findOne({ email: req.body.email });
      if (existingUser) {
        return res.json({ message: "Email address already used", success: false });
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const register = new Registermodel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        operator: req.body.operator,
      });
      const savedData = await register.save();
      console.log("Data inserted successfully:", savedData);
      // setCorsHeaders(res);
      res.json({savedData, success : true});
    } catch (err) {
      console.log("Error inserting data:", err);
      res.json({ message: err, success : false});
    }
  });

  app.post("/login", async (req, res) => {
    //email,password is to be sent
    try {
      const user = await Registermodel.findOne({ email: req.body.email });
      if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        // setCorsHeaders(res);
        if (result) {
          console.log("Name:",user.name);
          req.session.userId = user.name;
          res.json({ message: "Login successful" , success: true ,primary_key: req.session.userId});
        } else {
          res.json({ message: "Password does not match" , success: false});
        }
      } else {
        // setCorsHeaders(res);
        res.json({ message: "Email not found" });
      }
    } catch (err) {
      // setCorsHeaders(res);
      res.json({ message: err });
    }
  });



