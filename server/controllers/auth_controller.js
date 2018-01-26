const users = require('../models/users');
let id = 1;

export.modules = {
    login: (req,res,next) => {
        const {session} = req;
        const {username,password} = req.body;
        const user = users.find(x => x.username === username && x.password === password);
        if(user){
            session.user.username = username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Go Home Freddy!');
        }
        },

    register: (req,res,next) => {
        const {session} = req;
        const {username,password} = req.body;
        users.push({id,username,password});
        id++;
        session.user.username = username;
        res.status(200).send(session.user);
    },

    signout: (req,res,next) => {
        const {session} = req;
        session.destroy();
        res.status(200).send(session.user);

    },

    getUser: (req,res,next) => {
        const {session} = req;
        res.status(200).send(session.user);
    }
}