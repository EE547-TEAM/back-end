/**
 * Define Rate API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Rate } = require('./model');

async function getRatesbyUser({ userId, type }) {
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
    rateFromId: fromUserId,
    rateToId: toUserId,
    Type: rateType,
  });
  const savedDoc = await rate.save();
  return savedDoc;
}

module.exports = {
  getRatesbyUser,
  rateCreate,
};
