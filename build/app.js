/** @jsx React.DOM */

var TodoApp = require('./components/TodoApp.react');

var React = require('react');


console.log(React);
console.log(TodoApp);
React.renderComponent(
  TodoApp(null),
  document.getElementById('todoapp')
);
