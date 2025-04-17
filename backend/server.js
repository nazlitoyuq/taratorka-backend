const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [];

app.post('/register', (req, res) => {
  const { nickname, password } = req.body;
  if (users.find(u => u.nickname === nickname)) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  users.push({ nickname, password });
  res.status(201).json({ message: 'Регистрация успешна' });
});

app.post('/login', (req, res) => {
  const { nickname, password } = req.body;
  const user = users.find(u => u.nickname === nickname && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Неверные данные' });
  }
  res.json({ message: 'Вход успешен' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});