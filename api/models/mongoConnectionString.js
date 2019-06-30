
const {DB_MONGO_USER, DB_MONGO_PASSWORD, DB_MONGO_HOST, DB_MONGO_DATABASE } = process.env;
const muri = "mongodb://nyaantagram.localhost.mongo:27017/test";

const getConnectionString = ()=> {
    console.log(muri);
    return muri;

}


module.exports = getConnectionString;