var assert = require('assert')
var EventedGoogleMap = require('../')

var makeMapMock

describe('EventedGoogleMap', function () {
  it('should set up event forwarding', function () {
    var map = makeMapMock()
    EventedGoogleMap(map)
      .triggerOn(map, ['foo', 'bar'])
      .triggerOn(map, ['baz', 'quux'])
    assert.equal(map.events.length, 4)
    assert.equal(map.emitCount, 0)
  })

  it('should trigger events', function () {
    var map = makeMapMock()
    EventedGoogleMap(map)
      .triggerOn(map, ['foo', 'bar', 'baz', 'quux'])

    assert.equal(map.emitCount, 0)
    map.trigger('foo')
    assert.equal(map.emitCount, 1)
    map.trigger('bar')
    assert.equal(map.emitCount, 2)
  })
})

makeMapMock = (function () {
  var __map = {
    addListener: function (event, fn) {
      this.events.push([event, fn])
    },
    emit: function () { this.emitCount++ },
    trigger: function (eventName) {
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i][0] == eventName) {
          this.events[i][1]()
          continue
        }
      }
    }
  }

  return function makeMapMock () {
    var map = Object.create(__map)
    map.events = []
    map.emitCount = 0
    return map
  }
})()
