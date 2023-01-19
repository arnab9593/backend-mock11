const express = require("express");
const port = 8080;
const app = express();

const DB_URL = "mongodb://localhost:27017/b21";

app.get('/', (req, res) => {
    res.send("server is up");
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})