const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma de l'utilisateur
const userSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        sparse: true // Permet d'accepter des valeurs nulles
    },
    phone: {
        type: String,
        unique: false,
        sparse: true // Permet d'accepter des valeurs nulles
    },
    password: {
        type: String,
        required: false
    },
    balance: {
        type: Number,
        default: 15000
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
