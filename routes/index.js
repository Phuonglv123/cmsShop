const express = require('express');
const router = express.Router();
const multer = require('multer');
const _ = require('lodash');
const auth = require('../middleware/auth');

const Categories = require('../models/category');
const Product = require('../models/product');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let validateFile = function (file, cb) {
    let allowedFileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG, JPG file are allowed.")
    }
}

let upload = multer(
    {
        storage: storage,
        limits: {fileSize: 2000000},
        fileFilter: function (req, file, callback) {
            validateFile(file, callback);
        }
    }
);


router.get('/cate', auth, function (req, res, next) {
    Categories
        .find()
        .then(teams => {
            res.status(200).json({data: teams})
        })
        .catch(e => {
            return res.status(500).json({error: 'server not found'})
        })
});

router.post('/category/create', auth, (req, res, next) => {
    Categories.findOne({name: req.body.name}).then(cate => {
        if (cate) return res.status(400).json({errors: 'Can not create cate'})
        const newCate = new Categories({...req.body})
        newCate.save().then(cate => {
            return res.status(200).json({cate})
        }).catch(e => {
            return res.status(500).json({error: e})
        })
    }).catch(e => {
        return res.status(500).json({error: e})
    })
})

router.post('/cate/:id', (req, res, next) => {
    const id = req.params;
    Categories.findByIdAndUpdate(id).then(cate => {
        if (!cate) return res.status(400).json({error: "name is not found"});
        cate.name = req.body.name;
        return cate.save()
            .then(() => res.status(200).json({data: 'Change info user success'}))
            .catch((e) => {
                return res.status(500).json(e)
            })
    }).catch(() => {
        return res.status(500).json({error: 'server not found'})
    })
})

router.get('/product', auth, function (req, res, next) {
    Product
        .find()
        .then(products => {
            res.status(200).json({data: products})
        })
        .catch(e => {
            return res.status(500).json({error: 'server not found'})
        })
});

router.post('/product/create', auth, upload.array('image', 2), (req, res, next) => {
    Product.findOne({name: req.body.name}).then(product => {
        if (product) return res.status(400).json({errors: 'Can not create cate'})
        const newProduct = new Product({...req.body, images: _.map(req.body.files, (image) => image.path),})
        newProduct.save().then(products => {
            return res.status(200).json({products})
        }).catch(e => {
            return res.status(500).json({error: e})
        })
    }).catch(e => {
        return res.status(500).json({error: e})
    })
})

router.post('/product/:id', (req, res, next) => {
    const id = req.params;
    Product.findByIdAndUpdate(id).then(product => {
        if (!product) return res.status(400).json({error: "name is not found"});
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.unitAmount = req.body.unitAmount;
        product.stock = req.body.stock;
        product.desc = req.body.desc;
        return product.save()
            .then(() => res.status(200).json({data: 'Change info user success'}))
            .catch((e) => {
                return res.status(500).json(e)
            })
    }).catch(() => {
        return res.status(500).json({error: 'server not found'})
    })
})


module.exports = router;
