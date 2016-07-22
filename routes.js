import {
	Router
} from 'express';
const router = Router();
export default router;
import mongoose from 'mongoose';
import Todo from './model';
import _ from 'lodash';

router.param('id', function (req, res, next, id) {
	Todo.findById(id).exec()
		.then(function (todo) {
			if (todo) {
				req.todo = todo;
				next();
			} else {
				res.status(404).end();
			}
		})
		.catch(next);
});

router.get('/todos', function (req, res, next) {
	Todo.find({}).exec()
		.then(function (todos) {
			res.status(200).json(todos);
		})
		.catch(next)
});

router.post('/todos', function (req, res, next) {
	Todo.create(req.body)
		.then(function (todo) {
			res.status(201).json(todo)
		})
		.then(null, next)
});

router.put('/todos/:id', function (req, res, next) {
	_.extend(req.todo, req.body);
	req.todo.save()
		.then(function (updatedTodo) {
			res.json(updatedTodo);
		})
		.then(null, next);
})

router.delete('/todos/:id', function (req, res, next) {
	req.todo.remove()
		.then(function () {
			res.status(204).end();
		})
		.then(null, next);
})
