const express = require('express');
const productService = require('../services/productService');
const router = express.Router();

router.get('/', (req, res) => {
    setTimeout(() => {
        const page = req.query._page || req.query.page;
        const limit = req.query._limit || req.query.limit;
        const search = req.query.q || req.query.search;
        
        const { products, totalCount } = productService.getProducts(page, limit, search);
        res.setHeader('x-total-count', String(totalCount));
        res.json(products);
    }, 2000);
});

router.get('/:id', (req, res) => {
    setTimeout(() => {
        const product = productService.getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({});
        }
    }, 2000);
});

module.exports = router;
