const jwt = require('jsonwebtoken');

// Middleware to verify JWT Token
const authMiddleware = (req, res, next) => {
    // Check if the Authorization header is present
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Extract the token from the header (Bearer <token>)
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Attach the decoded payload to the request (usually user ID)
        req.user = decoded;

        // Move to the next middleware or route
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
