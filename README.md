# Evented Google Map

Triggers events from a Google Map on an object that has Backbone Events.
Tested with the Google Maps JavaScript API version 3.17.

## Install

`npm install evented-google-map`

## Usage

Assumes you have the Google Maps JS loaded (you need this anyway to create the
Map).

```js
Backbone = require 'backbone'
EventedGoogleMap = require 'evented-google-map'

model = new Backbone.Model
model.on('idle', console.log.bind(console, "The map went idle."))

map = new google.maps.Map( ... )

EventedGoogleMap(map)
  .triggerEvents(['idle'])
  .on(model)

// logs "The map went idle."
```
