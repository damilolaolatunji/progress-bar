require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

const app = express();

app.use(cors());

app.post('/upload', (req, res) => {
  let percent = 0;
  const interval = setInterval(() => {
    percent += 10;
    pusher.trigger('upload', 'progress', {
      percent,
    });

    if (percent === 100) clearInterval(interval);
  }, 2000);
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
