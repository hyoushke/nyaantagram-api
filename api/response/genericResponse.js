
const getMessage = (controller, action, type)=>{
    const messages = {
        users: 
        {
            create : 
            {
             success: { status: 'OK', code: 201, message: 'Successfully created a new user' }, 
             failed: { status: 'FAILED', code: 400, message: 'Failed creating a new user' } 
            },
            update : 
            {
             success: { status: 'OK', code: 201, message: 'Successfully updated user' }, 
             failed: { status: 'FAILED', code: 400, message: 'Failed  a new user' } 
            },
            remove : 
            {
             success: { status: 'OK', code: 201, message: 'Successfully created a new user' }, 
             failed: { status: 'FAILED', code: 400, message: 'Failed creating a new user' } 
            },
            get : 
            {
             success: { status: 'OK', code: 201, message: 'Successfully created a new user' }, 
             failed: { status: 'FAILED', code: 400, message: 'Failed creating a new user' } 
            },
            list:
            {
                success: { status: 'OK', code: 200, message: 'Successfully fetched list of users' }, 
                failed: { status: 'FAILED', code: 400, message: 'Failed fetching list of users' } 
            },
            login:
            {
                success: { status: 'OK', code: 200, message: 'Successfully logged in user' }, 
                failed: { status: 'FAILED', code: 400, message: 'Failed logging in user' } 
            },
            logout:
            {
                success: { status: 'OK', code: 200, message: 'Successfully logged in user' }, 
                failed: { status: 'FAILED', code: 400, message: 'Failed logging in user' } 
            },
 
        },
        comments: 
        {
            create : 
            {
             success: { status: 'OK', code: 201, message: 'Successfully created a new comment' }, 
             failed: { status: 'FAILED', code: 400, message: 'Failed creating a new comment' } 
            },
            list:
            {
                success: { status: 'OK', code: 200, message: 'Successfully fetched list of comments' }, 
                failed: { status: 'FAILED', code: 400, message: 'Failed fetching list of comments' } 
            },
        }
    }



    return messages[controller][action][type];
}

exports.genericResponse = (controller, action, type, data, benchmark)=>{
    const r = getMessage(controller, action, type);
    if(type == 'failed')
    {
        data = {error: data};
    }
    const response = {
        status : r.status,
        code : r.code,
        message : r.message,
        details : data,
        benchmark : benchmark
    }
    return response;
}

