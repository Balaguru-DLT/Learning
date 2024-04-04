const express = require("express");
// when we invoke this server is created
const app = express();
const path = require("path");

// static is builtin middleware.using use method  to set up our static files, which will be used without need to add seprately
app.use(express.static("./public"));

const countries = [{ india: "asia", angola: "africa", swiss: "europe" }];
// In get method, 1st parameter  is path ,2nd parameter  is a callback function that gets executed which has access to req,res cycle.
app.get("/", (req, res) => {
  //  can send file using
  // 1)path, 2)from staticfiles 3)ssr
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
  // res.json(countries);
});

app.get("/about", (req, res) => {
  res.status(200).send("<h1>About Page</h1>");
});

app.get("/services", (req, res) => {
  res.status(200).send("<h1>Services page </h1>");
});
// if the above defined  paths  doesn't matches  then it will go to below function
app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// const http = require("http");
// const { readFileSync } = require("fs");

// const homePage = readFileSync("./navbar-app/index.html");
// const homeStyles = readFileSync("./navbar-app/styles.css");
// const homeImage = readFileSync("./navbar-app/logo.svg");
// const homeLogic = readFileSync("./navbar-app/browser-app.js");

//disadvantage in http is we need to add path for every resources.if project gets bigger its cumbersome process

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   console.log(url);
//   if (url === "/") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write(homePage);
//     res.end();
//   }
//   else if (url === "/about") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>about page</h1>");
//     res.end();
//   }
//   else if (url === "/styles.css") {
//     res.writeHead(200, { "content-type": "text/css" });
//     res.write(homeStyles);
//     res.end();
//   }

//   else if (url === "/browser-app.js") {
//     res.writeHead(200, { "content-type": "text/javascript" });
//     res.write(homeLogic);
//     res.end();
//   }
//   else {
//     res.writeHead(404, { "content-type": "text/html" });
//     res.write("<h1>page not found</h1>");
//     res.end();
//   }
// });

// server.listen(3000);
