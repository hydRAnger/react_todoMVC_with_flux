/** @jsx React.DOM */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainPanel = require('./MainPanel.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

//var ALL_TODOS = 'all';
//var ACTIVE_TODOS = 'active';
//var COMPLETED_TODOS = 'completed';
//app.ALL_TODOS = 'all';
//app.ACTIVE_TODOS = 'active';
//app.COMPLETED_TODOS = 'completed';
//var TodoFooter = app.TodoFooter;
//var TodoItem = app.TodoItem;

/**
 * Retrieve the current TODO data from the TodoStore
 */
//function getState() {
function getState() {
  return {
    // all_todos -replace-> old nowShowing
    all_todos : TodoStore.get_all(),
    is_all_complete : TodoStore.is_all_complete()
  };
}

var TodoApp = React.createClass({displayName: 'TodoApp',

  getInitialState : function() {
    return getState();
  },

  componentDidMount : function() {
			//var setState = this.setState;
			//var router = Router({
			//	'/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
			//	'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
			//	'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
			//});
			//router.init('/');
    TodoStore.add_change_listener(this.on_change);
  },

  componentWillUnmount : function() {
    TodoStore.remove_change_listener(this.on_change);
  },

  render: function() {
    //var todos = this.props.model.todos;
  	return (
      React.DOM.div(null, 
        Header(null), 
        MainPanel({
          all_todos: this.state.all_todos, 
          is_all_complete: this.state.is_all_complete}
        ), 
        Footer({all_todos: this.state.all_todos})
      )
  	);
  },

  /**
   * Event handler for TodoStore's evt_change
   */
  on_change : function() {
    this.setState(getState());
  }

});

module.exports = TodoApp;
