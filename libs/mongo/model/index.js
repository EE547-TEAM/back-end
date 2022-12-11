const { model } = require('mongoose');
const {
  Order, Rate, User, Authority, Address, Production, Chat, Message,
} = require('./schema');

module.exports = {
  Chat: model('Chat', Chat),
  Rate: model('Rate', Rate),
  Order: model('Order', Order),
  User: model('User', User),
  Authority: model('Authority', Authority),
  Address: model('Address', Address),
  Production: model('Production', Production),
  Message: model('Message', Message),
};
