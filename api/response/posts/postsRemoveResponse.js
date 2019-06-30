exports.SuccessResponse = (data)=>{
    const response = {
        status : 'OK',
        code : 200,
        message : 'Successfully removed post',
        details : data,
        benchmark : 0
    }
    return response;
}

exports.FailedResponse = (error)=>{
    const response = {
        status : 'Failed',
        code : 500,
        message : 'Failed removing post',
        error : error
    }
}