// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('test','root','Surya@3077',{
// dialect:'mysql',
//     host:'localhost'
// })

// module.exports = sequelize;

const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient
        .connect(
            "mongodb+srv://suryaneelankar:v5KGmKGoP8Wb5rfA@cluster0.25j8xei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            { useNewUrlParser: true, useUnifiedTopology: true, ssl: true }
        )
        .then((client) => {
            console.log(client, "connected!!"), callback();
            _db = client.db();

        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};


const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'DataBase Not Found!!!'
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

