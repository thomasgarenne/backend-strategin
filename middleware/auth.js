const jwt = require("jsonwebtoken");

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Authorization header is missing');
    }

    const decodedToken = jwt.verify(token, secretKey);

    req.user = {
      userId: decodedToken.userId
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized', message: error.message });
  }
};

module.exports = auth;
