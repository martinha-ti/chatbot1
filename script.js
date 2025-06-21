const API_KEY = "SUA_CHAVE_GEMINI"; // Mova para backend em produção!

async function sendText() {
  const input = document.getElementById('userInput').value;
  addMessage("Você: " + input);

  const mensagens = [
    { role: "user", parts: [{ text: "Qual o horário de funcionamento?" }] },
    { role: "model", parts: [{ text: "De segunda a sexta, das 8h às 18h." }] },
    { role: "user", parts: [{ text: "Vocês fazem entregas?" }] },
    { role: "model", parts: [{ text: "Sim, entregamos na cidade e região." }] },
    { role: "user", parts: [{ text: "Aceita cartão de crédito?" }] },
    { role: "model", parts: [{ text: "Sim, aceitamos todos os cartões!" }] },
    { role: "user", parts: [{ text: input }] }
  ];

  const response = await fetch("http://localhost:3000/chat, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      contents: mensagens
    })
  });

  const data = await response.json();
  const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erro na resposta";
  addMessage("Bot: " + botReply);
  speak(botReply);
}

function addMessage(text) {
  const messages = document.getElementById("messages");
  messages.innerHTML += "<p>" + text + "</p>";
  messages.scrollTop = messages.scrollHeight;
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'pt-BR';
  recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    document.getElementById('userInput').value = voiceInput;
    sendText();
  };
  recognition.start();
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'pt-BR';
  synth.speak(utter);
}
