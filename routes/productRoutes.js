import express from 'express';
import data from '../data.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  res.send(data.products);
});

productRouter.get('/slug/:slug', (req, res) => {
  const product = data.products.find((p) => p.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/categories', (req, res) => {
  console.log(222);
  const categories = Array.from(
    new Set(data.products.map((product) => product.category))
  );

  res.send(categories);
});

productRouter.get('/search', (req, res) => {
  const { query } = req;
  const category = query.category || '';

  const categoryFilter = category && category !== 'all' ? { category } : {};

  const filteredProducts = data.products.filter(
    (product) =>
      !categoryFilter.category || product.category === categoryFilter.category
  );

  const countProducts = filteredProducts.length;
  const products = filteredProducts;

  res.send({
    products,
    countProducts,
  });
});

productRouter.get('/:id', (req, res) => {
  const product = data.products.find((p) => p._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
