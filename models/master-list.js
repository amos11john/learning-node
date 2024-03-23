const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterlistSchema = new Schema({	
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },	
    civilStatus: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },	
    birthdate: {
        type: String,
        required: true
    },
    address: [{}],
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    socialMedia: [{}],	
    leader: String,
    tenure: Date,	
    ministry: [{
        type: Map,
        of: String,
        startDate: Date,
    }],
    career: [{
        type: Map,
        of: String,
        startDate: Date,
        city: String,
        country: String
    }]
}, {timestamps : true});

const MasterList = mongoose.model('MasterList', masterlistSchema)
module.exports = MasterList;