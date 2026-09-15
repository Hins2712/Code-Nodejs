const express = require('express');
const app = express();
    
app.use(express.json());

let products = [
  { id: 1, name: "Laptop Dell XPS 13", price: 1500, category: "Laptop", stock: 10 },
  { id: 2, name: "iPhone 15 Pro", price: 1200, category: "Phone", stock: 25 },
  { id: 3, name: "Logitech MX Master 3", price: 100, category: "Accessory", stock: 50 }
];

let nextId = 4;

const validateProduct = (data) => {
  const { name, price, category, stock } = data;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'Tên sản phẩm phải là chuỗi không được để trống';
  }
  if (typeof price !== 'number' || price <= 0) {
    return 'Giá sản phẩm phải là số lớn hơn 0';
  }
  if (!category || typeof category !== 'string' || category.trim() === '') {
    return 'Danh mục sản phẩm phải là chuỗi không được để trống';
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return 'Số lượng tồn kho phải là số nguyên không âm (>= 0)';
  }
  return null;
};

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }

  res.status(200).json(product);
});

app.post('/products', (req, res) => {
  const errorMessage = validateProduct(req.body);
  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const { name, price, category, stock } = req.body;
  const newProduct = {
    id: nextId++,
    name: name.trim(),
    price,
    category: category.trim(),
    stock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }

  const errorMessage = validateProduct(req.body);
  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const { name, price, category, stock } = req.body;
  products[index] = {
    id,
    name: name.trim(),
    price,
    category: category.trim(),
    stock
  };

  res.status(200).json(products[index]);
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.status(200).json({
    message: 'Xóa sản phẩm thành công',
    product: deletedProduct
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});