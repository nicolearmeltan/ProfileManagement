let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let profileSchema = new Schema({
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  gender: String,
  birthday: Date,
  jobTitle: String,
  mobileNumber: String,
  bestSkill: String,
  picture: String,
  nationality: String,
  language: String,
  address: String,
  country: String,
  timeZone: String,
  latitude: Number,
  longitude: Number,
  profileLink: String,
  employer: String,
  specialized: String,
  salary: String,
  goal: String
}, { collection: 'profile' });

module.exports = mongoose.model('profile', profileSchema);