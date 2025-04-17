const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let users = [];

app.post('/register', (req, res) => {
  const { nick, password } = req.body;
  if (users.find(u => u.nick === nick)) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  users.push({ nick, password });
  res.json({ message: 'Пользователь зарегистрирован' });
});

app.post('/login', (req, res) => {
  const { nick, password } = req.body;
  const user = users.find(u => u.nick === nick && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Неверные данные' });
  }
  res.json({ message: 'Успешный вход' });
});

app.get('/search/:nick', (req, res) => {
  const user = users.find(u => u.nick === req.params.nick);
  if (!user) return res.json({});
  res.json({ nick: user.nick });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
