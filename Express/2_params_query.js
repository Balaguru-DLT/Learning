const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});
app.get("/api/products", (req, res) => {
  res.json(products);
});

//  PARAMS- '/:name' to set dynamic  route parameter. dynamic value we type is identifies using  {name}=req.params
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

//  QUERY -To send piece of info to server using url,  like we can send so that get 10items or search...can get that query in req.query
app.get("/v1", (req, res) => {
  console.log(req.query);
  const { search, limit, id } = req.query;
  console.log(search, limit, id);
  let sortedProducts = [...products];
  if (id) {
    sortedProducts = sortedProducts.find((product) => {
      if ((product.id = Number(id))) {
        console.log(product.id, Number(id), product.id == Number(id));
        return product.id;
      }
    });
  }
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    res.status(200).send("no products matched your search");
  }
  res.status(200).json(sortedProducts);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
