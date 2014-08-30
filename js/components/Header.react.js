/** @jsx React.DOM */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var Header = React.createClass({

  render : function() {
    return (
      <header id="header">
        <h1>todo_list:</h1>
        <TodoTextInput
          id="new-todo"
          //placeholder="What needs to be done?"
          placeholder="What needs to be done?!"
          onSave={this._onSave}
        />
      </header>
    );
  },

  // handler called within TodoTextInput.
  _onSave: function(text) {
    if (text.trim()){
      TodoActions.create(text);
    }
  }

});

module.exports = Header;
