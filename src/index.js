import express from 'express';
import packageInfo from './../package.json';

const app = express();

app.get('/', (req, res) => {
  res.json({ version: packageInfo.version });
});

app.listen(process.env.PORT, () => {
  console.log('Web server started at http://%s:%s');
});
