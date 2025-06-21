import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = 'AIzaSyAvP7gRCJ-QszFZIjOKFy06rHzNg2xHZ80'; // Substitua pela sua chave real

app.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  const mensagens = [{ role: "user", parts: [{ text: "O que é a Ravena?" }] }, { role: "model", parts: [{ text: "É um cachorro." }] }, { role: "user", parts: [{ text: "Você tem mais animais?" }] }, { role: "model", parts: [{ text: "Sim, gatos e cachorros." }] }, { role: "user", parts: [{ text: "Quais os nomes dos cachorros?" }] }, { role: "model", parts: [{ text: "Ravena, Urso e Ted!" }] }, { role: "user", parts: [{ text: input }] }];

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: mensagens })
    });

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Não entendi sua pergunta.";
    res.json({ reply: botReply });
  } catch (error) {
    res.status(500).json({ reply: "Erro no servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});