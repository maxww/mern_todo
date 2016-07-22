import mongoose from 'mongoose';

import db from './db';

let Todo = new mongoose.Schema({
	complete: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		required: true
	}
});

export default db.model('Todo', Todo);
