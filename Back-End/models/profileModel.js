let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let profileSchema = new Schema({
  gender: String,
  name: {
    title: String,
    first: String,
    last: String
  },
  location: {
    street: String,
    city: String,
    state: String,
    postcode: String,
    coordinates: {
      latitude: String,
      longitude: String
    },
    timezone: {
      offset: String,
      description: String
    }
  },
  email: String,
  dob: Date,
  phone: String,
  cell: String,
  picture: String,
  nat: String
}, { collection: 'profile' });

module.exports = mongoose.model('profile', profileSchema);