const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    quantity:{
        type: INTEGER,
        required: true
    },
    OrderId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})


module.exports = mongoose.model('Order',OrderSchema);