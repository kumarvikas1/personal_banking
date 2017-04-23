module.exports = function(app) {
  var TransactionController = require('../controllers/TransactionController');

  app.route('/details/')
    .get(TransactionController.list_details)
    .post(TransactionController.add_details);
};