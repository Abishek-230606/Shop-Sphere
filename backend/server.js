const express = require('express');
const cors = require('cors');
const productController = require('./controllers/productController');
const contactController = require('./controllers/contactController');

const app = express();

app.use(cors({
    exposedHeaders: ['x-total-count']
}));
app.use(express.json());

app.use('/api/products', productController);
app.use('/api/contacts', contactController);

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
