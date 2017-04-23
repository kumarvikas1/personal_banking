var mongoose = require('mongoose'),
  AccountDetails = mongoose.model('Account');

exports.read_accounts= function(req, res) {
  AccountDetails.find({'emailAddress':req.query.emailAddress}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.add_account= function(req, res) {
  var new_task = new AccountDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};
