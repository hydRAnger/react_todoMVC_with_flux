var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var _todo_list = {}; // collection of todo items
var EVT_CHANGE = 'change';

// Create a TODO item.
function create(content) {
  var timestamp_as_id = Date.now();
  console.log("create todo_item:"+content);
  _todo_list[timestamp_as_id] = {
    id : timestamp_as_id,
    complete : false,
    content : content
  };
  update(timestamp_as_id, {text:content});
}

function update(id, updates) {
    _todo_list[id] = merge(_todo_list[id], updates);
}

function update_all(updates) {
  for (var id in _todo_list) {
    update(id, updates);
  }
}

function destroy(id) {
  if (_todo_list[id]) {
    delete _todo_list[id];
  } else {
    console.error("todo:"+id+" is not exist in todo list!");
  }
}

var TodoStore = merge(EventEmitter.prototype, {

  is_all_complete : function() {
    for (var id in _todo_list) {
      if (!_todo_list[id].complete) {
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

});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.is_all_complete()) {
        update_all({complete: false});
      } else {
        update_all({complete: true});
      }
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      break;

    default:
      return true;
  }

  TodoStore.emit_change();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = TodoStore;
