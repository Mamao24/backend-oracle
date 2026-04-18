// LIGAR
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

// DESLIGAR
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