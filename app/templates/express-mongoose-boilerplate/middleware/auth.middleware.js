

const authMiddleware = (req,res,next) => {
if(!req.headers["Authorization"]) {
    res.status(401).json({message: "Unauthorized user"});
    return;
}
else {
   // check if authorization header, matches the user in the database
}

next();
}


module.exports = {
    authMiddleware
}