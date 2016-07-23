import express from 'express';
const app = express();

export default app;

import bodyParser from 'body-parser';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

import router from './routes';
app.use('/api', router)

import db from './db';

app.listen(3000, function () {
	console.log("now listening port 3000")
})
