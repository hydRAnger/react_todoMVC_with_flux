/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var KEY_CODE_ENTER = 13;

var TodoTextInput = React.createClass({displayName: 'TodoTextInput',

  propTypes : {
    className : ReactPropTypes.string,
    id : ReactPropTypes.string,
    placeholder : ReactPropTypes.string,
    onSave : ReactPropTypes.func.isRequired,
    value : ReactPropTypes.string
  },

  getInitialState : function() {
    return {
      value : this.props.value || ''
    };
  },

  render : function() {
    return (
      React.DOM.input({
        className: this.props.className, 
        id: this.props.id, 
        placeholder: this.props.placeholder, 
        onBlur: this._save, 
        onChange: this._onChange, 
        onKeyDown: this._onKeyDown, 
        value: this.state.value, 
        autoFocus: true}
      )
    );
  },

  _save : function() {
    this.props.onSave(this.state.value);
    console.log(this.state.value);
    this.setState({
      value : ''
    });
  },

  _onChange : function(event) {
    this.setState({
      value : event.target.value
    });
  },

  _onKeyDown : function(event) {
    if (event.keyCode === KEY_CODE_ENTER) {
      this._save();
    }
  }

});

module.exports = TodoTextInput;
