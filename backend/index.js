const mongoose = require('mongoose');
const express = require("express");
const app = express();
let session_user;

require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const { Registermodel, stationmodel,operatorstationmodel,userstationmodel} = require('./models/registerdb.js');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const session = require('express-session');
const saltRounds = 10;
const corsOptions = {
    origin: 'http://yourfrontenddomain.com',
    credentials: true,
};

app.use(cors(corsOptions));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

const connectionString = 'mongodb+srv://vijay:vijay67@sdg.uilubmu.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
})

const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB connected successfully");
});
db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});


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
        operator: req.body.is_operator,
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
        const sessionId = req.sessionID;
        session_user = user.name;
        console.log("Session_user:", session_user);
        // setCorsHeaders(res);
        if (result) {
          console.log("Name:",user.name);
          req.session.userId = user.name;
          res.json({ message: "Login successful" , success: true ,primary_key: req.session.userId,sessionId: sessionId});
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

  app.post("/session", async (req, res) => {  
    const user = await Registermodel.findOne({ name: session_user });
    console.log("name:" ,session_user);
    res.json({ message: "Session exists", name:session_user, operator:user.operator, success: true });
    
  });

  app.post("/operpage", async (req, res) => {  
    const data = {
        location: req.body.location,
        status: req.body.status,
        slots: req.body.slots
        };
    const station = new operatorstationmodel(data);
    async function saveStation() {
        try {
            const savedStation = await station.save();
            console.log("Station inserted successfully:", savedStation);
            res.json({ message: "operatorStation inserted successfully", success: true });
        } catch (error) {
            console.error("Error inserting station:", error);
        }
    }

    saveStation();
  });
  app.post("/userpage", async (req, res) => {
    const data = {
        EV_mod: req.body.EV_mod,
        chargertype: req.body.chargertype,
        phone: req.body.phonenumber,
        };
    const station = new userstationmodel(data);
    async function saveStation() {
        try {
            const savedStation = await station.save();
            console.log("Station inserted successfully:", savedStation);
            res.json({ message: "Station inserted successfully", success: true });
        } catch (error) {
            console.error("Error inserting station:", error);
        }
    }

    saveStation();
  

  });




// async function findStation() {
//     try {
//         const station = await stationmodel.findOne({phone:18008332233});
//         console.log(station.name);
//     } catch (error) {
//         console.error(error);
//     }
// }

// findStation();



// const stationData = {
//     name: "CESL - Alandur Metro Charging Station",
//     address: "Grand Southern Trunk Road, St Thomas Mount",
//     status: true,
//     phone: 18008332233,
//     connectors: "CCS-II",
//     direction_img: "img",
//     opentime: "12:00 AM - 11:59 PM"
// };

// const station = new stationmodel(stationData);
// async function saveStation() {
//     try {
//         const savedStation = await station.save();
//         console.log("Station inserted successfully:", savedStation);
//     } catch (error) {
//         console.error("Error inserting station:", error);
//     }
// }

// saveStation();


