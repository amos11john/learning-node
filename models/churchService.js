const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const churchServiceSchema = new Schema({
    service: {
        type: String,
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    place: String,
    city: String,
    region: String,
    services: [{
        time: {
            type: String,
            required: true
        },
        attendance: [{
            personID : String,
            isVIP: Boolean
        }]

    }]
},{timestamps : true})

const ChurchService = mongoose.model('ChurchService', churchServiceSchema)
module.exports = ChurchService;