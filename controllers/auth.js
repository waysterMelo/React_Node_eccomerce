const User = require('../model/user_model');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signUp = (req, res) =>{
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
          user
        });
    })
}

exports.signIn = (req, res) =>{
    const {email, password} = req.body;
    User.findOne({email}, (err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error: "User don`t exists"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email dont match'
            });
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie('t', token,{expire: new Date() + 9999});
        const {_id, name, email, role} = user;
        return res.json({token, user:{_id, email, name, role}});
    })

    

}

exports.signout = (req, res) =>{
    res.clearCookie("t");
    res.json({message: "SignOut sucessfully !  "})
}

exports.requireSign = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ["HS256"]
});

exports.isAuth = (req, res, next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
            return res.status(403).json({
                error: "Access Denied"
            });
    }
    next();
}

exports.isAdmin = (req, res, next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Access Denied, Admin resources."
        });
    }
    next();
}