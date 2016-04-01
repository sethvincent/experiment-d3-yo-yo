var yo = require('yo-yo')

module.exports = function createTextInput (state, send) {
  function oninput (e) {
    send('input:text', { event: e, value: e.target.value })
  }

  return yo`
    <input type="text" value="${state}" oninput=${oninput}>
  `
}
