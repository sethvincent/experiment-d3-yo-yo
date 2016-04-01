var yo = require('yo-yo')

module.exports = function createNumberInput (state, send) {
  function oninput (e) {
    send('input:number', { event: e, value: e.target.value })
  }

  return yo`
    <input type="number" value="${state}" oninput=${oninput}>
  `
}
