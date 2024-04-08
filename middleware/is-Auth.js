const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader){
        const error = new Error('Authorization error occuered');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.replace('Bearer ', '');
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'somesupersecretkey');
    }catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Authorization error occuered');
        error.statusCode = 401;
        throw error;
    }
    console.log('decodedToken is::>>',decodedToken)
    req.userId = decodedToken.userId;
    next();
}