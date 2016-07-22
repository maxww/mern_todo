import mongoose from 'mongoose';

const db = mongoose.connect('mongodb://localhost:27017/testing-todos').connection;


db.on('open', function () {
	console.log('Database connection successfully opened');
});

db.on('error', function (err) {
	console.error('Database connection error', err);
});

export default db;
