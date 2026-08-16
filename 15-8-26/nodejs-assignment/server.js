const express = require('express');
const app = express();
const PORT = 2712;

app.use(express.json());

let users = [
  { id: 1, name: "Nguyen Van A", age: 20 },
  { id: 2, name: "Tran Van B", age: 22 }
];

let products = [
  { id: 1, name: "Laptop", price: 20000000 },
  { id: 2, name: "Mouse", price: 500000 }
];

let todos = [
  { id: 1, title: "Học Node.js", completed: false },
  { id: 2, title: "Làm bài tập", completed: true }
];


app.get('/', (req, res) => {
  res.send('<h1>Chào mừng đến với Trang Chủ!</h1>');
});

app.get('/products', (req, res) => {
  let html = '<h1>Danh sách sản phẩm</h1><ul>';
  products.forEach(p => {
    html += `<li>${p.name} - ${p.price.toLocaleString()} VND</li>`;
  });
  html += '</ul>';
  res.send(html);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});




app.get('/search', (req, res) => {
  const query = req.query.q;
  if (query) {
    res.send(`Kết quả tìm kiếm cho: ${query}`);
  } else {
    res.send('Missing search keyword.');
  }
});





app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).json({ message: "Thiếu thông tin name hoặc age" });
  
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    age: parseInt(age)
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return res.status(404).json({ message: "Không tìm thấy user" });

  const { name, age } = req.body;
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    age: age ? parseInt(age) : users[userIndex].age
  };
  res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return res.status(404).json({ message: "Không tìm thấy user" });

  users.splice(userIndex, 1);
  res.json({ message: "Xóa user thành công" });
});




app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ message: "Thiếu thông tin name hoặc price" });

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price: parseInt(price)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

  const { name, price } = req.body;
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price ? parseInt(price) : products[productIndex].price
  };
  res.json(products[productIndex]);
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

  products.splice(productIndex, 1);
  res.json({ message: "Xóa sản phẩm thành công" });
});




app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: "Không tìm thấy todo" });
  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ message: "Thiếu thông tin title" });

  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: completed === undefined ? false : completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id: Cập nhật Todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex === -1) return res.status(404).json({ message: "Không tìm thấy todo" });

  const { title, completed } = req.body;
  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };
  res.json(todos[todoIndex]);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex === -1) return res.status(404).json({ message: "Không tìm thấy todo" });

  todos.splice(todoIndex, 1);
  res.json({ message: "Xóa todo thành công" });
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - Không tìm thấy trang</h1>');
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});
