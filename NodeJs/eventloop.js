// MICROTASK QUEUE

console.log(1);
process.nextTick(() => {
  console.log("process nexttick");
});
Promise.resolve().then(() => console.log("promise call backk"));
console.log(2);

setTimeout(() => console.log("Inside timeout 1"), 0);
setTimeout(() => {
  console.log("Inside timeout 2");
  process.nextTick(() => {
    console.log("nexttick inside timeout  ");
  });
}, 0);
setTimeout(() => console.log("Inside timeout 3"), 0);

process.nextTick(() => {
  console.log("process nexttick 1");
});
process.nextTick(() => {
  console.log("process nexttick 2");
  process.nextTick(() => {
    console.log("inside nexttick ");
  });
});
process.nextTick(() => {
  console.log("process nexttick 3");
});
Promise.resolve().then(() => console.log("promise call backk1"));
Promise.resolve().then(() => {
  console.log("promise call backk2");
  process.nextTick(() => {
    console.log("inside nexttick of promise");
  });
});
Promise.resolve().then(() => console.log("promise call backk3"));

IO QUEUE
const fs = require("fs");

// fs.readFile(__filename, () => {console.log("read file 1")});
fs.readFile(__filename, () => {
  console.log("read file 1");
  setImmediate(() => {
    console.log("check queue inside  readfile callback");
  });
  process.nextTick(() => {
    console.log("process nexttick  inside  readfile callback");
  });
  Promise.resolve().then(() =>
    console.log("promise call backk  inside  readfile callback")
  );
});
process.nextTick(() => {
  console.log("process nexttick 1");
});
Promise.resolve().then(() => console.log("promise call backk1"));
setTimeout(() => console.log("Inside timeout 1"), 0);

setImmediate(() => {
  console.log("check queue");
  //   process.nextTick(() => {
  //     console.log("process nexttick 1");
  //   });
});

// CLOSE QUEUE
const fs = require("fs");

const readabletream = fs.createReadStream(__filename);
readabletream.close();
readabletream.on("close", (chunk) => {
  console.log("raedablestream close event cb");
});

setImmediate(() => {
  console.log("check queue");
});
setTimeout(() => console.log("Inside timeout 1"), 0);
process.nextTick(() => {
  console.log("process nexttick 1");
});
Promise.resolve().then(() => console.log("promise call backk1"));
