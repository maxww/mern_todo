import React from 'react';
import $ from 'jquery';

export default class TodosListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false
		};
	}

	renderTaskSection() {
		const {title, complete} = this.props;
		const taskStyle = {
			color: complete
				? 'blue'
				: 'red',
			cursor: 'pointer'
		}

		if (this.state.isEditing) {
			return (
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type="text" defaultValue={title} ref="editInpt"/>
					</form>
				</td>
			)
		}
		return (
			<td style={taskStyle} onClick={this.props.toggleTask.bind(this, this.props)}>
				{title}
			</td>
		)
	}

	renderActionSection() {
		if (this.state.isEditing) {
			return (
				<td>
					<button onClick={this.onSaveClick.bind(this)}>Save</button>
					<button onClick={this.onCancelClick.bind(this)}>Cancel</button>
				</td>
			);
		}
		return (
			<td>
				<button onClick={this.onEditClick.bind(this)}>Edit</button>
				<button onClick={this.props.deleteTask.bind(this, this.props)}>
					Delete</button>
			</td>
		)
	}
	render() {
		return (
			<tr>
				{this.renderTaskSection()}
				{this.renderActionSection()}
			</tr>
		)
	}

	onEditClick() {
		this.setState({isEditing: true});

	}

	onCancelClick() {
		this.setState({isEditing: false})
	}

	onSaveClick(event) {
		event.preventDefault();

		const oldTask = this.props.title;
		const newTask = this.refs.editInpt.value;
		this.props.saveTask(oldTask, newTask);
		this.setState({isEditing: false});
	}
}
