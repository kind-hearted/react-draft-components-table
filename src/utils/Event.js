class Event {
  constructor() {
    this.events = {};
  }

  $on(type, callback) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  $emit(type, params) {
    const callbacks = this.events[type];

    if (Array.isArray(callbacks)) {
      callbacks.forEach(function (callback) {
        callback.call(this, params);
      });
    }
  }

  $off(type, callback) {
    if (type && typeof type === 'string') {
      if (typeof callback === 'function') {
        const callbacks = this.events[type];

        if (Array.isArray(callbacks)) {
          for (let i = 0, ilen = callbacks.length; i < ilen; i++) {
            if (callback === callbacks[i]) {
              callbacks.splice(i, 1);
            }
          }
        }
      } else {
        this.events[type] = null;
      }
    } else {
      this.events = {};
    }
  }
}

export default Event;