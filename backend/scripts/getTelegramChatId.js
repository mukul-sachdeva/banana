const https = require('https');
const token = '8871080329:AAHralUogSauLy5P2dnq7_-c8XIsWNnfHlc';
const url = `https://api.telegram.org/bot${token}/getUpdates`;

https.get(url, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log(d);
    try {
      const o = JSON.parse(d);
      const arr = (o.result || []).filter(r => r.message);
      if (arr.length) {
        console.log('CHAT_ID:', arr[arr.length - 1].message.chat.id);
      } else {
        console.log('NO_CHAT_ID_FOUND');
      }
    } catch (e) {
      console.error('PARSE_ERROR', e.message);
    }
  });
}).on('error', e => { console.error('ERROR', e.message); process.exit(1); });
