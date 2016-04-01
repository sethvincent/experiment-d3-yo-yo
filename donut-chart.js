var yo = require('yo-yo')
var shape = require('d3-shape')

module.exports = function createTextInput (state, send) {
  var data = state.data
  var colors = state.colors
  var arcs = shape.pie()(data)

  function shapes (arcs) {
    return arcs.map(function (item, i) {
      var arc = shape.arc()
        .outerRadius(50)
        .innerRadius(40)
        .padAngle(0.05)
        .startAngle(item.startAngle)
        .endAngle(item.endAngle)

      return yo`<path d=${arc(item)} fill=${colors[i]}>`
    })
  }

  return yo`<svg width="100" height="100">
    <g transform="translate(50, 50)"}>${shapes(arcs)}</g>
  </svg>`
}
