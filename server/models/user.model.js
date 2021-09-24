const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const InstrumentSchema = new mongoose.Schema({
    instrument: String,
    proficiency: {
        type: String,
        enum: ["Want to learn!", "Beginner", "Intermediate", "Expert"]
    }
})

const LocationSchema = new mongoose.Schema({
    lng: String,
    lat: String
})

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "must have first name"]
    },
    lastName: {
        type: String,
        required: [true, "must have last name"]
    },
    email: {
        type: String,
        required: [true, "must be a valid email"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "must have password"]
    },
    instruments: [InstrumentSchema],
    address: {
        type: String,
        required: [true, "must have a valid address"]
    },
    city: {
        type: String,
        required: [true, "must reside in a valid city"]
    },
    state: {
        type: String,
        required: [true, "must reside in a valid state"]
    },
    zip_code: {
        type: Number, 
        required: [true, "must have a valid zip code"]
    },
    bio: {
        type: String
    },
    location: {
        lat: Number,
        lng: Number
    }
}, {timestamps: true})


UserSchema.virtual("confirm")
    .get(function(){
        return this._confirm
    })
    .set(function(value){
        this._confirm = value
    });

UserSchema.pre("validate", function(next) {
    if (this.password !== this._confirm) {
        this.invalidate("confirm", "Password must match confirm password");
    }
    next();
});

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("Hashing password did not work", err)
            next()
        })
});

const User = mongoose.model("User", UserSchema);

module.exports = User;