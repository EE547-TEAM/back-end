/**
 * all of route in this file have the same base url '/graphql';
 */
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { matchUserAndPassword } = require('../libs/apis/graphql');

const router = express.Router();

const apiRoot = {
  /**
     *
     * @param pid {string}
     * @returns {string}
     * @return {Promise<* | null>}
     */
  player: matchUserAndPassword,
};

function setRouter(schema) {
  console.log('Graphql loaded');
  router.get('/graphql', graphqlHTTP({
    schema,
    rootValue: apiRoot,
    graphiql: true,
  }));
}

module.exports = setRouter;
