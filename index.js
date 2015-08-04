module.exports = function EventedGoogleMap(map) {
  var eventsToWatch = [];
  return {
    triggerEvents: function forwardEvents(events) {
      eventsToWatch = events;
      return this;
    },
    on: function to(subject) {
      var emitMethod = subject.emit || subject.trigger;
      eventsToWatch.forEach(function setUpEventForwarding(event) {
        google.maps.event.addListener(
          map, event,
          emitMethod.bind(subject, event)
        )
      });
      return this;
    }
  };
};
