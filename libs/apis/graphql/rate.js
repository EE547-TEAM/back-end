/**
 * Define Rate API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Rate: rateSchema } = require('../../schema');

// to create rate document for mongoDB, or other operations we need.
const Rate = model('Rate', rateSchema);

async function GetRatesbyUser({ userId, type }) {
  const rates = await Rate.find({ userId: Object(userId), Type: type }).exec();
  const scoreSum = rates.reduce((pre, rate) => pre + rate.score, 0);
  return scoreSum / rates.length;
}

/**
 *
 * @param {{
 *  score: number, comment: string, fromUserId: string, toUserId: string, rateType: boolean
 * }} param0
 * @return {null}
 */
async function rateCreate({
  score, comment, fromUserId, toUserId, rateType,
}) {
  const rate = new Rate({
    score,
    comment,
    rate_from: fromUserId,
    rate_to: toUserId,
    Type: rateType,
  });
  const savedDoc = await rate.save();
  return savedDoc;
}

/**
 * update user's rate
 * @param {{ userId: string, type: 'buyer' | 'seller', score: number }} param0
 * @returns { Document }
 */
async function userRateUpdate({ userId, type, score }) {
  return Rate.updateOne({ rateToId: userId, Type: type }, { $set: { score } }).exec();
}

module.exports = {
  GetRatesbyUser,
  rateCreate,
  userRateUpdate,
};