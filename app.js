const express = require("express");

const app = express();

const cors = require("cors");

const PORT = 5000;

const mongoose = require("mongoose");

app.use(cors());

const router = express.Router();

const { restart } = require("nodemon");
const User = require("./models/userSchema")
mongoose.connect("mongodb://127.0.0.1:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Connection with mongoDB was successful");
});

app.use("/", router)
app.use(express.json());

app.listen(PORT, function () {
  console.log("server is running on PORT:" + PORT);
});


app.post("/register", async function (req, res) {
     console.log("line 36==>>>", req.body)
    const { email, password } = req.body;
  
    //  validation
    if (!email || !password) {
      return res.send("Plz filled all the field properly");
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      console.log(req.body);
      return res.send("email already exist");
    }
  
    const user = new User({ email,password });
    await user
      .save()
      .then(() => {
        return res.send("login successful");
      })
      .catch((err) => res.send("login Failed"));
  });