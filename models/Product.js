// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }
})

module.exports = mongoose.model('Product',ProductSchema);

// class Product {
//     constructor(title, price, description, imageUrl, id) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//     }

//     save() {
//         const db = getDb();

//         let dbOp;

//         if (this._id) {
//             dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
//         } else {
//             dbOp = db.collection('products').insertOne(this)
//         }

//         return dbOp
//             .then(result => console.log(result))
//             .catch(err => console.log(err))
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products').find().toArray()
//             .then(products => {
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => console.log('myerror is::', err))
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) })
//             .next()
//             .then(product => {
//                 console.log(product);
//                 return product;

//             })
//             .catch(err => console.log(err))
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
//             .then(result => console.log(result))
//             .catch(err => console.log(err))
//     }
// }

// const Product = sequelize.define('product', {
//     id: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }

// })

// module.exports = Product;