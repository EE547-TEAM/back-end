const models = require('../../models');

async function matchUserAndPassword({ name, pw }) {
  if (models.User === undefined) {
    throw new Error('no schema found!');
  }
  return { name, pw };
}

module.exports = {
  matchUserAndPassword,
};
