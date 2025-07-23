const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;


function verifyToken(req, res, next){
    // console.log(req.cookies);
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({error: 'Missing token'});
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({error: 'Invalid token'});
    }
}

module.exports = {verifyToken};