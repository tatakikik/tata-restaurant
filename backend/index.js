const admin = require("firebase-admin");
const serviceAccount = require("../backend/tata.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebasedb = admin.firestore();

const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;

require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
      if (req.body.remember == true) {
        time_exp = "7d";
      } else time_exp = "1d";
      const token = jwt.sign(user, db.SECRET, {
        expiresIn: time_exp,
      });
      var decoded = jwt.decode(token);
      let time = new Date(decoded.exp * 1000);
      console.log(new Date(decoded.exp * 1000));
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: `Register success` });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/reserve", async (req, res) => {
  try {
    // console.log("header ", req.headers.search);
    let dataList = [];
    let newList = [];
    const snapshot = await firebasedb.collection("reserve").get();
    await snapshot.forEach((doc) => {
      // console.log("doc.data()", doc.id, "=>", doc.data());
      let dataNew = {
        id: doc.id,
        data: doc.data(),
      };
      dataList.push(dataNew);
    });
    console.log(dataList);
    console.log("header ", req.headers.search);
    if (req.headers.search !== "admin") {
      newList = dataList.filter(
        (data) => data.data.username === req.headers.search
      );
    } else {
      newList = dataList;
    }

    res.status(200).json({ newList });
  } catch {
    res.status(422).json({ message: "Cannot reserve" });
  }
});

router.post("/addReserve", async (req, res) => {
  console.log(req.body);
  const ref = firebasedb.collection("reserve").doc();
  try {
    await ref
      .set({
        reserveName: req.body.reserveName,
        telephone: req.body.telephone,
        date: req.body.date,
        time: req.body.time,
        username: req.body.username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    res.status(200).json({ message: "Add to Firebase" });
  } catch {
    res.status(404).json({ message: "Cannot reserve" });
  }
});

router.put("/updateReserve", async (req, res) => {
  console.log(req.body);
  const ref = firebasedb.collection("reserve").doc(req.body.editID);

  try {
    await ref.update({
      reserveName: req.body.reserveName,
      telephone: req.body.telephone,
      date: req.body.date,
      time: req.body.time,
    });
    res.status(200).json({ message: "update to Firebase" });
  } catch {
    res.status(404).json({ message: "Cannot update" });
  }
});

router.get("/delete", async (req, res) => {
  console.log("DELETE ", req.headers.deleteid);
  const ref = firebasedb.collection("reserve").doc(req.headers.deleteid);
  try {
    await ref.delete();
    res.status(200).json({ message: "delete from Firebase" });
  } catch {
    res.status(404).json({ message: "Cannot delete" });
  }
});

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
