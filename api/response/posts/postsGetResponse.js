exports.SuccessResponse = (data)=>{
    const response = {
        status : 'OK',
        code : 200,
        message : 'Successfully uploaded file',
        details : data,
        benchmark : ''
    }
    return response;
}

exports.FailedResponse = (error)=>{
    const response = {
        status : 'Failed',
        code : 500,
        message : 'Failed creating a new post',
        error : error
    }
}