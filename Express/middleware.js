const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log("middleware", method, url);
  next();
};
const product = (req, res, next) => {
  if (req.url.includes("products")) {
    console.log(Date.now());
    next();
  } else {
    res.status(401).send("cant access this page");
  }
};
module.exports = { logger, product };
