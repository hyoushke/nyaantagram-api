const PostsService = require('../services/postsServices');
const BenchmarkUtils = require('../utils/benchmarkUtils');
const UtilsMailer = require('../utils/mailer');

const PostsCreateResponse = require('../response/posts/postsCreateResponse');
const PostsRemoveResponse = require('../response/posts/postsRemoveResponse');
const PostsUpdateResponse = require('../response/posts/postsUpdateResponse');
const PostsListResponse = require('../response/posts/postsListResponse');
const PostsGetResponse = require('../response/posts/postsGetResponse');
const PostsUploadImageResponse = require('../response/posts/postsUploadImageResponse');


exports.createPost = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const authorid = req.body.authorid; 
        const author = req.body.author; 
        const status = req.body.status; 
        const title = req.body.title; 
        const content = req.body.content; 
        const categories = req.body.categories; 
        const tags = req.body.tags; 
        const likes = 0; 
        const subscribers = 0; 
        const shares = 0; 
        const views = 0; 
        const imageurl = req.body.imageurl; 
        const datecreated = Date.now();
        const datemodified = Date.now();
        const postsServiceData = await PostsService.createPost(authorid, 
                                                                author, 
                                                                status, 
                                                                title, 
                                                                content, 
                                                                categories, 
                                                                tags, 
                                                                likes, 
                                                                subscribers, 
                                                                shares, 
                                                                views, 
                                                                imageurl, 
                                                                datecreated, 
                                                                datemodified);
        const jsonResponse = PostsCreateResponse.SuccessResponse(postsServiceData);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsCreateResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}

exports.updatePost = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const authorId = req.body.authorid; 
        const author = req.body.author; 
        const status = req.body.status; 
        const title = req.body.title; 
        const content = req.body.content; 
        const categories = req.body.categories; 
        const tags = req.body.tags; 
        const imageurl = req.body.imageurl; 

        const postId = req.params.postId;
        const postsServiceData = await PostsService
        .updatePost(postId,
                    authorId,
                    author, 
                    status, 
                    title, 
                    content, 
                    categories, 
                    tags, 
                    imageurl);

        const jsonResponse = PostsUpdateResponse.SuccessResponse(postsServiceData);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsUpdateResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}


exports.removePost = async (req, res, next)=>{
    try
    {   const benchmark = new BenchmarkUtils();
        const postId = req.params.postId;
        const postsServiceData = await PostsService.removePost(postId);
        const jsonResponse = PostsRemoveResponse.SuccessResponse(postsServiceData);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsRemoveResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}

exports.listPosts = async (req, res, next)=>{

    try
    {
        const benchmark = new BenchmarkUtils();
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const field = req.params.field;
        const value = req.param.value;

        const postsServiceData = await PostsService.listPosts(field, value, limit, page);
        const jsonResponse = PostsListResponse.SuccessResponse(postsServiceData);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsListResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}


exports.getPost = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const postId = req.params.postId;
        const postsServiceData = await PostsService.getPost(postId);
        //after fetching data
        //add new data for *views* 
        //*removed* views for now because.. adding a counter for a view
        //is not necessary unless this is a video.. like youtube
        //const viewsServiceData = await viewsService.addPostView(postId);

        const jsonResponse = PostsGetResponse.SuccessResponse(postsServiceData);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsGetResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}

exports.uploadPostImage = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        data = await {filename: req.newname};
    
        const jsonResponse = PostsUploadImageResponse.SuccessResponse(data);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsUploadImageResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}

exports.sendMailTest = async (req, res, next)=>{

    const utilsMailer = await UtilsMailer.send_mail();
    res.status(200).json({message: 'test only'});
}


exports.addViews = async (req, res, next)=>{

}

exports.addLikes = async (req, res, next)=>{

}

exports.addShares = async (req, res, next)=>{

}


