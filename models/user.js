const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    about: {
        type: String,
        
    },
    displayName: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    id: {
        type: String,
       
    }
    // joinDate: {
    //     type: Date,
    //     required: true,
    //     default: Date.now  //
    // }
})

module.exports = mongoose.model('User', userSchema)