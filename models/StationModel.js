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



// Méthode statique pour initialiser les stations
stationSchema.statics.initializeStations = async function() {
    const stationsCount = await this.countDocuments();
    if (stationsCount === 0) {
        const stations = [
            {
                name: 'Station Cocody',
                address: 'Adresse Cocody',
                longitude: -3.983557,
                latitude: 5.354251,
                equipment: 'Equipement Cocody'
            },
            {
                name: 'Station Yopougon',
                address: 'Adresse Yopougon',
                longitude: -4.070051,
                latitude: 5.338054,
                equipment: 'Equipement Yopougon'
            },
            {
                name: 'Station Abobo',
                address: 'Adresse Abobo',
                longitude: -4.021650,
                latitude: 5.423147,
                equipment: 'Equipement Abobo'
            },
            {
                name: 'Station Marcory',
                address: 'Adresse Marcory',
                longitude: -3.966540,
                latitude: 5.303651,
                equipment: 'Equipement Marcory'
            },
            {
                name: 'Station Treichville',
                address: 'Adresse Treichville',
                longitude: -4.005363,
                latitude: 5.301590,
                equipment: 'Equipement Treichville'
            },
            {
                name: 'Station Plateau',
                address: 'Adresse Plateau',
                longitude: -4.031696,
                latitude: 5.324864,
                equipment: 'Equipement Plateau'
            },
            {
                name: 'Station Koumassi',
                address: 'Adresse Koumassi',
                longitude: -3.966958,
                latitude: 5.291924,
                equipment: 'Equipement Koumassi'
            },
            {
                name: 'Station Adjamé',
                address: 'Adresse Adjamé',
                longitude: -4.031080,
                latitude: 5.369081,
                equipment: 'Equipement Adjamé'
            }
            // Ajoutez d'autres stations pour les autres communes d'Abidjan ici
        ];

        await this.insertMany(stations);
        console.log('Stations initialisées avec succès.');
    } else {
        console.log('Les stations existent déjà.');
    }
};



const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
