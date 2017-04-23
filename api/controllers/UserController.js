var mongoose = require('mongoose'),
  UserDetails = mongoose.model('User');

exports.read_a_user= function(req, res) {
  UserDetails.findOne({'emailAddress':req.query.userId}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.add_a_user= function(req, res) {
  var new_task = new UserDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};
