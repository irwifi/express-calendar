var beforeEach = require('mocha').beforeEach
var describe = require('mocha').describe
var demand = require('must')
var it = require('mocha').it
var request = require('supertest')

describe('express-calendar', function () {
  var app

  beforeEach(function () {
    app = require('./example')
  })

  it('must respond with every event of a day', function (done) {
    request(app)
      .get('/2016/04/01/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }

        demand(res.body).to.be.an.object()
        demand(res.body).to.have.property('items')

        var events = res.body.items
        demand(events).to.be.an.array()
        demand(events).to.have.length(3)

        var eventNames = events.map(function (event) {
          return event.summary
        })
        demand(eventNames).to.eql(['The Rainbow', 'The Jets', 'The Sharks'])

        done()
      })
  })

  it('must respond with every event of a month', function (done) {
    request(app)
      .get('/2016/03/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }

        demand(res.body).to.be.an.object()
        demand(res.body).to.have.property('items')

        var events = res.body.items
        demand(events).to.be.an.array()
        demand(events).to.have.length(2)

        var eventNames = events.map(function (event) {
          return event.summary
        })
        demand(eventNames).to.eql(['Somewhere', 'Over'])

        done()
      })
  })

  it('must respond with every event of a year', function (done) {
    request(app)
      .get('/2016/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }

        demand(res.body).to.be.an.object()
        demand(res.body).to.have.property('items')

        var events = res.body.items
        demand(events).to.be.an.array()
        demand(events).to.have.length(5)

        var eventNames = events.map(function (event) {
          return event.summary
        })
        demand(eventNames).to.eql(['Somewhere', 'Over', 'The Rainbow', 'The Jets', 'The Sharks'])

        done()
      })
  })
})
