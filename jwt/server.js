require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());

const posts = [
  {
    user: "bala",
    title: "JWT",
  },
  {
    user: "guru",
    title: "web",
  },
];

app.get("/", (req, res) => {
  res.contentType("text/plain");
  res.send("JWT DEMO");
  res.end();
});

app.get("/posts", authenticate, (req, res) => {
  console.log(req.user, "inside get req");
  res.status(200).json(
    posts.filter((post) => {
      return post.user === req.user;
    })
  );
  res.end();
});

// app.post("/login", (req, res) => {
//   const user = req.body.username;
//   const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
//   res.json({ accessToken });
// });

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader);
  console.log(token, typeof token);
  console.log(process.env.SECRET_TOKEN, typeof process.env.SECRET_TOKEN);
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      console.log("err", err);

      return res.sendStatus(403);
    }
    req.user = user;
    console.log(user);
    next();
  });
}

app.listen(3000, () => {
  console.log("app is running");
});
