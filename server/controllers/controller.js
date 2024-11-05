const User = require('../models/user')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');
const {createAccessToken, createRefreshToken} = require('../config/tokenGenerator')
const jwt = require('jsonwebtoken')

const getAllData = (req, res)=>{
    res.status(200).json({message: 'getting all the data'})
}

const register = [
    // Validation middleware
    body('username').isString().notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim(),
    body('name').isString().notEmpty().trim(),
    body('phone'),

    // Handle registration request
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, name, phone, address } = req.body;

        try {
            // Check if user with this email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user document
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                name,
                phone,
                address,
            });

            // Generate tokens
            const accessToken = createAccessToken(newUser);
            const refreshToken = createRefreshToken(newUser);
            newUser.refreshToken = refreshToken;

            // Save new user to the database
            await newUser.save();

            // Set secure cookies
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            });

            // Remove sensitive fields before sending response
            const { password: _, refreshToken: __, ...userData } = newUser.toObject();
            res.status(201).json({ message: 'User registered successfully', user: userData });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },
];

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate tokens
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        // Save refresh token in user document
        user.refreshToken = refreshToken;
        await user.save();

        // Set cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });

        const { password: _, refreshToken: __, ...userData } = user.toObject();
        res.status(200).json({ message: 'Login successful', user: userData });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};


const newAccessToken = async (req, res) =>{
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401)

    const user = await User.findOne({refreshToken})
    if (!user) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userPayload)=>{
        if (err) return res.sendStatus(403);

        const accessToken = createAccessToken(userPayload)

        res.status(200).json({accessToken})
    })

    
}

module.exports = {getAllData, login, register, newAccessToken}