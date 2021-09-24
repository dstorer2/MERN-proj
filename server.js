const express = require('express');
const app = express();
const cors = require('cors');
const cookies = require('cookie-parser')

const port = 8000;
const db_name = "in_tune_db"

app.use(cors({
    credentials: true, origin: "http://localhost:3000"
}));


require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({extended: true}));

require("./server/routes/user.route")(app);

app.listen(port, () => console.log(`listening on port: ${port}`))