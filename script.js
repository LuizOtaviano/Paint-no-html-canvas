let color = document.querySelector("#icolor")
let strong = document.querySelector("#istrong")
let output = document.querySelector("output")
let erase = document.querySelector("#ierase")
let screen = document.querySelector("#screen")
let controls = document.querySelector("#controls")
let btn_clear = document.querySelector("#clear")
let bucket = document.querySelector("#bucket")
let ctx = screen.getContext("2d")

var pressing = false
var x = 0
var y = 0
var w = 0
var h = 0
output.innerHTML = strong.value

// espessura da linha
strong.oninput = function() {
  output.innerHTML = strong.value
}

// Define o tamanho dos compontes
window.onload = function() {
  controls.style = `width: ${document.body.clientWidth - 100}px`
  screen.width = document.body.clientWidth - 100
  screen.height = document.body.clientHeight - 100
  w = (document.body.clientWidth - screen.width) / 2
  h = (document.body.clientHeight - screen.height) / 2
}

// Recursividade
window.onresize = function() {
  controls.style = `width: ${document.body.clientWidth - 100}px`
  screen.width = document.body.clientWidth - 100
  screen.height = document.body.clientHeight - 100
  w = (document.body.clientWidth - screen.width) / 2
  h = (document.body.clientHeight - screen.height) / 2
}

// Evento quando o mouse clica no canvas
screen.onmousedown = function(evt) {
  ctx.beginPath()
  // Permite usar o balde de cor
  if (bucket.classList.contains("clicado")) {
    ctx.fillStyle = color.value
    ctx.fillRect(0, 0, document.body.clientWidth - 100, document.body.clientHeight - 100)
  }
  x = evt.clientX - w
  y = evt.clientY - h - 35
  pressing = true
  ctx.moveTo(x, y)
}

// Evento para desenhar no canvas com o movimento do mouse clicado
screen.onmousemove = function(evt) {
  x = evt.clientX - w
  y = evt.clientY - h - 35
  if (pressing) {
    if (erase.classList.contains("clicado")) {
      ctx.clearRect(x-35, y-35, 50, 50)
    } else {
      ctx.strokeStyle = color.value
      ctx.lineWidth = strong.value
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

// Quando solta o clique do mouse ele para de desenhar
screen.onmouseup = function() {
  pressing = false
}

// Permite usar a borracha e reseta as outras config
erase.addEventListener("click", () => {
  erase.classList.toggle("clicado")

  if (erase.classList.contains("clicado")) {
    document.body.setAttribute("class", "erase")
  } else {
    document.body.removeAttribute("class", "erase")
  }

  bucket.classList.remove("clicado")
})

// Reseta as config ao clicar na cor
color.addEventListener("click", () => {
  document.body.removeAttribute("class")
  erase.classList.remove("clicado")
  bucket.classList.remove("clicado")
})

// Reseta as config ao clicar na espessura
strong.addEventListener("click", () => {
  document.body.removeAttribute("class")
  erase.classList.remove("clicado")
  bucket.classList.remove("clicado")
})

// Limpa toda a tela
btn_clear.addEventListener("click", () => {
  ctx.beginPath()
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, document.body.clientWidth-100, document.body.clientHeight-100)
  document.body.removeAttribute("class")
  erase.classList.remove("clicado")
  bucket.classList.remove("clicado")
})

// Permite usar o balde e reseta as outras config
bucket.addEventListener("click", () => {
  bucket.classList.toggle("clicado")

  if (bucket.classList.contains("clicado")) {
    document.body.setAttribute("class", "bucket")
  } else {
    document.body.removeAttribute("class")
  }
  erase.classList.remove("clicado")
})