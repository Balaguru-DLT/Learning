// const http = require("http");
const jsonData = { name: "bala", topic: "http" };
// const server = http.createServer((req, res) => {
//   console.log(req.method, req.url);
//   const url = req.url;
//   if (url === "/") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>home page</h1>");
//     res.end();
//   } else if (url === "/about") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>about page</h1>");
//     res.end();
//   } else if (url === "/service") {
//     // res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>Services page</h1>");
//     res.end();
//   }else if (url === "/json") {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.write(JSON.stringify(jsonData));
//   res.end();
// } else {
//     res.writeHead(404, { "content-type": "text/html" });
//     res.write("<h1>page not found</h1>");
//     res.end();
//   }
// });

// server.listen(3000);

const http = require("http");
const { readFileSync } = require("fs");

// get all files
let homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
// const homeImage = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  console.log(req.method);
  const url = req.url;
  console.log(url);
  // home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
  }
  // about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  }
  // styles
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  }
  // image/logo
  // else if (url === "/logo.svg") {
  //   res.writeHead(200, { "content-type": "image/svg+xml" });
  //   res.write(homeImage);
  //   res.end();
  // }
  // logic
  else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  }
  // 404
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(4000);
