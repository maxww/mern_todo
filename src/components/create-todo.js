import _ from 'lodash';
import React from 'react';

export default class CreateTodo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: null
        };
    }

    renderError(){
        if (!this.state.error) return null;
        return <div style={{color: 'red'}}>{this.state.error}</div>
    }

    render () {
        return (
            <form onSubmit={this.handleCreat.bind(this)}>
                <input type="text" placeholder="what to do?" ref="createInput"/>
                <button>Add</button>
                {this.renderError()}
            </form>
        )
    }

    handleCreat (event) {
        event.preventDefault();
        console.log("create", this.props)

        const task = this.refs.createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({error: validateInput});
            return;
        }
        this.setState({error:null});
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }

    validateInput(task){
        console.log(this.props.todos)
        if (!task){
            return "Please enter a task!"

        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return "Task already exists.";
        } else {
            return null;
        }
    }
}
