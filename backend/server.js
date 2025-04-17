
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

let users = [];
let chats = [];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }
  users.push({ username, password });
  res.json({ message: "Успешная регистрация" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Неверные данные" });
  }
  res.json({ message: "Успешный вход" });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
