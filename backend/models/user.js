const mongoose = require("mongoose");

//1 email unique par user
const uniqueValidator = require("mongoose-unique-validator");

//Schéma de données : user, pr mongoDb
const userSchema = mongoose.Schema({
  //userId: { type: Number },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employment: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
