const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const ObjectId = require('mongoose').Types.ObjectId;
const UsersModel = require('../models/usersModel');


const createUser = async (status, username, email, password, firstname, lastname, gender, avatar, datecreated, datemodified)=>{

    const svc = {status: 'OK', payload: [], error: ''};

    try
    {
        const userData = await getUserByEmail(email);

        if(userData.status == 'OK')
        {
            throw ("Email Already Exists");
        }

        const brcyptPassword = await getBrcryptPassword(password);
        if(brcyptPassword == "")
        {
            throw ("Password could not be encripted");
        }

        const User = new UsersModel({
            _id: new mongoose.Types.ObjectId(),
            status : status,
            username : username,
            email : email,
            password : brcyptPassword,
            firstname : firstname,
            lastname : lastname,
            gender : gender,
            avatar : avatar,
            datecreated : datecreated,
            datemodified : datemodified,
        });
    
        const usersServiceData = await User
        .save()
        .then(doc=>
        {
            return doc;
        })
        .catch(error=>
        {
            return error;
        });

        if(!usersServiceData._id)
        {
            throw ("User was not Created");
        }

        svc.payload.push(usersServiceData);
        return svc;

    }
    catch(error)
    {
        svc.payload = [];
        svc.status = 'FAILED';
        svc.error = error;
        return svc;
    }
};

const getUser = async (userId)=>{
    return {};
};

const updateUser = async (userId)=>{
    return {};
};

const removeUser = async (userId)=>{
    return {};
};

const listUsers = async ()=>{

    return {};
};



const getUserByEmail = async (email)=>{

    const data = {status: 'OK', payload: [], error: ''};

    try
    {
        const userData = await UsersModel.find({email: email})
        .exec()
        .then(doc=>
        {
            return doc[0];
        })
        .catch(error=>
        { 
            return error
        });

        console.log(userData);

        if(userData.email)
        {
            data.payload.push(userData);
            return data;
        }

        throw ("Email does not exists");
        
    }
    catch(error)
    {
        data.status = 'FAILED';
        data.payload = [];
        data.error = error;

        return data;
    }
};

const getBrcryptPassword = async (password)=>{
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

const isUserExists = async ()=>{

};

const loginUser = async (email, password)=> {
    const svc = {status: 'OK', payload: [], error: ''};

    try
    {
        const userData = await getUserByEmail(email);
        if(userData.status == 'FAILED')
        {
            throw ("Email does not exist");
        }

        const hashedPassword = userData.payload[0].password;
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        if(isPasswordMatch)
        {
            const token = jwt.sign(
                {
                    email: userData.payload[0].email, 
                    id: userData.payload[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );

            svc.payload.push({token: token});  
            return svc;
        }
        else
        {
            throw ("Password did not match");
        }
    }
    catch(error)
    {
        svc.payload = [];
        svc.status = 'FAILED';
        svc.error = error;
        return svc;
    }
}

const logoutUser = async (email)=> {

}

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
exports.getUser = getUser;
exports.listUsers = listUsers;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;