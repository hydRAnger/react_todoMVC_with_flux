var Footer = require('./Footer.react');
var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

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
    areAllComplete : TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({

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
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    //var todos = this.props.model.todos;
  	return (
      <div>
        <Header/>
        <MainSection
          all_todos={this.state.all_todos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer all_todos={this.state.all_todos} />
      </div>
  	);
  },

  /**
   * Event handler for TodoStore's evt_change
   */
  _onChange : function() {
    this.setState(getState());
  }

});

module.exports = TodoApp;
