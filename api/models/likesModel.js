const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoooseConnect = require('./mongoConnectionString');

const muri = mongoooseConnect();

mongoose.connect(muri), {useNewUrlParser: true};
mongoose.Promise = global.Promise;

const likesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: {type: String, required: true},
    postid: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    datecreated: {type: String, required: true},
    datemodified: {type: String, required: true}
});

likesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Likes', likesSchema);