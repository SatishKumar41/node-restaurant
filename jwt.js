const jwt = require('jsonwebtoken');

const jwtAuthMiddleware =(req, res, next)=>{

    //Extract the JWT token from the request Header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return req.status(401).json({error: "Unauthorized"});
        try {
            //verify the JWT toekn
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Attach user info to request object
            req.user = decoded;
        } catch (err) {
            console.error(err);
            req.status(401).json({error: "Unauthorized"});
        }
}

//functionto generate token

    const generateToken = (userData)=>{
        return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:30});
    }

module.exports = {jwtAuthMiddleware, generateToken};