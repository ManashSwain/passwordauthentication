const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const port = 3000;
const users = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).send("Welcome to our Homepage");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      password: hashedPassword,
    };
    users.push(user);
    console.log(salt);
    console.log(hashedPassword);
    res.status(202).send();
  } catch {
    res.status(500).send("Cannot get the required information");
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name == req.body.name);
  console.log(user);
  if (user === null) {
    res.status(500).send("Cannot get the username");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(202).send("authenticated");
    }
  } catch {
    res.status(500).send(" connection Not allowded");
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
