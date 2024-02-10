let clients = [];

function initSocket(wsServer) {
  wsServer.on("connection", (ws) => {
    clients.push(ws);
    console.log("Client connected");
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ type: "message", data: "Hello from server" })
      );
    });

    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
      console.log("Client disconnected");
    });
  });
}

function emitMessage(message) {
  console.log("Emitting message:", message);

  clients.forEach((client) => {
    console.log("Sending message to client");
    client.send(JSON.stringify({ type: "message", data: message }));
  });
}

module.exports = {
  initSocket,
  emitMessage,
};
