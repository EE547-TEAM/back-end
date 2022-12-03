const { Schema } = require('mongoose');

/**
 * Enum
 */
const OrderStatusEnum = {
  type: String,
  enum: ['created', 'trading', 'reject', 'confirm'],
  default: 'created',
};

const RateTypeEnum = {
  type: String,
  enum: ['buyer', 'seller'],
  default: 'seller',
}

const MessageStatusEnum = {
  type: String,
  enum: ['read', 'unread'],
  default: 'unread',
};

const User = new Schema({
  name: String,
  password: String,
  email: String,
  buyerRate: Number,
  sellerRate: Number,
}, { timestamps: true });

const Address = new Schema({
  content: String,
  userId: Schema.Types.ObjectId,
  is_default: Boolean,
}, { timestamps: true });

const Production = new Schema({
  userId: Schema.Types.ObjectId,
  price: Number,
  name: String,
  condition: String,
  quantity: Number,
  description: String,
  publishTime: Number,
  addressId: Schema.Types.ObjectId,
  viewTime: Number,
}, { timestamps: true });

const Order = new Schema({
  productionId: Schema.Types.ObjectId,
  quantity: Number,
  buyerID: Schema.Types.ObjectId,
  sellerID: Schema.Types.ObjectId,
  status: OrderStatusEnum,
  tradingTimestamp: Date,
  rejectTimestamp: Date,
  confirmTimestamp: Date,
  // addressId
  addressFromId: Schema.Types.ObjectId,
  addressToId: Schema.Types.ObjectId,
}, { timestamps: true });

const Rate = new Schema({
  score: Number,
  orderId: Schema.Types.ObjectId,
  comment: String,
  rateFromId: Schema.Types.ObjectId,
  rateToId: Schema.Types.ObjectId,
  Type: RateTypeEnum,
}, { timestamps: true });

const Chat = new Schema({
  participantId: [Schema.Types.ObjectId],
}, { timestamps: true });

const Message = new Schema({
  chatId: Schema.Types.ObjectId,
  senderId: Schema.Types.ObjectId,
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
