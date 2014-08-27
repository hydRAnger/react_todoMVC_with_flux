//var invariant = require('./invariant');

var _last_id = 1;
var _prefix = 'ID_';

function Dispatcher() {
  "use strict";
  this.$callbacks = {};
  this.$pending_status_hash = {};
  this.$handled_status_hash = {};
  this.$is_dispatching = false;
  this.$curr_payload = null;
}

/**
 * Registers a callback to be invoked with every dispatched payload. Returns
 * a token that can be used with `waitFor()`.
 *
 * @param {function} callback
 * @return {string}
 */
Dispatcher.prototype.register = function(callback) {
  "use strict";
  _curr_id = _last_id + 1;
  var id = _prefix + _last_id++;
  this.$callbacks[id] = callback;
  return id;
};

/**
 * Removes a callback based on its token.
 *
 * @param {string} id
 */
Dispatcher.prototype.unregister = function(id) {"use strict";
  //invariant(
      //this.$callbacks[id],
      //'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      //id
      //);
  if ( callback[id] ) {
    delete this.$callbacks[id];
  } else {
    console.error("callback:"+id+" dose not registered!");
  }
};

/**
 * Waits for the callbacks specified to be invoked before continuing execution
 * of the current callback. This method should only be used by a callback in
 * response to a dispatched payload.
 *
 * @param {array<string>} ids
 */
Dispatcher.prototype.waitFor=function(ids) {"use strict";
  invariant(
      this.$is_dispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
      );
  for (var ii = 0; ii < ids.length; ii++) {
    var id = ids[ii];
    if (this.$pending_status_hash[id]) {
      invariant(
          this.$handled_status_hash[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
          );
      continue;
    }
    invariant(
        this.$callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
        );
    this.$invoke_callback(id);
  }
};

/**
 * Dispatches a payload to all registered callbacks.
 *
 * @param {object} payload
 */
Dispatcher.prototype.dispatch = function(payload) {
  "use strict";
  //invariant(
      //!this.$is_dispatching,
      //'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
      //);
  this.$start_dispatch(payload);
  try {
    for (var id in this.$callbacks) {
      if ( !this.$pending_status_hash[id] ) {
        this.$invoke_callback(id);
        //continue;
      }
    }
  } finally {
    this.$stop_dispatch();
  }
};

/**
 * Is this Dispatcher currently dispatching.
 *
 * @return {boolean}
 */
Dispatcher.prototype.is_dispatching = function() {
  "use strict";
  return this.$is_dispatching;
};

/**
 * Call the calback stored with the given id. Also do some internal
 * bookkeeping.
 *
 * @param {string} id
 * @internal
 */
Dispatcher.prototype.$invoke_callback = function(id) {
  "use strict";
  this.$pending_status_hash[id] = true;
  this.$callbacks[id](this.$curr_payload);
  this.$handled_status_hash[id] = true;
};

/**
 * Set up bookkeeping needed when dispatching.
 *
 * @param {object} payload
 * @internal
 */
Dispatcher.prototype.$start_dispatch = function(payload) {
  "use strict";
  for (var id in this.$callbacks) {
    this.$pending_status_hash[id] = false;
    this.$handled_status_hash[id] = false;
  }
  this.$curr_payload = payload;
  this.$is_dispatching = true;
};

/**
 * Clear bookkeeping used for dispatching.
 *
 * @internal
 */
Dispatcher.prototype.$stop_dispatch = function() {
  "use strict";
  this.$curr_payload = null;
  this.$is_dispatching = false;
};


module.exports = Dispatcher;

