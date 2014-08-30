var Dispatcher = require('./Dispatcher');

var merge = require('react/lib/merge');

var AppDispatcher = copyProperties(new Dispatcher(), {
  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction : function(action) {
    var payload = {
      source : 'VIEW_ACTION',
      action : action
    }

    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
