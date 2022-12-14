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
};

const MessageStatusEnum = {
  type: String,
  enum: ['read', 'unread'],
  default: 'unread',
};

const User = new Schema({
  name: String,
  email: String,
  buyerRate: { type: Number, default: 0 },
  sellerRate: { type: Number, default: 0 },
}, { timestamps: true });

const Authority = new Schema({
  userId: { type: Schema.Types.ObjectId, require: true },
  password: { require: true, type: String },
}, { timestamps: true });

const Address = new Schema({
  content: String,
  userId: Schema.Types.ObjectId,
  is_default: Boolean,
}, { timestamps: true });

const Production = new Schema({
  userId: Schema.Types.ObjectId,
  price: { type: Number, default: 0 },
  name: String,
  condition: String,
  quantity: { type: Number, default: 1 },
  description: String,
  addressId: Schema.Types.ObjectId,
  isActivate: Boolean,
  viewTime: { type: Number, default: 0 },
}, { timestamps: true });

const Order = new Schema({
  productionID: Schema.Types.ObjectId,
  quantity: { type: Number, default: 1 },
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
  score: { type: Number, default: 5 },
  orderId: Schema.Types.ObjectId,
  comment: { type: String, default: null },
  rateFromId: Schema.Types.ObjectId,
  rateToId: Schema.Types.ObjectId,
  Type: RateTypeEnum,
}, { timestamps: true });

const Chat = new Schema({
  participant: [Schema.Types.ObjectId],
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
  Authority,
  Address,
  Production,
  Chat,
  Message,
};
