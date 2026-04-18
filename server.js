const express = require("express");
const cors = require("cors");
const common = require("oci-common");
const core = require("oci-core");

const app = express(); // ← ESSA LINHA FALTAVA
app.use(cors());

// 🔐 Config Oracle
const provider = new common.SimpleAuthenticationDetailsProvider(
    process.env.OCI_TENANCY,
    process.env.OCI_USER,
    process.env.OCI_FINGERPRINT,
    process.env.OCI_KEY,
    null,
    process.env.OCI_REGION
);

const computeClient = new core.ComputeClient({
    authenticationDetailsProvider: provider
});

computeClient.region = process.env.OCI_REGION;

// 🔌 LIGAR VM
app.get("/ligar", async (req, res) => {
    try {
        await computeClient.instanceAction({
            instanceId: process.env.OCI_INSTANCE,
            action: "START"
        });

        console.log("VM LIGANDO...");
        res.send("VM ligando...");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao ligar");
    }
});

// 🔌 DESLIGAR VM
app.get("/desligar", async (req, res) => {
    try {
        await computeClient.instanceAction({
            instanceId: process.env.OCI_INSTANCE,
            action: "STOP"
        });

        console.log("VM DESLIGANDO...");
        res.send("VM desligando...");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao desligar");
    }
});

// TESTE
app.get("/", (req, res) => {
    res.send("API funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando"));

console.log("REGION:", process.env.OCI_REGION);