const express = require("express");
const orderRouter = express.Router();

//Get Order by restaurants
orderRouter.route('/order/restaurant/:id').get((req, res) => {
    Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: '+err));
});

orderRouter.route('/order/update/:id').get((req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        order.status = req.body.status;
        order.amount = req.body.amount;
        
        order.save()
        .then(() => res.json('Order updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

orderRouter.route('/order/:id').get((req, res) => {
    Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: '+err));
});




module.exports=orderRouter;