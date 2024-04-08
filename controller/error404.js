const path = require('path');
module.exports.errorController = (req,res,next) =>{
 res.status(404).sendFile(path.join(__dirname,'../','views','error404.html'));
}