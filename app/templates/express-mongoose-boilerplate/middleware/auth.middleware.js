

const authMiddleware = (req,res,next) => {
if(!req || !req.headers || !req.headers["Authorization"]) {
   return res.status(401).json({message: "Unauthorized User"});
}
else {
   // check if authorization header, matches the user in the database
}

next();
}


module.exports = {
    authMiddleware
}