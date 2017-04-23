module.exports = function(app) {
  var AccountController = require('../controllers/AccountController');

  app.route('/accounts/')
    .get(AccountController.read_accounts);

app.route('/accounts')
.post(AccountController.add_account);

};