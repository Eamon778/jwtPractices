const User = require('../models/user')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');
const {createAccessToken, createRefreshToken} = require('../config/tokenGenerator')

const getAllData = (req, res)=>{
    res.status(200).json({message: 'getting all the data'})
}

const register = [
    body('username').isString().notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim(),
    body('name').isString().notEmpty().trim(),
    body('phone').matches(/^\+8801\d{10}$/).withMessage('Invalid phone number format'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, name, phone, address } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                name,
                phone,
                address,
            });

            const accessToken = createAccessToken(newUser)
            const refreshToken = createRefreshToken(newUser)
            newUser.refreshToken = refreshToken
            await newUser.save();

            res.status(201).json({message: 'User registered successfully', user: newUser, accessToken, refreshToken});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },
];

const login = (req, res)=>{

}

module.exports = {getAllData, login, register}