const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;

require("dotenv").config();

let corsOptions = {
  // middleware
  Origin: process.env.PORT,
  optionsSuccessStatus: 200,
};

const URI = process.env.DB_URI;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false })); // middleware
app.use(bodyParser.json());

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const contacts = new mongoose.Schema({
  firstName: String,
  lastName: String,
  state: String,
  city: String,
  zip: String,
});

const contactModel = new mongoose.model(
  process.env.DB_COLLECTION_NAME,
  contacts
);

app.get("/", (req, res) => {
  contactModel.find({}).then((contacts) => {
    if (contacts) {
      res.status(200).json(contacts);
    }
    return false;
  });
});

app.post("/create", (req, res) => {
  const newContact = new contactModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
  });
  newContact.save();
});

app.post("/update", (req, res) => {
  contactModel
    .findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          state: req.body.state,
          city: req.body.city,
          zip: req.body.zip,
        },
      },
      { new: true }
    )
    .then((doc) => {
      if (doc) {
        res.status(200).json("Successful Update");
      }
    });
});

app.post("/delete", (req, res) => {
  contactModel
    .deleteOne({ _id: req.body.id })
    .then((doc) => {
      res.status(200).json({ message: `Successful deletion!` });
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("Server is live!");
});