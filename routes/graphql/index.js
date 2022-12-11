/**
 * Route settings, match the app.use('/path')
 *
 * current: /graphql
 */

const { graphqlHTTP } = require('express-graphql');
const { root } = require('../../libs/graphql');

module.exports = (schema) => graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});
