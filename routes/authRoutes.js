const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const authenticateToken = require('../middlewares/auth');


// Connexion utilisateur
router.post('/login',authenticateToken, async (req, res) => {
    const { email, phone, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { phone: phone }]
        });
        if (!user || user.password !== password) {
            return res.status(410).json({ message: 'Utilisateur non trouvé ou mot de passe incorrect' });
        }
        if (user.isBlocked) {
            return res.status(411).json({ message: 'Compte bloqué' });
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            console.log("user  : ", isValidPassword);
            return res.status(412).json({ message: 'Mot de passe incorrecte' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.token = token;
        await user.save();

        return res.status(200).json({ data: user, message: "Vous êtes connécté", token: token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});



module.exports = router;
