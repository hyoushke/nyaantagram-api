const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoooseConnect = require('./mongoConnectionString');

const muri = mongoooseConnect();

mongoose.connect(muri), {useNewUrlParser: true};
mongoose.Promise = global.Promise;


const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status : {type: String, required : true},
    username : {type: String, required : true},
    email : {type: String, required: true, unique: true, match: /^\S+@\S+$/},
    password : {type: String, required : true},
    firstname : {type: String, required : false},
    lastname : {type: String, required : false},
    gender : {type: String, required : false},
    avatar : {type: String, required : false},
    datecreated : {type: String, required : true},
    datemodified : {type: String, required : true}
});

usersSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Users', usersSchema);