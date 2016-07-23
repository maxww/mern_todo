import { agent } from 'supertest';
import routes from '../app';
const app = agent(routes);
import { expect } from 'chai';
import mongoose from 'mongoose';
import Todo from '../db/model';

describe('Todo routes', function () {

	describe('`/api/todos` URI', function () {
		it('GET responds with a list of todos', function () {
			return app
				.get('/api/todos')
				.expect(200)
		})
	})

	describe('add todo', function () {
		before(function (done) {
			Todo.find({})
				.exec()
				.then(function (todos) {
					todos.forEach(todo => todo.remove());
					done();
				})
		})

		it('POST new todo in db', function (done) {
			app.post('/api/todos')
				.send({
					title: 'The'
				})
				.end(function (err, response) {
					Todo.find({})
						.then(function (todos) {
							expect(todos).to.have.lengthOf(1);
							expect(todos[0].title).to.equal('The');
							done();
						});
				})
		})
	})


	describe('PUT /api/todos/:id', function () {
		let todo;

		before(function () {
			return Todo.findOne({
					title: 'The'
				})
				.then(function (foundTodo) {
					todo = foundTodo
				})
				.then(null, function (e) {
					console.error(e.message)
				})
		})


		it('Update todo in db', function (done) {
			app.put('/api/todos/' + todo._id)
				.send({
					title: 'put test'
				})
				.end(function () {
					Todo.findById(todo._id)
						.exec()
						.then(function (todo) {
							expect(todo)
								.to.equal('put test');
						});
					done();
				})
		})
	})

	describe('DELETE /api/todos/:id', function () {
		let todo;

		beforeEach(function () {
			return Todo.findOne({
					title: 'put test'
				})
				.then(function (foundTodo) {
					todo = foundTodo
				})
				.then(null, function (e) {
					console.error(e.message)
				})
		})

		it('delete todo', function (done) {
			app.delete('/api/todos/' + todo._id)
				.end(function () {
					expect(204)
					Todo.find({})
						.then(function (todos) {
							expect(todos)
								.to.have.lengthOf(0);
							done();
						})
				})
		})
	})
})
