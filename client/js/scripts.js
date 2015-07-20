var Todo = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		$.ajax({
			url: "api/item",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				this.setState({data: data});
			}.bind(this)
		});
	},

	todoAdd: function(newTodo) {
		$.ajax({
			method: "POST",
			url: "api/item",
			contentType: "application/json",
			dataType: "json",
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
		var url = "/api/item/" + todoToChange.id,
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
					console.log("success");
			}
		}

		xhr.open("PUT", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(request));
	},

	todoRemove: function(todoToRemoveId){
		var url = "api/item/"  + todoToRemoveId;

		$.ajax({
			method: "DELETE",
			url: url,
			contentType: "application/json",
			dataType: "json",
			success: function() {
				console.log( "success" );
			}
		});
	},

	render: function() {
		return (
			<div className="todo">
				<h1>Todo List</h1>
				<AddTodoField onTodoAdd={this.todoAdd}/>
				<UncompletedTasks data={this.state.data} todoRemove={this.todoRemove} todoChange={this.todoChange}/>
				<CompletedTasks data={this.state.data} todoRemove={this.todoRemove} todoChange={this.todoChange}/>
			</div>
		);
	}
});

var AddTodoField = React.createClass({
	handleSubmit: function(event) {
		if (event.key === "Enter") {
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
			isDone: this.props.isDone,
			isRemoved: false
		}
	},

	handleChange: function() {
		this.setState({
			isDone: !this.state.isDone
		});

		var changedItem = { "id": this.props.id,
												"title": this.props.title,
												"isDone": !this.state.isDone
											}

		this.props.onTodoChange(changedItem);
	},

	handleRemove: function(e) {
		e.preventDefault()
		var removedItemId = this.props.id;
		this.props.onTodoRemove(removedItemId);

		this.setState({
			isRemoved: true
		});
	},

	render: function() {
		var isDone = this.state.isDone ? "checked" : "",
				isRemoved = this.state.isRemoved ? "hidden" : "";

		return (
			<div className={"todo-item " + isRemoved}>
				<a href="#" className="remove-todo-item" onClick={this.handleRemove}>Remove</a>
				<input id={this.props.id} type="checkbox" checked={isDone} onChange={this.handleChange} />
				<label htmlFor={this.props.id}>{this.props.title}</label>
			</div>
		);
	}
});

var UncompletedTasks = React.createClass({
	render: function() {

		var tasks = [],
				uncompletedTasks,
				uncompletedLength;

		this.props.data.forEach(function(item) {
			if(item.isDone === false) {
				tasks.push(item);
			}
		});

		uncompletedTasks = tasks.map(function(todo){
			return(
					<TodoItem id={todo.id} title={todo.title} isDone={todo.isDone} onTodoRemove={this.props.todoRemove} onTodoChange={this.props.todoChange}/>
				);
		}.bind(this));

		uncompletedLength = uncompletedTasks.length;

		return (
			<div className="uncompleted-tasks">
				<p><span>{"Uncompleted tasks (" + uncompletedLength +")"}</span></p>
				<div className="items">
					{uncompletedTasks}
				</div>
			</div>
		);
	}
});

var CompletedTasks = React.createClass({
	getInitialState: function() {
		return {
			showCompleted: false
		}
	},

	handleClick: function(e) {
		e.preventDefault();

		this.setState({
			showCompleted: !this.state.showCompleted
		});
	},

	render: function() {

		var tasks = [],
				completedTasks,
				completedLength,
				isShownCN;

		this.props.data.forEach(function(item) {
			if(item.isDone === true) {
				tasks.push(item);
			}
		});

		completedTasks = tasks.map(function(todo){
			return(
					<TodoItem id={todo.id} title={todo.title} isDone={todo.isDone} onTodoRemove={this.props.todoRemove} onTodoChange={this.props.todoChange}/>
				);
		}.bind(this));

		completedLength = completedTasks.length;

		isShownCN = this.state.showCompleted ? " " : "hidden";

		return (
			<div className="completed-tasks">
				<p><a href="#" onClick={this.handleClick}>{"Show Completed (" +completedLength + ")" }</a></p>
				<div className={"items " + isShownCN }>
					{completedTasks}
				</div>
			</div>
		);
	}
});

React.render(<Todo />, document.getElementsByClassName("container")[0]);