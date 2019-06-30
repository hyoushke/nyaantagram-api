const BenchmarkUtils = require('../utils/benchmarkUtils');
const UsersService = require('../services/usersServices');
const UsersResponse = require('../response/genericResponse');


exports.createUser = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const status = "Active"; 
        const username = req.body.username; 
        const email = req.body.email; 
        const password = req.body.password; 
        const firstname = req.body.firstname; 
        const lastname = req.body.lastname; 
        const gender = ''; 
        const avatar = ''; 
        const datecreated = Date.now();
        const datemodified = Date.now();

        const usersServiceData = await UsersService.createUser(status, username, email, password, firstname, lastname, gender, avatar, datecreated, datemodified);

        if(usersServiceData.status == 'FAILED') 
        {
            throw (usersServiceData.error);
        }

        const r = UsersResponse.genericResponse('users', 'create', 'success', usersServiceData.payload, benchmark.getDuration());

        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'create', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.loginUser = async (req, res, next)=> {
    try
    {
        const benchmark = new BenchmarkUtils();
        const email = req.body.email;
        const password = req.body.password;

        const usersServiceData = await UsersService.loginUser(email, password);

        if(usersServiceData.status == 'FAILED') 
        {
            throw (usersServiceData.error);
        }

        const r = UsersResponse.genericResponse('users', 'login', 'success', usersServiceData.payload, benchmark.getDuration());
        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'login', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.logoutUser = async (req, res, next)=> {

    try
    {
        const usersServiceData = await UsersServices.logoutUser(email);
        
        if(usersServiceData.status == 'FAILED') 
        {
            throw (usersServiceData.error);
        }

        const r = UsersResponse.genericResponse('users', 'login', 'success', usersServiceData.payload, benchmark.getDuration());
        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'login', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.updateUser = async (req, res, next)=>{
    try
    {   const benchmark = new BenchmarkUtils();
        const userId = req.params.userId;
        const usersServiceData = await UsersService.updateUser(userId);

        if(usersServiceData.status == 'FAILED')
        {
            throw (usersServiceData.error);            
        }

        const r = UsersResponse.genericResponse('users', 'update', 'success', usersServiceData.payload, benchmark.getDuration());
        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'update', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.removeUser = async (req, res, next)=>{
    try
    {   const benchmark = new BenchmarkUtils();
        const userId = req.params.userId;
        const usersServiceData = await UsersService.removePost(userId);

        if(usersServiceData.status == 'FAILED')
        {
            throw (usersServiceData.error);            
        }

        const r = UsersResponse.genericResponse('users', 'remove', 'success', usersServiceData.payload, benchmark.getDuration());
        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'remove', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.getUser = async (req, res, next)=>{
    try
    {   const benchmark = new BenchmarkUtils();
        const userId = req.params.userId;
        const usersServiceData = await UsersService.getUser(userId);

        if(usersServiceData.status == 'FAILED')
        {
            throw (usersServiceData.error);            
        }

        const r = UsersResponse.genericResponse('users', 'get', 'success', usersServiceData.payload, benchmark.getDuration());
        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'get', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.listUsers = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page);
        const field = req.params.field;
        const value = req.param.value;
        const userId = req.params.userId;
        const usersServiceData = await UsersService.listUsers(field, value, limit, page);

        if(usersServiceData.status == 'FAILED')
        {
            throw (usersServiceData.error);            
        }

        const r = UsersResponse.genericResponse('users', 'remove', 'success', usersServiceData.payload, benchmark.getDuration());
        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'remove', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}


