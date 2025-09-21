const Jasonwebtoken = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

function UserToken(req, res,next){
    const authorizeFromHeader = req.headers["authorization"];
    const token = authorizeFromHeader && authorizeFromHeader.split(" ")[1]; //hoppar över Bearer och tar ut token som är 2:a platsen i arrayen
            if(!token){
                return res.status(401).json({error: ">Ingen token tillträde nekas"})
            }
        
        Jasonwebtoken.verify(token, SECRET_KEY,(err, user) =>{
            if(err){
                return res.status(403).json({error: "ogiltig token"});
            }
            req.user = user;
            next();
        })
}
module.exports = UserToken;