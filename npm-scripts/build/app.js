// server/app.js
const express = require('express');
const path = require('path');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname)));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.all('/app.js', (req, res) => {
  res.status(404).send({ message: 'Not found' });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log('web running!');
});
