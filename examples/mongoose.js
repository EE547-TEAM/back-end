const { model, Schema } = require('mongoose');

// login to your mongoDB Compose to see any changes.
// this function only called in development env. not production env.
// for any tech details, create, update, delete, see https://mongoosejs.com/docs/models.html
async function testMongoose() {
  console.log('dev');
  // create a test schema
  const Test = new Schema({
    name: String,
    living: Boolean,
    updated: { type: Date, default: Date.now },
    age: { type: Number, min: 18, max: 65 },
    mixed: Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    decimal: Schema.Types.Decimal128,
    array: [],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
    ofArrays: [[]],
    ofArrayOfNumbers: [[Number]],
    nested: {
      stuff: { type: String, lowercase: true, trim: true },
    },
    map: Map,
    mapOfString: {
      type: Map,
      of: String,
    },
  }, { timestamps: true });

  // we create the model factory to create object or save to mongodb.
  const TestModel = model('Test', Test);

  await TestModel.createCollection((col) => {
    console.log('Collection is created!', col);
  });

  /**
    * PART I: CREATE
  */

  const params = {
    name: 'yes',
    living: true,
  };

  // Way I, create and save an object
  // we usually do this way when we received the request form the front-end
  //    and need to save the new data.
  // for example: when post /user (create a user).
  TestModel.create(params, (err) => { console.error(err); });

  // Way II, create and save an object
  // we usually do this way when we need to store our new data or updated data into db.
  // I prefer this one and highly recommend using it.
  const test = new TestModel(params);
  test.save((err) => { console.error(err); });

  // Create many documents.
  const paramses = new Array(10).fill(0).map((i) => ({
    name: `yes${i}`,
    binary: new ArrayBuffer('123'),
    living: true,
  }));
  // Way I
  TestModel.insertMany(paramses, (err) => { console.error(err); });
}

module.exports = testMongoose;
