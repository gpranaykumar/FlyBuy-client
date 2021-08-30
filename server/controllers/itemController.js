const Item = require('../models/Item');


module.exports.getItems = (req, res) => {
    Item.find().sort({date: -1})
        .then(items => res.json(items));
}
module.exports.postItem = (req, res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
}

module.exports.updateItem = (req, res) => {
    Item.findByIdAndUpdate({_id: req.params.id }, req.body)
        .then(item => {
            Item.findOne({ _id: req.params.id})
                .then(item => res.json(item));
        });
} 
module.exports.deleteItem = (req, res ) => {
    Item.findByIdAndDelete({_id: req.params.id})
        .then(item => res.json({success: true}));
}
