const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/create-link', (req, res) => {
  const tempLink = 'https://mediafire.com/temp-link'; // Replace with actual logic
  res.json({ link: tempLink });
});

module.exports = app;
