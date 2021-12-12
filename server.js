const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors')
const path = require("path");

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client")));

const restaurantsRouter = require("./routes/restaurants");
app.use("/restaurant", restaurantsRouter);

const managerRouter = require("./routes/managers");
app.use("/manager/restaurant", managerRouter);

const productRouter = require("./routes/products");
app.use("/product", productRouter);

const ordersRouter = require("./routes/orders");
app.use("/order", ordersRouter);

const authRouter = require("./routes/jwtAuth");
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});