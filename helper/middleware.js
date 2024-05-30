const jwt = require("jsonwebtoken");
require('dotenv').config();
 exports.authenticateToken=(req, res, next)=>{
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        status:"failed",
        message:"please login"
    });
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token', error: err });
        req.user = decoded;
        next();
    });
}