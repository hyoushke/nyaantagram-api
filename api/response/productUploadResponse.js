exports.SuccessResponse = (data)=>{
    const response = {
        status : 'OK',
        code : 200,
        message : 'Successfully created a new post',
        details : data,
        benchmark : 0
    }

    console.log(response);

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