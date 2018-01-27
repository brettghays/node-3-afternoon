const swag = require('../models/swag');

module.exports = {
    add: (req,res,next) => {
        //const {session} = req;
        let {cart} = req.session.user
        const {id} = req.query;
        const index = cart.findIndex(x => x.id == id)
        //we want -1 because that means it was NOT in the cart
        if(index === -1){
            const selectedSwag = swag.find(x => x.id == id);
            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        } 
        res.status(200).send(req.session.user);
    },

    delete: (req,res,next) => {
        //const {session} = req;
        let {cart} = req.session.user
        const {id} = req.query;
        const selectedSwag = swag.find(x => x.id == id);
        if(selectedSwag){
            const index = cart.findIndex(x => x.id == id);
            cart.splice(index,1);
            req.session.user.total -= selectedSwag.price
        }
        
        res.status(200).send(req.session.user);
    },

    checkout: (req,res,next) => {
        const {user} = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user);
    }
}