const rate = require('./handler/rate');
const order = require('./handler/order');
const address = require('./handler/address');
const product = require('./handler/production');
const message = require('./handler/message');
const user = require('./handler/user');

module.exports = {
  rate,
  order,
  address,
  product,
  message,
  user,
};
