const CommentsService = require('../services/commentsServices');
const BenchmarkUtils = require('../utils/benchmarkUtils');
const CommentsResponse = require('../response/genericResponse');

exports.createComment = async (req, res, next)=>{
    try
    {

        const benchmark = new BenchmarkUtils();
        const status = "Active"; 
        const postid = req.body.postid; 
        const userid = req.body.userid; 
        const comment = req.body.comment; 
        const datecreated = Date.now();
        const datemodified = Date.now();
        const commentsServiceData = await CommentsService.createComment(status, 
                                                                        postid, 
                                                                        userid, 
                                                                        comment, 
                                                                        datecreated, 
                                                                        datemodified);
        console.log('*********************************************');
        console.log(commentsServiceData);
        console.log('*********************************************');
        if(commentsServiceData.error) 
        {
            throw (commentsServiceData.error);
        }

        const r = CommentsResponse.genericResponse('comments', 'create', 'success', commentsServiceData, benchmark.getDuration());

        res.status(r.code).json(r);
    }
    catch(error)
    {
        console.log('*********************************************');
        console.log('CATCH');
        console.log('*********************************************');

        const r = CommentsResponse.genericResponse('comments', 'create', 'failed', error, '0 ms');
        console.log('*********************************************');
        console.log(r);
        console.log('*********************************************');

        res.status(r.code).json(r);
    }
}
