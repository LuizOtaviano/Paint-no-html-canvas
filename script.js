let color = document.querySelector("#icolor")
let strong = document.querySelector("#istrong")
let erase = document.querySelector("#ierase")
let screen = document.querySelector("#screen")
let controls = document.querySelector("#controls")
let ctx = screen.getContext("2d")

console.log(controls.clientWidth)

var pressing = false
var x = 0
var y = 0

window.onload = function() {
  controls.style = `width: ${document.body.clientWidth - 100}px`
  screen.width = document.body.clientWidth - 100
  screen.height = document.body.clientHeight - 100
  w = (document.body.clientWidth - screen.width) / 2
  h = (document.body.clientHeight - screen.height) / 2
}


window.onresize = function() {
  controls.style = `width: ${document.body.clientWidth - 100}px`
  screen.width = document.body.clientWidth - 100
  screen.height = document.body.clientHeight - 100
  w = (document.body.clientWidth - screen.width) / 2
  h = (document.body.clientHeight - screen.height) / 2
}

ctx.beginPath()
screen.onmousedown = function(evt) {
  x = evt.clientX - w
  y = evt.clientY - h - 35
  pressing = true
  ctx.moveTo(x, y)
}

screen.onmousemove = function(evt) {
  x = evt.clientX - w
  y = evt.clientY - h - 35
  if (pressing) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

screen.onmouseup = function() {
  pressing = false
}