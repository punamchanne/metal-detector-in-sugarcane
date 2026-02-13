const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Force lowercase email
    const emailLower = email.toLowerCase();

    // Check if user exists
    const userExists = await User.findOne({ email: emailLower });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`Creating user: ${emailLower}`);
    let user;
    try {
        // Create user
        user = await User.create({
            name,
            email: emailLower,
            password: hashedPassword
        });
        console.log('User.create finished. Result:', user);
    } catch (dbError) {
        console.error('DATABASE ERROR during User.create:', dbError);
        res.status(500);
        throw new Error('Database write failed: ' + dbError.message);
    }

    if (user) {
        console.log(`User created successfully with ID: ${user._id}`);
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        console.error('User.create returned null/undefined');
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();

    // Check for user email
    const user = await User.findOne({ email: emailLower });

    console.log(`Login attempt for: ${emailLower}`);
    if (user) {
        console.log('User found.');
    } else {
        console.log('User NOT found.');
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        console.log('Password match failed or user not found');
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.json(req.user);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
