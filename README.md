# Evented Google Map

Triggers events from a Google Map on an object that has Backbone Events.
Tested with the Google Maps JavaScript API version 3.17.

## Install

`npm install evented-google-map`

## Usage

You can trigger events on the Map object itself by mixing in `Backbone.Events`,
or any other object with Backbone Events (including a Model).

Note: the following code assumes you have the Google Maps JS loaded (you need
this anyway to create the Map).

```js
_                = require('underscore')
Backbone         = require('backbone')
EventedGoogleMap = require('evented-google-map')

model = new Backbone.Model
map   = new google.maps.Map( ... )
_.extend(map, Backbone.Events)

model.on('idle', console.log.bind(console, 'The model saw the map go idle.'))
map.on('dragend', console.log.bind(console, 'The map was dragged.'))

EventedGoogleMap(map)
  .triggerEvents(['idle'])
  .on(model)

EventedGoogleMap(map)
  .triggerEvents(['dragend'])
  .on(map)
```

You can also chain those last calls together:

```js
EventedGoogleMap(map)
  .triggerEvents(['idle'])
  .on(model)
  .triggerEvents(['dragend'])
  .on(map)
```
