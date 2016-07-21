import _ from 'lodash';
import React from 'react';
import CreateTodo from './create-todo'
import TodosList from './todos-list';
import $ from 'jquery';
import { Router, Route, Redirect} from 'react-router';

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {todos:[]};
    }

    render () {
        return (
            <div>
                <h4>Todo App</h4>
                <CreateTodo
                    todos={this.state.todos}
                    createTask={this.createTask.bind(this)}
                />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    loadData () {
        $.ajax({
            url: '/api/todos',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    todos: data
                })
            }.bind(this)
        })
    }

    componentDidMount () {
        this.loadData();
    }

    toggleTask (task){
        console.log(task)
        const foundTodo = _.find(this.state.todos, todo => todo._id === task._id)
        foundTodo.complete = !foundTodo.complete;
        console.log("toggle", foundTodo)

        var todoId = foundTodo._id;
        var todoIndex;
        this.state.todos.find(function(todo, index){
            if (todo._id === todoId){
                todoIndex = index;
            }
        })

        $.ajax({
            type: 'PUT',
            url: '/api/todos/' + todoId,
            dataType: 'json',
            data: foundTodo,
            success: function(data) {
                this.state.todos[todoIndex] = data;
                this.setState({todos: this.state.todos});
            }.bind(this),
            error: function(xhr, status, err) {
                // ideally, show error to user.
                console.log("Error editing todo:", err);
            }
        })
    }

    createTask(task) {
        var newTodo = {title: task}
        $.ajax({
            type: 'POST',
            url: '/api/todos',
            dataType: 'json',
            data: newTodo,
            success: function(data) {
                var todo = data;
                // We're advised not to modify the state, it's immutable. So, make a copy.
                var todosModified = this.state.todos.concat(todo);
                this.setState({todos: todosModified});
            }.bind(this),
            error: function(xhr, status, err) {
                // ideally, show error to user.
                console.log("Error adding todo:", err);
            }
        });
    }

    saveTask(oldTask, newTask){
        const foundTodo = _.find(this.state.todos, todo => todo.title === oldTask);
        foundTodo.title = newTask;

        var todoId = foundTodo._id;
        var todoIndex;
        this.state.todos.find(function(todo, index){
            if (todo._id === todoId){
                todoIndex = index;
            }
        })

        $.ajax({
            type: 'PUT',
            url: '/api/todos/' + todoId,
            dataType: 'json',
            data: foundTodo,
            success: function(data) {
                this.state.todos[todoIndex] = data;
                this.setState({todos: this.state.todos});
            }.bind(this),
            error: function(xhr, status, err) {
                // ideally, show error to user.
                console.log("Error editing todo:", err);
            }
        })
    }

    deleteTask(task) {
        console.log(task, "task")
        const foundTodo = _.find(this.state.todos, todo => todo._id === task._id);
        var todoId = foundTodo._id;

        $.ajax({
            type: 'DELETE',
            url: '/api/todos/' + todoId,
            success: function(){
                console.log("deleted the task")
            }.bind(this),
            error: function(xhr, status, err){
                console.log("Error deleting todo:", err);
            }
        })
        _.remove(this.state.todos, todo => todo.title === task.title);
        setState(this);
    }
}

function setState(self){
    self.setState({todos: self.state.todos})
}
