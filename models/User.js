// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        // required: true
    },
    password:{
        type: String
    }, 
    resetpassword:{
        type: String,
    },
    resetToken:{
       type: String,
    },
    resetTokenExpiration: {
        type : Date,
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId,ref: 'Product' },
                quantity: { type: Number }
            }
        ]
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

// module.exports = mongoose.model('User',UserSchema);

module.exports = mongoose.model('User',UserSchema);



// class User {
//     constructor(email, name) {
//         this.email = email;
//         this.name = name;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this)
//             .then(user => {
//                 console.log(user);
//             })
//             .catch(err => console.log(err))
//     }

//     static findById() {

//     }
// }




// const User = sequelize.define('user',{
//  id:{
//         autoIncrement: true,
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     name:{
//         allowNull: false,
//         type: Sequelize.STRING
//     },
//     email:{
//         allowNull:true,
//         type: Sequelize.STRING
//     },
//     phoneNum:{
//         allowNull:true,
//         type: Sequelize.STRING
//     },
// })

// module.exports = User;

