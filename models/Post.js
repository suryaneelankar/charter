const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
    // timestamps: true,
})

module.exports = mongoose.model('Post',PostSchema);