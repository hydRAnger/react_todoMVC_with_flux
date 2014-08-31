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

Dispatcher.prototype.register = function(callback) {
  "use strict";
  var _curr_id = _last_id + 1;
  var id = _prefix + _curr_id;
  this.$callbacks[id] = callback;
  return id;
};

Dispatcher.prototype.unregister = function(id) {"use strict";
  if ( callback[id] ) {
    delete this.$callbacks[id];
  } else {
    console.error("callback:"+id+" dose not registered!");
  }
};

Dispatcher.prototype.waitFor = function(ids) {"use strict";
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

Dispatcher.prototype.dispatch = function(payload) {
  "use strict";
  this.$start_dispatch(payload);
  try {
    for (var id in this.$callbacks) {
      if ( !this.$pending_status_hash[id] ) {
        this.$invoke_callback(id);
      }
    }
  } finally {
    this.$stop_dispatch();
  }
};

Dispatcher.prototype.is_dispatching = function() {
  "use strict";
  return this.$is_dispatching;
};

Dispatcher.prototype.$invoke_callback = function(id) {
  "use strict";
  this.$pending_status_hash[id] = true;
  this.$callbacks[id](this.$curr_payload);
  this.$handled_status_hash[id] = true;
};

Dispatcher.prototype.$start_dispatch = function(payload) {
  "use strict";
  for (var id in this.$callbacks) {
    this.$pending_status_hash[id] = false;
    this.$handled_status_hash[id] = false;
  }
  this.$curr_payload = payload;
  this.$is_dispatching = true;
};

Dispatcher.prototype.$stop_dispatch = function() {
  "use strict";
  this.$curr_payload = null;
  this.$is_dispatching = false;
};

module.exports = Dispatcher;
