const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// TESTE
app.get("/", (req, res) => {
    res.send("API funcionando");
});

// LIGAR VM
app.get("/ligar", (req, res) => {
    console.log("Ligando VM...");
    res.send("Comando de ligar enviado");
});

// DESLIGAR VM
app.get("/desligar", (req, res) => {
    console.log("Desligando VM...");
    res.send("Comando de desligar enviado");
});

app.listen(3000, () => console.log("Servidor rodando"));