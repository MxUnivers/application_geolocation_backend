const express = require('express');
const router = express.Router();
const Transaction = require('../models/TransactionModel');

// Créer une transaction
// Créer une transaction


router.post('/register', async (req, res) => {
    try {
        const { user, station, kilowattConsumed,address, batteryPercentage, timeSpent } = req.body;
        
        
        // Calculer le coût total de la transaction
        const totalCost = kilowattConsumed * 150  ;
        
        const newTransaction = new Transaction({
            user,
            kilowattConsumed,
            address,
            timeSpent,
            totalCost
        });

        await newTransaction.save();
        return res.status(200).json({ data: newTransaction, message: "Transaction saved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Obtenir toutes les transactions
router.get('/get_transactions', async (req, res) => {
    try {
    

        const transactions = await Transaction.find({});
        const phoneNumber = '0595387052';
        

        return res.status(200).json({ data: transactions.reverse(), message: "Transactions retrieved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Obtenir toutes les transactions
router.get('/get_transactions/user', async (req, res) => {
    try {
        const { userId } = req.query;
        let filter = {};
        if (userId) filter.user = userId;
        // if (stationId) filter.station = stationId;

        const transactions = await Transaction.find(filter)
        return res.status(200).json({ data: transactions.reverse(), message: "Transactions retrieved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Obtenir une transaction par ID
router.get('/get_transaction/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('user').populate('station');
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        return res.status(200).json({ data: transaction, message: "Transaction retrieved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
