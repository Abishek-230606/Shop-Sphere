const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

const getProducts = (page, limit, search) => {
    const rawData = fs.readFileSync(dbPath);
    let data = JSON.parse(rawData).products;

    if (search) {
        const lowerSearch = search.toLowerCase();
        data = data.filter(p => 
            p.product_name.toLowerCase().includes(lowerSearch) || 
            p.description.toLowerCase().includes(lowerSearch)
        );
    }

    const totalCount = data.length;

    if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        data = data.slice(startIndex, endIndex);
    }

    return { products: data, totalCount };
};

const getProductById = (id) => {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData).products;
    return data.find(p => p.id === parseInt(id));
};

module.exports = {
    getProducts,
    getProductById
};
