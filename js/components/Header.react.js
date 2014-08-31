/** @jsx React.DOM */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var Header = React.createClass({

  render : function() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this.on_save}
        />
      </header>
    );
  },

  on_save: function(text) {
    if (text.trim()){
      TodoActions.create(text);
      //TodoActions.update_text(this.props.todo.id, text);
    }
  }

});

module.exports = Header;
