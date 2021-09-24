const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/in_tune_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("you are connected to the database"))
    .catch(err=>console.log("something went wrong connecting to the database", err))