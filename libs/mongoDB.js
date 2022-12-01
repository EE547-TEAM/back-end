const { MongoClient } = require('mongodb');

const DB_CONFIG_PATH = './config/mongo.json';

const db = new MongoClient(DB_CONFIG_PATH);

module.exports = {
  db,
};
