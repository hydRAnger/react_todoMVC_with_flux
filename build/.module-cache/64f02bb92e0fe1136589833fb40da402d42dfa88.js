/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({displayName: 'MainSection',

  propTypes : {
    all_todos : ReactPropTypes.object.isRequired,
    is_all_complete : ReactPropTypes.bool.isRequired
  },

  render : function() {
    // hide MainPanel unless there are todos.
    if ( Object.keys( this.props.all_todos ).length < 1 ) {
      return null;
    }

    var all_todos = this.props.all_todos;
    var todos = [];

    for (var key in all_todos) {
      todos.push(TodoItem({key: key, todo: all_todos[key]}));
    }

    return (
      React.DOM.section({id: "main"}, 
        React.DOM.input({
          id: "toggle-all", 
          type: "checkbox", 
          onChange: this._onToggleCompleteAll, 
          checked: this.props.is_all_complete ? 'checked' : ''}
        ), 
        React.DOM.label({htmlFor: "toggle-all"}, "Mark all as complete"), 
        React.DOM.ul({id: "todo-list"}, todos)
      )
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;
