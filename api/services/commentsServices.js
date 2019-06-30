const CommentsModel = require('../models/commentsModel');
const PostsModel = require('../models/postsModel');
const UsersModel = require('../models/usersModel');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;



exports.createComment = async (status, 
                            postId, 
                            UserId, 
                            comment, 
                            datecreated, 
                            datemodified)=>{

    const isValidPostId = ObjectId.isValid(postid);
    const isValidUserId = ObjectId.isValid(userid);

    //Check if ObjectId is Valid
    if(!isValidPostId || !isValidUserId)
    {
        return {error: "Post Id or User Id is not Valid"};
    }
    //Check if ID's exist
    const isPostIdFound = await PostsModel.findById(postId).select('_id').then(doc=>{return true}).catch(error=>{return false});
    const isUserIdFound = await UsersModel.findById(UserId).select('_id').then(doc=>{return true}).catch(error=>{return false});
    if(!isPostIdFound || !isUserIdFound)
    {
        return {error: "Post Id or User Id does not exist"};
    }


    const Comment = new CommentsModel({
        _id: new mongoose.Types.ObjectId(),
        status: status,
        postid: postId,
        userid: UserId,
        comment: comment,
        datecreated: datecreated,
        datemodified: datemodified,
    });

    const commentsServiceData = await Comment
    .save()
    .then(result=>
    {
        console.log(result);
        const resultData = result;
        return resultData;
    })
    .catch(error=>
    {
        return error;
    });


    return commentsServiceData;
}


exports.listComments = (field, value, limit, page) => {
    
    const skip = (limit * page) - limit;
    const startat = skip + 1;
    console.log('limit ' + limit);
    console.log('page ' + page);
    console.log('skipped ' + skip + ' rows, and start at row ' + startat );


    const query =
    {
        status: /Active/
        //'name.last': 'Ghost',
        //authorid: { $gt: 1, $lt: 66 },
        //likes: { $in: ['vaporizing', 'talking'] }
    }

    const options = {
        select:   '_id status postid comment datecreated datemodified',
        sort:     {author: 1},
        lean:     true,
        offset:   skip, 
        limit:    limit
    };

    const postsServiceData = PostsModel
    .paginate(query, options)
    .then(result=>{
                //if(rows.length >= 0)
                //{
                    const posts = result.docs.map(doc=>
                    {
                        return {id: doc._id, 
                                authorid: doc.authorid,
                                author: doc.author,
                                status: doc.status,
                                title: doc.title, 
                            }
                    });
                    result.docs = posts;
                    result.totalpages = Math.ceil(parseInt(result.totalDocs)/ limit);
                    return result;
                //}
    })
    .catch(resultError=>
    {
        return resultError;
    });

    return postsServiceData;

}