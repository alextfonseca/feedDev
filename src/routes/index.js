const express = require("express");
const connectToDatabase = require("../services/mongodb");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const server = express();
server.use(express.json()); // faz com que o express entenda JSON

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// definindo a porta
const PORT = process.env.PORT || 3333;
server.listen(PORT);

const routes = () => {
  server.post("/user", async (req, res) => {
    const { name, email, password: reqPass } = req.body;

    if (!name || !email || !reqPass) {
      return res.status(400).json({ message: "Dados insuficientes" });
    }

    const db = await connectToDatabase();
    const collection = db.collection("users");

    const checkUser = await collection.findOne({ email });

    if (checkUser) {
      return res
        .status(400)
        .json({ message: "Esse e-mail já esta sendo utilizado" });
    }

    const password = bcrypt.hashSync(reqPass, bcrypt.genSaltSync(10));

    const { insertedId } = await collection.insertOne({
      name,
      email,
      password,
    });

    return res
      .status(200)
      .json({ message: "Usuário criado com sucesso", id: insertedId });
  });

  server.post("/user/auth", async (req, res) => {
    const { email, password } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (!email || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Falha ao fazer o login! Verifique suas credenciais!",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id.toString(),
      },
      "superSenha",
      { expiresIn: "30d" },
    );

    res.status(200).json({ accessToken });
  });
};

module.exports = routes;
