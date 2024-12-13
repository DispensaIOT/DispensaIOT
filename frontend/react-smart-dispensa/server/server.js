const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 }); // Alterando para 8081

wss.on('connection', (ws) => {
    console.log('Novo dispositivo conectado.');

    ws.on('message', (message) => {
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log("Servidor WebSocket rodando na porta 8081");
