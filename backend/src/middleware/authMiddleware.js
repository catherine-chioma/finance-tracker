const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
