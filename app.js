const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios = require("axios").default;

const client = new Client();

const apiOptions = {
  server: "",
};

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const response = await axios.post("http://127.0.0.1:5000/bot-question", {
    question: msg.body,
  });
  msg.reply(response.data);
});

client.initialize();
