/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
//function getState() {
function getState() {
  return {
    all_todos : TodoStore.get_all(),
    areAllComplete : TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({

  getInitialState : function() {
    return getState();
  },

  componentDidMount : function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <Header />
        <MainSection
          all_todos={this.state.all_todos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer all_todos={this.state.all_todos} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange : function() {
    this.setState(getState());
  }

});

module.exports = TodoApp;
