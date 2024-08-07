const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];   //Bearer eyfdgfdg

    if(token == null){
        res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "bookstore123", (err, user) => {
        if(err){
            return res.status(403).json({ message: "Token expired. Please signin again" });
        }
        res.user = user;
        next();
    })
}

module.exports = { authenticateToken };