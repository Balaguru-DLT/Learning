const { sport1, add } = require("./sports1");
require("./sports2");
const path = require("path");
const { readFileSync } = require("fs");
let sum = add(5, 7);
console.log(`The sum is ${sum}`);
console.log(sport1);

// (funtion (){
// const sport="cricket"
// console.log(sport);
// })();

// (funtion (){
//     const sport="Football"
//     console.log(sport);
//     })();

// import math from "./opeartor.mjs";
// console.log(math.add(2, 3));
// console.log(math.sub(2, 3));

// import { add, sub } from "./opeartor.mjs";
// console.log(add(2, 3));
// console.log(sub(2, 3));

// path

console.log(path.isAbsolute(__filename));
console.log(path.isAbsolute("./sports1.js"));

console.log(path.join("path", "index.js"));
console.log(path.join("sports1.js", "sports2.js", "index.js"));
console.log(path.join("sports1.js", "//sports2.js", "index.js"));
console.log(path.join("sports1.js", "//sports2.js", "../index.js"));

console.log(path.resolve("path", "index.js"));
console.log(path.resolve("sports1.js", "sports2.js", "index.js"));
console.log(path.resolve("sports1.js", "//sports2.js", "index.js"));
console.log(path.resolve("sports1.js", "//sports2.js", "../index.js"));

// buffer
const buffer = new Buffer.from("bala");
buffer.write("postman");
console.log(buffer);
console.log(buffer.toJSON());

// http

const http = require("http");
const jsonData = {
  name: "Bala",
  topic: "http",
};
let homePage = readFileSync("./index.html", "utf-8");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const name = "bala";
    homePage = homePage.replace("{{name}}", name);
    res.write(homePage);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  } else if (url === "/service") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Services page</h1>");
    res.end();
  } else if (url === "/json") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(jsonData));
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(3000);

const crypto = require("crypto");

const startTime = Date.now();
process.env.UV_THREADPOOL_SIZE = 6;
let calls = 5;
for (let i = 0; i < calls; i++) {
  crypto.pbkdf2(
    "password",
    "salt",
    100000,
    512,
    "sha512",
    (err, derivedKey) => {
      if (err) throw err;
      console.log(`Hash ${i + 1}:`, Date.now() - startTime + "ms");
    }
  );
}

const fs = require("fs");

const startTime = Date.now();
// process.env.UV_THREADPOOL_SIZE = 36;
// const files = [
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",
//   "file1.txt",

//   "file2.txt",
//   "file3.txt",
//   "file4.txt",
//   "file5.txt",
//   "sports1.js",
//   "sports2.js",
//   "bigFile.txt",
// ];
process.env.UV_THREADPOOL_SIZE = 8;

const files = [
  "file1.txt",
  "file2.txt",
  "file3.txt",
  "file4.txt",
  "file5.txt",
  "sports1.js",
  "sports2.js",
  "bigFile.txt",
];

files.forEach((file, index) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) throw err;
    console.log(`File ${index + 1} read time: ${Date.now() - startTime}ms`);
  });
});
