const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    animeList: [
        {
            mal_id: {type : Number},
            image: {type: String},
            title: {type: String},
            broadcastTime: {type: String},
            broadcastTimeZone: {type: String},
            score: {type: Number}
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User