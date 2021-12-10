const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new Error('not authenticated');
    }

    const token = authHeader.split(' ')[1];
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) throw new Error('Not authenticated');

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.json({ error: 'Not authenticated' });
  }
};

module.exports = isLoggedIn;
