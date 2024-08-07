const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const book = require("./routes/book");
const favorite = require("./routes/favorite");
const cart = require("./routes/cart");
const order = require("./routes/order");
app.use(cors());
//routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favorite);
app.use("/api/v1", cart);
app.use("/api/v1", order);

app.get("/", (req, res) => {
    res.send("Hello from backend side!");
})

//creating PORT
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}!`);
})