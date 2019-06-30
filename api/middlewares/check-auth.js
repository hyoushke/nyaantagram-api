const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


module.exports = (req, res, next)=>{
    console.log('*******************');
    //console.log(req);
    console.log('*******************');

    try
    {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
    }
    catch(error)
    {
        return res.status(500).json({message: 'Autnentication Failed', code: 401, error: error});

    }

    console.log(next);

    next();
}