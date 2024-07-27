const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma du trajet
const tripSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    },
    endLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    distance: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
