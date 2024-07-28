const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const sendEmail = require('../utils/sendEmail');

const ApplicationInfo = require('../utils/dataApi'); 
const authenticateToken = require('../middlewares/auth');


function generateRandomPasswordE(length) {
    const charset = "0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}



// Créer un utilisateur
router.post('/register',authenticateToken, async (req, res) => {
    try {
        const { phone, email } = req.body;
        const userExist = await User.findOne({ $or: [{ phone: phone }, { email: email }] });
        if (userExist) {
            return res.status(410).json({ message: `Cet utilisateur existe déjà avec ${phone} ou ${email}` });
        }
        const passwordRandom = generateRandomPasswordE(4);
        const hashedPassword = await bcrypt.hash(passwordRandom, 10);

        const newUser = new User(req.body);
        newUser.password = hashedPassword;
        await newUser.save();

        sendEmail(
            "aymarbly559@gmail.com",
            "a g c t x y x c o x s k v a g k",
            `${newUser.email}`,
            `${ApplicationInfo.name}`,
            `Votre mot de passe : ${passwordRandom}`
        );

        return res.status(200).json({ data: newUser, message: "Inscription réussie avec succès" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});




// Modifier un utilisateur
router.patch('/edit/:id',authenticateToken, async (req, res) => {
    try {
        const { phone, email } = req.body;
        const idUser = req.params.id;
        const userExist = await User.findById(idUser);
        if (!userExist) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        delete req.body.password;

        // Vérifier si le nouveau téléphone ou email est déjà utilisé par un autre utilisateur
        if (email && userExist.email !== email) {
            const userWithEmail = await User.findOne({ email: email });
            if (userWithEmail) {
                return res.status(410).json({ message: `Cet utilisateur existe déjà avec ${email}` });
            }
        }
        if (phone && userExist.phone !== phone) {
            const userWithPhone = await User.findOne({ phone: phone });
            if (userWithPhone) {
                return res.status(410).json({ message: `Cet utilisateur existe déjà avec ${phone}` });
            }
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: idUser }, req.body, { new: true, runValidators: true });

        return res.status(200).json({ data: updatedUser, message: "Mise à jour du compte réussie" });


    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});





// Bloquer/Débloquer un utilisateur
router.patch('/block/:id/block',authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isBlocked: req.body.isBlocked }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});





// Lister tous les utilisateurs
router.get('/get_users',authenticateToken, async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({data:users});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Obtenir un utilisateur par ID
router.get('/get_user/:id', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({data:user,message:"utilisateur récupérer avec succès "});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});






module.exports = router;
