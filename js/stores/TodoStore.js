var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var _todo_list = {}; // collection of todo items
var EVT_CHANGE = 'change';

/**
 * Create a TODO item.
 * @param {string} text The content of the TODO
 */
function create(content) {
  var timestamp_as_id = Date.now();
  _todo_list[timestamp_as_id] = {
    id : timestamp_as_id,
    complete : false,
    content : content
  };
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function destroy(id) {
  if (_todo_list[id]) {
    delete _todo_list[id];
  } else {
    console.error("todo:"+id+" is not exist in todo list!");
  }
}

var TodoStore = merge(EventEmitter.prototype, {

  is_all_complete : function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  get_all : function() {
    return _todo_list;
  },

  emit_change : function() {
    this.emit(EVT_CHANGE);
  },

  add_change_listener : function(callback) {
    this.on(EVT_CHANGE, callback);
  },

  remove_change_listener : function(callback) {
    this.removeListener(EVT_CHANGE, callback);
  }

  dispatcherIndex : AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.action_type) {
      case TodoConstants.TODO_CREATE:
        var content = action.text.trim() 
        if (content !== '') {
          create(content);
          TodoStore.emit_change();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emit_change();
        break;
    }

    return true; 
  })

});

module.exports = TodoStore;
