const swag = require('../models/swag');

module.exports = {
    add: (req,res,next) => {
        const {session} = req;
        const {cart} = session.user
        const {id} = req.query;
        const index = cart.findIndex(x => x.id == id)
        //we want -1 because that means it was NOT in the cart
        if(index === -1){
            const selectedSwag = swag.find(x => x.id == id);
            cart.push(selectedSwag);
            session.user.total += selectedSwag.price;
        } 
        res.status(200).send(session.user);
    },

    delete: (req,res,next) => {
        const {session} = req;
        const {cart} = session.user
        const {id} = req.query;
        const selectedSwag = swag.find(x => x.id == id);
        if(selectedSwag){
            const index = cart.findIndex(x => x.id == id);
            cart.splice(index,1);
            session.user.total -= selectedSwag.price
        }
        
        res.status(200).send(session.user);
    },

    checkout: (req,res,next) => {
        const {session} = req;
        session.user.cart = [];
        session.user.total = 0;
        res.status(200).send(session.user);
    }
}