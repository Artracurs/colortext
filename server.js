const express = require('express');
const app = express();
var cors = require('cors');
// const {Telegraf} = require('telegraf');
var fs = require('fs');

// const bot = new Telegraf('5637508356:AAGj3M5o1SnuWa5JKSFj_5-le-9ePA3qnoc');
// bot.start(ctx => ctx.reply('Welcome'));
// bot.launch();

// const chatId = '-1001812630563';

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.use(cors());

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

async function post() {
  await app.post('*', (req, res) => {
    res.json({data: req.body});
    let imageBase64 = req.body.data;
    let imageBase = imageBase64.split(';base64,').pop();
    encodeBase64(imageBase);
    sendFile();

    // console.log(imageBase);

    // bot.telegram.sendMessage(chatID, req.body.data);
  });
}

async function encodeBase64(imageBase) {
  await require('fs').writeFile('out.png', imageBase, 'base64', function (err) {
    // console.log(err);
  });
}

async function sendFile() {
  var filePath = await 'out.png';

  fs.watchFile(filePath, async function () {
    let file = fs.readFileSync(filePath);
    await bot.telegram
      .sendPhoto(chatId, {
        source: file,
        filename: 'out.png',
      })
      .catch(function (error) {
        // console.log(error);
      });
  });
}

post();

app.listen(4001, () => console.log('Server was started on port 4001'));
