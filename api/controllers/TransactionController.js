var mongoose = require('mongoose'),
  TransactionDetails = mongoose.model('Transaction');

exports.list_details = function(req, res) {
  TransactionDetails.find({'emailAddress':req.query.emailAddress,'bankName':req.query.bankName}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.add_details= function(req, res) {
  var new_task = new TransactionDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

