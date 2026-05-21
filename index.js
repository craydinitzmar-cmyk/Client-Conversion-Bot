const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Botly AI</title>
      </head>
      <body style="font-family:sans-serif;padding:40px;background:#111;color:white;">
        <h1>Botly AI Customer Support</h1>
        <p>AI chatbot for small businesses.</p>
        <a href="https://www.paypal.com">
          <button style="padding:12px 20px;font-size:18px;">
            Get Started
          </button>
        </a>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log("Server running");
});