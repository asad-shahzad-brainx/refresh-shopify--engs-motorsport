import express from "express";
import refreshShopify from "./controllers/refreshShopify.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("System is running");
});

app.get("/refresh-shopify", refreshShopify);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
