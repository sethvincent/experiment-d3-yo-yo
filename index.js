var yo = require('yo-yo')
var sf = require('sheetify')
var extend = require('xtend')

var send = require('send-action')({
  onaction: onaction,
  onchange: onchange,
  state: {
    text: 'hello',
    number: 10,
    donut: {
      data: [5, 10, 25, 50],
      colors: ['red', 'green', 'blue', 'orange']
    }
  }
})

var text = require('./input-text')
var numberInput = require('./input-number')
var donut = require('./donut-chart')
var donutInputs = require('./donut-chart-inputs')

var prefix = sf`
  :host {
    font-family: sans-serif;
    width: 90%;
    max-width: 500px;
    background-color: #fff;
    margin: 50px auto;
  }

  hr {
    border: 0px;
    border-bottom: 1px solid #ccc;
  }
`

function render (state) {
  return yo`
    <div id="app" class="${prefix}">
      <h1>Experiments</h1>
      <p>Trying out yo-yo.js, d3, & sheetify.</p>

      <h2>Text input</h2>
      ${text(state.text, send)}
      text value: <b>${state.text}</b>
      <hr>

      <h2>Number input</h2>
      ${numberInput(state.number, send)}
      number value: <b>${state.number}</b>
      <hr>

      <h2>Donut chart</h2>
      ${donut(state.donut, send)}
      ${donutInputs(state.donut, send)}
    </div>
  `
}

function onaction (action, state) {
  var type = action.type

  if (type === 'input:text') {
    return extend(state, { text: action.value })
  } 

  if (type === 'input:number') {
    return extend(state, { number: action.value })
  }

  if (type === 'input:donut') {
    var donut = extend(state.donut)
    donut.data[action.index] = action.value
    return extend(state, { donut: donut })
  }

  return state
}

function onchange (action, state) {
  yo.update(document.getElementById('app'), render(state))
}

document.body.appendChild(render(send.state()))
