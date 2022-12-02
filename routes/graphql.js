/**
 * all of route in this file have the same base url '/graphql';
 */
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const getGraphqlSchemaFromFile = require('../libs/graphqlSchema');

const router = express.Router();

const apiRoot = {
  /**
     *
     * @param pid {string}
     * @returns {string}
     * @return {Promise<* | null>}
     */
  player: async ({ pid }) => {
    let player = null;
    try {
      player = await dataInterface.getPlayer(ObjectId(pid));
      return player.toGraphQLPlayerType();
    } catch (e) {
      console.error('get player', pid, e);
      return null;
    }
  },
};

getGraphqlSchemaFromFile()
  .then((schema) => {
    console.log('Graphql loaded');
    router.get('/graphql', graphqlHTTP({
      schema,
      rootValue: apiRoot,
      graphiql: true,
    }));
  });

module.exports = router;
