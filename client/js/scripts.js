var Todo = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		$.ajax({
			url: 'api/todo',
			contentType: 'application/json',
			success: function(data) {
				this.setState({data: data});
			}.bind(this)
		});
	},

	render: function() {
		var todoNodes = this.state.data.map(function(todo){
			return(
					<TodoItem id={todo.id} title={todo.title} isDone={todo.isDone} />
				);
		});

		return (
			<div className="Todo">
				<h1>Todo List</h1>
				<AddTodoField />
				<div className="items">
					{todoNodes}
				</div>
				<p><a href="#">Show Completed</a></p>
			</div>
		);
	}
});

var AddTodoField = React.createClass({
	handleSubmit: function(event) {
		if (event.key === 'Enter') {
			var input = React.findDOMNode(this.refs.addTodo),
					newTodo = React.findDOMNode(this.refs.addTodo).value;

			$.ajax({
				method: 'POST',
				url: 'api/todo',
				contentType: 'application/json',
				data: JSON.stringify({
					"title": newTodo
				}),
				success: function() {
					console.log( 'success' );
					input.value = "";
				}
			});
		}
	},

	render: function() {
		return (
			<div className="AddTodoField">
				<input ref="addTodo" type="text" placeholder="Add your task here" onKeyPress={this.handleSubmit}/>
			</div>
		);
	}
});


var TodoItem = React.createClass({
	getInitialState: function() {
		return {
			isDone: this.props.isDone
		}
	},

	handleChange: function() {
		this.setState({
			isDone: !this.state.isDone
		});
	},

	render: function() {
		var isDone = this.state.isDone ? "checked" : "";

		return (
			<div className="TodoItem">
				<input id={this.props.id} type="checkbox" checked={isDone} onChange={this.handleChange} />
				<label htmlFor={this.props.id}>{this.props.title}</label>
			</div>
		);
	}
});

React.render(<Todo />, document.getElementsByClassName('container')[0]);