const mongoose = require("mongoose");

//1 email unique par user
const uniqueValidator = require("mongoose-unique-validator");

//Schéma de données : user, pr mongoDb
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employment: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
