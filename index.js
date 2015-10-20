module.exports = function EventedGoogleMap (map) {
  return {
    triggerOn: function forwardEvents (subject, events) {
      var emitMethod = subject.emit || subject.trigger
      for (var i = 0; i < events.length; i++) {
        map.addListener(events[i], emitMethod.bind(subject, events[i]))
      }
      return this
    }
  }
}

