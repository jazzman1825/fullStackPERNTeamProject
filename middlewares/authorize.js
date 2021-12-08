const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    // Get token from authorization header
    const getToken = req => {
        const authorization = req.get('authorization');
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            return authorization.substring(7);
        }
        return null;
    }

    try {
        const token = getToken(req);
        // Verify and decode token
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: "Token missing or invalid" })
          }
        console.log(decodedToken)

        req.user = decodedToken;
        next();
        
    } catch (err) {
        console.error(err.message)
        return res.status(401).json({ error: "Token missing or invalid" });     
    }
}