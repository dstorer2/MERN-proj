const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/jwt");
const { Mongoose } = require("mongoose");

module.exports.register = async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save();
        await res.cookie("usertoken", jwt.sign({_id: user._id}, secret, {expiresIn: "7d"}), {httpOnly: true})
        res.json({message: "successfully created user", user: user})
    } catch (error) {
            console.log("Mongoose validation error:", error);
    }
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user === null) {
                res.json({message: "invalid login attempt"})
            } else{
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordIsValid => {
                        if(passwordIsValid){
                            res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                            .json({message: "login was successful!", _id: user._id});
                        }else{
                            res.json({message: "invalid login attempt"})
                        }
                    })
                    .catch(err => res.json({message: "Invalid login attempt", err}))
            }
        })
        .catch(err => res.json(err))
}

module.exports.findAllUsers = (req, res) => {
    User.find({})
        .then(allUsers => res.json({results: allUsers}))
        .catch(err => res.json({message: "that didn't quite work", err}))
}

module.exports.findNearbyUsers = (req, res) => {
    console.log("hey it's me the find nearby users function!")
    User.find({city: req.params.city})
        .then(nearbyUsers=>res.json({results: [nearbyUsers]}))
        .catch(err=>res.json({results: "ERROR - finding nearby users function did not work", err}))
}


// module.exports.findAllUsers = (req, res) => {
//     console.log("hey it's me the find all function!")
//     User.find({})
//         .then(allUsers => res.json({results: allUsers}))
//         .catch(err => res.json({message: "ERROR - finding all users function did not work", err}))
// }

// module.exports.createUser = (req, res) => {
//     console.log("hey it's me the create function!")
//         .then(newUser => res.json({results: newUser}))
//     User.create(req.body)
//         .catch(err => res.json({message: "ERROR - creating a user function did not work", err}))
// }

module.exports.findSingleUser = (req, res) => {
    console.log("hey it's me the find single function!")
    User.findOne({_id: req.params._id})
        .then(singleUser => res.json({results: singleUser}))
        .catch(err => res.json({message: "ERROR - finding a single user function did not work", err}))
}

module.exports.deleteSingleUser = (req, res) => {
    console.log("hey it's me the delete function!")
    User.deleteOne({_id: req.params._id})
        .then(deleteSingleUser => res.json({results: deleteSingleUser}))
        .catch(err => res.json({message: "ERROR - deleting a single user function did not work", err}))
}

module.exports.updateSingleUser = (req, res) => {
    console.log("hey it's me the update function!")
    console.log(req.body);
    User.findOneAndUpdate({_id: req.params._id}, req.body, {new: true, runValidators: true})
        .then(updateUser => res.json({results: updateUser}))
        .catch(err => res.json({message: "ERROR - updating a single user function did not work", err}))
}

module.exports.updateSingleUser = (req, res) => {
    console.log("hey it's me the update function!")
    console.log(req.body);
    User.findOneAndUpdate({_id: req.params._id}, req.body, {new: true, runValidators: true})
        .then(updateUser => res.json({results: updateUser}))
        .catch(err => res.json({message: "ERROR - updating a single user function did not work", err}))
}

module.exports.updateUserInstruments = (req, res) => {
    User.findOneAndUpdate({_id: req.params._id}, {$push:{instruments: req.body}}, {new:true , runValidators: true})
    .then(updateUser=>res.json({results: updateUser}))
    .catch(err=>res.json({message: "ERROR - updating a single user function did not work", err}))

}