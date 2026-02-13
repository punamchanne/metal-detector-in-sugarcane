const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('Token verified successfully for user ID:', jwt.decode(token).id);

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            console.log('User verified:', req.user ? req.user.email : 'User not found in DB');

            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            res.status(401);
            throw new Error('Not authorized: ' + error.message);
        }
    }

    if (!token) {
        console.log('No token found in Authorization header:', req.headers.authorization);
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
