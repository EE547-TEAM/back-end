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

function GetSellerRatesbyUser({ userId }) {
  // Rate.aggregate([
  //   {
  //     $group: {

  //     }
  //   }
  // ])
  return userId;
}

function GetBuyerRatesbyUser({ userId }) {
  return userId;
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
    rateType,
  });
  rate.save();
}

module.exports = {
  GetBuyerRatesbyUser,
  GetSellerRatesbyUser,
  rateCreate,
};
