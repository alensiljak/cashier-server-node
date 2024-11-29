import express from 'express';
import { exec } from 'child_process';
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
const port = 3000;

// middleware

app.use(express.json());
// Serve the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// Methods

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  const { command, params } = req.body;
  console.log(params)

  res.json({ status: 'OK' });
})

app.post('/run-executable', (req, res) => {
  const { command, params } = req.body;
  const fullCommand = `${command} ${params.join(' ')}`;

  exec(fullCommand, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
