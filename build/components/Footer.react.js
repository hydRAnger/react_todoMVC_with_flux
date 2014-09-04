/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({displayName: 'Footer',

  propTypes: {
    all_todos: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var all_todos = this.props.all_todos;
    var total = Object.keys(all_todos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in all_todos) {
      if (all_todos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' todo ' : ' todos ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        React.DOM.button({
          id: "clear-completed", 
          onClick: this._onClearCompletedClick}, 
          "Clear completed (", completed, ")"
        );
    }

  	return (
      React.DOM.footer({id: "footer"}, 
        React.DOM.span({id: "todo-count"}, 
          React.DOM.strong(null, 
            itemsLeft
          ), 
          itemsLeftPhrase
        ), 
        clearCompletedButton
      )
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    TodoActions.destroyCompleted();
  }

});

module.exports = Footer;
