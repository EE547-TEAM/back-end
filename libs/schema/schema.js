const { Schema } = require('mongoose');

/**
 * Enum
 */
const OrderStatusEnum = {
  type: String,
  enum: ['created', 'trading', 'reject', 'confirm'],
  default: 'created',
};

const MessageStatusEnum = {
  type: String,
  enum: ['read', 'unread'],
  default: 'unread',
};

const User = new Schema({
  userId: Schema.Types.ObjectId,
  name: String,
  password: String,
  email: String,
  buyer_rate: Number,
  seller_rate: Number,
}, { timestamps: true });

const Address = new Schema({
  addressId: Schema.Types.ObjectId,
  content: String,
  user: User,
  is_default: Boolean,
}, { timestamps: true });

const Production = new Schema({
  productionId: Schema.Types.ObjectId,
  user: User,
  price: Number,
  name: String,
  condition: String,
  quantity: Number,
  description: String,
  publish_time: Number,
  address: Address,
  view_time: Number,
}, { timestamps: true });

const Order = new Schema({
  orderId: Schema.Types.ObjectId,
  production: Production,
  quantity: Number,
  buyer: User,
  seller: User,
  status: OrderStatusEnum,
  trading_timestamp: Date,
  reject_timestamp: Date,
  confirm_timestamp: Date,
  address_from: Address,
  address_to_id: Address,
}, { timestamps: true });

const Rate = new Schema({
  rateId: Schema.Types.ObjectId,
  score: Number,
  order: Order,
  comment: String,
  rate_from: User,
  rate_to: User,
}, { timestamps: true });

const Chat = new Schema({
  chatId: Schema.Types.ObjectId,
  participant: [User],
}, { timestamps: true });

const Message = new Schema({
  messageId: Schema.Types.ObjectId,
  chat: Chat,
  sender: User,
  content: String,
  message_timestamp: Date,
  status: MessageStatusEnum,
}, { timestamps: true });

/**
 * Exported db and schemas
 */
module.exports = {
  Order,
  Rate,
  User,
  Address,
  Production,
  Chat,
  Message,
};
