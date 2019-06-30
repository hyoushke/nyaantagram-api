const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoooseConnect = require('./mongoConnectionString');

const muri = mongoooseConnect();

mongoose.connect(muri), {useNewUrlParser: true};
mongoose.Promise = global.Promise;

const commentsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: {type: String, required: true},
    postid: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    comment: {type: String, required: true},
    datecreated: {type: String, required: true},
    datemodified: {type: String, required: true},
});

commentsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comments', commentsSchema);



