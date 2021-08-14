const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
const configOptions = { path: "../.env" }; //depends on from which directory started running
dotenv.config();

const errHandler = require("./middlewares/errHandler");
const conn = require("./dbConfig");
const usersRoutes = require("./routes/usersRoutes");
const userRoutes = require("./routes/userRoutes");
const verifyUser = require("./middlewares/authUser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.BACKEND_SERVER_PORT || 5000;
conn(); //db connection

app.use("/users", usersRoutes);
app.use("/user", verifyUser, userRoutes);

// for deployment
const dirname = path.resolve();
if (process.env.ENV === "prod") {
  //   console.log(path.resolve());
  app.use(express.static(path.join(dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "build"));
  });
} else {
}

app.use(errHandler); //error handlers always at last to listen to err objs from any routes

app.listen(PORT, console.log(`BACKEND SERVER PORT: ${PORT}`));
