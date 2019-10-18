const express = require("express");
const itemRouter = express.Router();
let Item = require('../models/item.model');

itemRouter.route('/item').get((req, res) => {
    Item.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

itemRouter.route('/item/add').post((req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    const section = req.body.section;
    const newItem = new Item({
        name,
        price,
        description,
        image,
        section
    });
    newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

itemRouter.route('/item/:id').get((req, res) => {
    Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: '+err));
});

itemRouter.route('/item/update/:id').post((req, res) => {
    Item.findById(req.params.id)
    .then(item => {
        item.name = req.body.name;
        item.price = req.body.price;
        item.description = req.body.description;
        item.image = req.body.image;
        item.section = req.body.section;
        item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: '+err))
    })
    .catch(err => res.status(400).json('Error: '+err));
});

itemRouter.route('/item/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted'))
    .catch(err => res.status(400).json('Error: '+err))
});

//Search for items to be added

module.exports=itemRouter;