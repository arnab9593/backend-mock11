const express = require("express");
require("dotenv").config();
const userRoute = require("./user.route");
const connect = require("./config");
const cors = require("cors");
const port = 8080;
const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.send("server is up");
});
app.listen(port, async () => {
    await connect();
    console.log(`http://localhost:${port}`);
})