const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.static(`${__dirname}/dist`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Listening on ${http.address().port}`);
});
