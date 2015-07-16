var Todo = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		$.ajax({
			url: 'api/item',
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				this.setState({data: data});
			}.bind(this)
		});
	},

	todoAdd: function(newTodo) {
		$.ajax({
			method: 'POST',
			url: 'api/item',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify({
				"title": newTodo
			}),
			success: function(newItem) {
				this.state.data.push(newItem);
				this.setState({data: this.state.data});
			}.bind(this)
		});
	},

	todoChange: function(todoToChange) {
		var url = '/api/item/' + todoToChange.id,
				request = {
					"title": todoToChange.title,
					"isDone": todoToChange.isDone
				};

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = ensureReadiness;

		function ensureReadiness() {
			if(xhr.readyState < 4) {
					return;
			}
			if(xhr.status !== 200) {
					return;
			}
			if(xhr.readyState === 4) {
					console.log("works");
			}
		}

		xhr.open('PUT', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(request));
	},

	render: function() {
		var todoNodes = this.state.data.map(function(todo){

			return(
					<TodoItem id={todo.id} title={todo.title} isDone={todo.isDone} onTodoChange={this.todoChange}/>
				);
		}.bind(this));

		return (
			<div className="todo">
				<h1>Todo List</h1>
				<AddTodoField onTodoAdd={this.todoAdd}/>
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

					this.props.onTodoAdd(newTodo);
					input.value = "";
		}
	},

	render: function() {
		return (
			<div className="add-todo-field">
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

		//example of change return value
		var changedItem = { "id": this.props.id,
												"title": this.props.title,
												"isDone": !this.state.isDone
											}

		this.props.onTodoChange(changedItem);
	},

	render: function() {
		var isDone = this.state.isDone ? "checked" : "";

		return (
			<div className="todo-item">
			<a href="#" className="remove-todo-item">Remove</a>
				<input id={this.props.id} type="checkbox" checked={isDone} onChange={this.handleChange} />
				<label htmlFor={this.props.id}>{this.props.title}</label>
			</div>
		);
	}
});

React.render(<Todo />, document.getElementsByClassName('container')[0]);