const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma de la station
const stationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
