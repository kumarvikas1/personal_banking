var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
  emailAddress: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
balance: {
    type: Number,
    default : 0.0
  },
bankName:{
    type: String,
    Required: 'Kindly enter the bank name'
  }
});

module.exports = mongoose.model('Account', AccountSchema);