const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    codePostal :{type:String},
    email: {
        type: String,
        unique: true,
        sparse: true // Permet d'accepter des valeurs nulles
    },
    profilePicture: {
        type: String,
        required: false,
        default:""
    },
    phone: {
        type: String,
        unique: false,
        required:true
    },
    address: {
        type: String,
        required:false,
        default:"Abidjan"
    },
    password: {
        type: String,
        required: false
    },
    passwordverifield:{
        type:String,
        required:false
    },
    balance: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },


    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// // Méthode statique pour initialiser les utilisateurs
// userSchema.statics.initializeUsers = async function() {
//     const usersCount = await this.countDocuments();
//     if (usersCount === 0) {
//         const saltRounds = 10;

//         const users = [
//             {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 email: 'aymarbly559@gmail.com',
//                 phone: '0102030405',
//                 password: await bcrypt.hash('1234', saltRounds),
//                 address:"Abidjan"
//             },
//             {
//                 firstName: 'Jane',
//                 lastName: 'Smith',
//                 email: 'jane.smith@example.com',
//                 phone: '0607080910',
//                 password: await bcrypt.hash('1234', saltRounds),
//                 address:"Abidjan"
//             },
//             {
//                 firstName: 'Alice',
//                 lastName: 'Johnson',
//                 email: 'alice.johnson@example.com',
//                 phone: '0506070809',
//                 password: await bcrypt.hash('1234', saltRounds),
//                 address:"Abidjan"
//             }
//         ];

//         await this.insertMany(users);
//         console.log('Utilisateurs initialisés avec succès.');
//     } else {
//         console.log('Les utilisateurs existent déjà.');
//     }
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
