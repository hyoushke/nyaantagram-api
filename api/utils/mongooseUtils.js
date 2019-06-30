const mongoose = require('mongoose');
const {DB_MONGO_USER, DB_MONGO_PASSWORD, DB_MONGO_HOST, DB_MONGO_DATABASE } = process.env;
const muri = `mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}/${DB_MONGO_DATABASE}?retryWrites=true`;
mongoose.connect(muri);
mongoose.Promise = global.Promise;

console.log(mongoose);

exports.mongoose = ()=>{
    return mongoose;
};