var yo = require('yo-yo')
var sf = require('sheetify')
var number = require('./input-number')

module.exports = function createDonutInputs (state, send) {
  function inputs (state) {
    return state.data.map(function (item, i) {
      function oninput (e) {
        send('input:donut', { event: e, value: e.target.value, index: i })
      }

      var prefix = sf`
        span {
          width: 10px;
          height: 10px;
          display: inline-block;
        }
        
        input {
          margin-bottom: 5px;
        }
      `

      return yo`<div class="${prefix}">
        <span style="background-color:${state.colors[i]}"></span>
        <input type="number" value="${state.data[i]}" oninput=${oninput}>
      </div>`
    })
  }

  return yo`<div>${inputs(state)}</div>`
}
