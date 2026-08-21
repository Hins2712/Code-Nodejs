const express = require('express');
const app = express();
const PORT = 2712;

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 20000000 },
  { id: 2, name: "Điện thoại", price: 10000000 }
];

app.get('/products', (req, res) => {
  res.json(products);
});


app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }

  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Vui lòng nhập tên và giá sản phẩm" });
  }

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price: Number(price)
  };

  products.push(newProduct);
  res.status(201).json({ message: "Thêm thành công", data: newProduct });
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }

  if (name) products[productIndex].name = name;
  if (price) products[productIndex].price = Number(price);

  res.json({ message: "Cập nhật thành công", data: products[productIndex] });
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.json({ message: "Xoá thành công", data: deletedProduct[0] });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
