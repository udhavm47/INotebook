/* this file is used for authentication or creating users */

import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express';
import bodyParser from 'body-parser';
//import { Router } from 'express';
import fetchuser from '../middleware/fetchuser.js';
import { body, validationResult } from 'express-validator';
//const User = require('../models/Users')
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs')
//const { body, validationResult } = require('express-validator');
//const express = require('express'); //imported express
//const bodyParser = require('body-parser');
const authRouter = express.Router(); //using router of mongoose
const secret = '!@#$%^&*()/<>?:{}[]';
//const fetchuser = require('../middleware/fetchuser')
const app = express();
app.use(express.json());


/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ROUTE 1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// below code is used to create a user 

/* Logic: 
1) first we take name, email, password from the user
2) will check none of them should not be empty and should follow the min length rule and in valid format
3) will check then if the email provided by user already exists or not
4) iff the above conditions satisfied ,then we will create hash of the password and will create the user and store it in the db
5) lastly we will return a jwt token to mark the successfull creation of user
 */
authRouter.post('/createuser', bodyParser.json(),[
        body('name', 'Name must be >= 5 char').isLength({min: 5}),
        body('email', 'Enter a valid email format').isEmail(),
        body('password', 'Min password length is 8').isLength({min:8})
    ], async (req, res) => { // below code is checking the requirements to create a user
        console.log(req.body);
        const result = validationResult(req);
        //console.log(result.formatter);
        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array()});
        }
        try{
        // below is checking of already existing emails
            let user = await User.findOne({email: req.body.email});
            if (user){
                return res.status(200).json({error:'Email already exists!'});
            }

            
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                    name: req.body.name,
                    password: secPass,
                    email: req.body.email
                })
            //return user;
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data,secret)
            res.status(200).send({token});
        }
        catch(error){
            return res.status(500).send('Something went wrong')
        }
        
        /*
        .then(user => res.json(user))
        .catch(err => res.json({error:'Email already exists!'}))
        */
    })


    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ROUTE 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// below code is to check whether the user is stored in our db or not ie. user is valid or not
/*   
Logic:
    1) first we take arguments or credentials from the client and check whether the creds should nopt be empty or email should be in valid format
    2) then we will compare that email if that exists in our system
    3) iff it exists the we compare the password entered by user with the one which is stored in our system 
    4) iff all this is valid we will return the authtoken to the user

*/

authRouter.post('/login', bodyParser.json(),[
    body('email', 'Enter a valid email format').isEmail(),
    body('password', 'Password cannot be blank').notEmpty()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()[0]["msg"]});
    }

    const {email,password} = req.body
    try{
        // below is checking of already existing emails
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error:'Invalid Credentials'});
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({error:'Invalid Credentials'});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data,secret)
        res.status(200).send({token});


    }catch(error){
        return res.status(500).send('Internal Server Error');
    }    


})

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ROUTE 3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/**
logic:
    It extracts the id of the user from req.user, which was attached by the fetchuser middleware. This id is typically stored in the JWT payload.
    It uses the id to fetch user data from the database using User.findById(userId).select("-password"). The .select("-password") part is used to exclude the user's password from the response for security reasons.
    If the user is found, it sends the user data as a JSON response.
    If there is any error during this process (e.g., a database error), it responds with a 500 status and an "Internal Server Error" message.
 */
    authRouter.post('/getuser', bodyParser.json(),fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
})


export default authRouter;