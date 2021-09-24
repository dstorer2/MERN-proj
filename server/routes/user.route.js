const UserController = require("../controllers/user.controller");
// Attaches one of the functions to a route

module.exports = app => {

    app.get("/api/user/allUsers", UserController.findAllUsers);

    app.get("/api/user/nearbyUsers/:city", UserController.findNearbyUsers)

    app.post("/api/register", UserController.register);

    app.post("/api/login", UserController.login);

    app.get("/api/user/:_id", UserController.findSingleUser);

    app.delete("/api/user/delete/:_id", UserController.deleteSingleUser);

    app.patch("/api/user/update/:_id", UserController.updateSingleUser);

    app.patch("/api/user/update/instruments/:_id", UserController.updateUserInstruments);

}

