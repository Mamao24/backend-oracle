const express = require("express");
const cors = require("cors");
const common = require("oci-common");
const core = require("oci-core");

const app = express();
app.use(cors());

// 👇 CORREÇÃO: Pega a chave do Render e força as quebras de linha corretamente
const privateKey = (process.env.OCI_KEY || "").replace(/\\n/g, '\n');

// 🔐 Provider (SEM region aqui)
const provider = new common.SimpleAuthenticationDetailsProvider(
    process.env.OCI_TENANCY,
    process.env.OCI_USER,
    process.env.OCI_FINGERPRINT,
    privateKey, // Usando a chave corrigida aqui
    null,
    null
);

// 🔌 Cliente Oracle
const computeClient = new core.ComputeClient({
    authenticationDetailsProvider: provider
});

// 🔥 FORÇA REGIÃO CORRETAMENTE
computeClient.region = common.Region.fromRegionId(process.env.OCI_REGION);

// 🧪 DEBUG (pode remover depois)
console.log("REGION:", process.env.OCI_REGION);
console.log("INSTANCE:", process.env.OCI_INSTANCE);

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
        console.error("ERRO AO LIGAR:", err);
        res.status(500).send("Erro ao ligar VM");
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
        console.error("ERRO AO DESLIGAR:", err);
        res.status(500).send("Erro ao desligar VM");
    }
});

// 🌐 ROTA TESTE
app.get("/", (req, res) => {
    res.send("API funcionando");
});

// 🚀 START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});