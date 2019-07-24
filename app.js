const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const usersRoutes = require('./api/routes/usersRoutes');
const productRoutes = require('./api/routes/productsRoute');

const postsRoutes = require('./api/routes/postsRoutes');
const commentsRoutes = require('./api/routes/commentsRoutes');
//const likesRoutes = require('./api/routes/likesRoutes');
//const sharesRoutes = require('./api/routes/sharesRoutes');


app.use(cors());

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
*/

app.use('/products', productRoutes);
app.use('/users', usersRoutes);

app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

/*
    uid - id of user viewing
    comment - comment of the the user
    postId - postid 
*/

//app.use('/likes', likesRoutes);
/*
    uid - id of user viewing
    postId - postid 
*/
//app.use('/shares', sharesRoutes);
/*
    uid - id of user who is sharing the post
    postId - postid 
*/






//app.use( (req, res, next)=>{
//          res.status(200).json(
//              {message: 'Hello Restful API Node'}
//          );
//
//    });


//error handling
//not found

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next)=>{
    res.error = error.status || 500;
    res.json({error : {message: error.message}});

    

});

module.exports = app;