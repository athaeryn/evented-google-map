module.exports = function EventedGoogleMap(map) {
  var eventsToWatch = [];
  return {
    triggerEvents: function forwardEvents(events) {
      eventsToWatch = events;
      return this;
    },
    on: function to(subject) {
      eventsToWatch.forEach(function setUpEventForwarding(event) {
        google.maps.event.addListener(
          map, event,
          subject.trigger.bind(subject, event)
        )
      });
      return this;
    }
  };
};
