const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma de la transaction mis à jour
const transactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: false
    },
    kilowattConsumed: {
        type: Number,
        required: true
    },
    batteryPercentage: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    pricePerMinute: {
        type: Number,
        required: true
    },
    timeSpent: {
        type: Number,
        required: true // en secondes
    },
    totalCost: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
