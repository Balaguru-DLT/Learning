const express = require("express");
const app = express();
const middleware = require("./middleware");
const { products } = require("./data");

// middleware canbe cutom/inbuilt/3rd party

//here  use method is used to  add a middleware function to multiple  routes at aline instead of adding it to each routes
// applies to code below that.ie order matters

// Applies to "ALL" routes
app.use([middleware.logger]);

//  Applies to routes have  api
// app.use("/api", middleware.product);

app.get("/", (req, res) => {
  res.send("Home");
});

// applies to this route only
// app.get("/about", middleware.product, (req, res) => {
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", middleware.product, (req, res) => {
  res.send("Products");
});
app.get("/api/products/:productID", (req, res) => {
  console.log("params", req.params);
  const { productID } = req.params;

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }
  return res.json(singleProduct);
});
app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
