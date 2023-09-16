const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

//connection URL
const url = 'mongodb://localhost:27017';

//database name
const dbName = 'fruitsDB';

//create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});

//use connect method to connect to the server
client.connect(function(err){
    assert.equal(null, err);
    console.log("connected successfully to server");

    const db = client.db(dbName);

    /*insertDocuments(db, function(){
        client.close();
    });*/

    findDocuments(db, function() {
      client.close();
    });
});

/*

insert documents

*/

const insertDocuments = function(db, callback) {
    const collection = db.collection('fruits');

    //insert some documents
    collection.insertMany([
        {a:1}, {a:2}, {a:3}
    ], function(err,result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        callback(result);
    });
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}