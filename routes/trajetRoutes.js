const express = require('express');
const router = express.Router();
const Trip = require('../models/TrajetModel');

// Créer un trajet
router.post('/trips', async (req, res) => {
    try {
        const newTrip = new Trip(req.body);
        await newTrip.save();
        res.status(201).send(newTrip);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir tous les trajets
router.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find().populate('userId');
        res.status(200).send(trips);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir un trajet par ID
router.get('/trips/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('userId');
        if (!trip) {
            return res.status(404).send();
        }
        res.status(200).send(trip);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un trajet par ID
router.patch('/trips/:id', async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!trip) {
            return res.status(404).send();
        }
        res.status(200).send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un trajet par ID
router.delete('/trips/:id', async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            return res.status(404).send();
        }
        res.status(200).send(trip);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
