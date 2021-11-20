const errorHandle = require('../helpers/dbErrorHandler');
const category_model = require('../model/category_model');

exports.create = (req, res) => {
    const category = new category_model(req.body);
    category.save( (err, category) => {
        if(err){
            return res.status(400).json({
                error: errorHandle(err)
            })
        }
        res.json({category});
    })
}