import express from 'express';
import { exec } from 'child_process';

const app = express();
const port = 3000;

app.use(express.json());

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
