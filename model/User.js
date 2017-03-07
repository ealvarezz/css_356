var mongoose = require('mongoose');  
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);



var userSchema = new mongoose.Schema({  
  verified: Boolean,
  u_name: String,
  password: String,
  email: String,
  verify_key: String,
  create_date: { type: Date, default: Date.now }
});


userSchema.plugin(autoIncrement.plugin, 'User');
mongoose.model('User', userSchema);