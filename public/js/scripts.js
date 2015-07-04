var Todo = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		$.ajax({
			url: 'api/todo',
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
				<div className="items">
					{todoNodes}
				</div>
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

	render: function() {
		var isDone = this.state.isDone ? "checked" : "";

		return (
			<div className="TodoItem">
				<input id={this.props.id} type="checkbox" checked={isDone} />
				<label htmlFor={this.props.id}>{this.props.title}</label>
			</div>
		);
	}
});

React.render(<Todo />, document.getElementsByClassName('container')[0]);