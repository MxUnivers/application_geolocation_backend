const express = require('express');
const router = express.Router();
const Station = require('../models/StationModel');

// Créer une station
router.post('/stations', async (req, res) => {
    try {
        const newStation = new Station(req.body);
        await newStation.save();
        res.status(201).json(newStation);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Obtenir toutes les stations
router.get('/stations', async (req, res) => {
    try {
        const stations = await Station.find();
        res.status(200).json(stations);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Obtenir une station par ID
router.get('/stations/:id', async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).json();
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Mettre à jour une station par ID
router.patch('/stations/:id', async (req, res) => {
    try {
        const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!station) {
            return res.status(404).json();
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Supprimer une station par ID
router.delete('/stations/:id', async (req, res) => {
    try {
        const station = await Station.findByIdAndDelete(req.params.id);
        if (!station) {
            return res.status(404).json();
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json(error);
    }
});



// Rendre une station active/inactive
router.patch('/stations/:id/active', async (req, res) => {
    try {
        const station = await Station.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true, runValidators: true });
        if (!station) {
            return res.status(404).json();
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;
