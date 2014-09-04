/** @jsx React.DOM */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var Header = React.createClass({displayName: 'Header',

  render : function() {
    return (
      React.DOM.header({id: "header"}, 
        React.DOM.h1(null, "todos"), 
        TodoTextInput({
          id: "new-todo", 
          placeholder: "What needs to be done?", 
          onSave: this.on_save}
        )
      )
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
