const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    // Diğer intents'leri de ekleyebilirsiniz
  ],
});

const channelId = '1185813101950537808'; // Hedef kanal ID'si
const giphyApiKey = '2Q0PszvPJ9vFIvcJyE3rCsGfOAbtIeo1'; // Giphy API anahtarı
const searchKeyword = 'mortal kombat'; // Arama anahtarı

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  setInterval(() => sendRandomMortalKombatGif(channelId), 60 * 1000); // Her 1 dakikada bir
});

async function sendRandomMortalKombatGif(channelId) {
  const channel = client.channels.cache.get(channelId);

  try {
    // Giphy API'den belirli bir anahtar kelimeyle rastgele bir GIF çekme
    const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${searchKeyword}&rating=g`);
    
    // Mesaj içeriği kontrolü ekleyin
    if (response.data && response.data.data && response.data.data.embed_url) {
      // GIF'i gönderme
      channel.send(response.data.data.embed_url);
    } else {
      console.error('GIF is empty or not available.');
    }
  } catch (error) {
    console.error('Error fetching and sending GIF:', error.message);
  }
}

client.login(''); // Botunuzun token'ını buraya ekleyin
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Dark Uptime tarafından uptime edilmektedir.'));

app.listen(port, () =>
    console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);