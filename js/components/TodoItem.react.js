/** @jsx React.DOM */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var ReactPropTypes = React.PropTypes;

var cx = require('react/lib/cx');

var TodoItem = React.createClass({

  propTypes: {
    todo : ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      is_edting : false
    };
  },

  render : function() {
    var todo = this.props.todo;

    var input;
    if (this.state.is_edting) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this.on_save}
          value={todo.text}
        />;
    }

    return (
      <li
        className={cx({
          'completed' : todo.complete,
          'editing' : this.state.is_edting
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this.on_toggle_complete}
          />
          <label onDoubleClick={this.on_double_click}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this.on_btn_delete_click} />
        </div>
        {input}
      </li>
    );
  },

  on_toggle_complete : function() {
    TodoActions.toggleComplete(this.props.todo);
  },

  on_double_click : function() {
    this.setState({is_edting: true});
  },

  on_save : function(text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({is_edting: false});
  },

  on_btn_delete_click : function() {
    TodoActions.destroy(this.props.todo.id);
  }

});

module.exports = TodoItem;
