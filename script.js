function updateImages() {
  const html = document.documentElement
  // Se o usuário tiver trocado para light explicitamente, isso prevalece.
  // Caso contrário, respeitamos a preferência do sistema (prefers-color-scheme).
  const isLight = html.classList.contains("light")
    ? true
    : window.matchMedia("(prefers-color-scheme: light)").matches

  // avatar
  const img = document.querySelector("#profile img")
  if (img) {
    img.setAttribute(
      "src",
      isLight ? "./assets/avatar-light.svg" : "./assets/avatar-dark.svg"
    )
  }

  // footer icon
  const footerIcon = document.querySelector("#footer-icon")
  if (footerIcon) {
    footerIcon.setAttribute(
      "src",
      isLight ? "./assets/icon-light.png" : "./assets/icon-dark.png"
    )
  }

  // favicon
  const favicon =
    document.querySelector("#favicon") ||
    document.querySelector('link[rel="icon"]')
  if (favicon) {
    favicon.setAttribute(
      "href",
      isLight ? "./assets/icon-light.png" : "./assets/icon-dark.png"
    )
  }
}

function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light")
  updateImages()
}

// Reage a mudanças na preferência de cor do sistema (modo dark/light)
const colorSchemeMq = window.matchMedia("(prefers-color-scheme: light)")
if (colorSchemeMq.addEventListener) {
  colorSchemeMq.addEventListener("change", () => updateImages())
} else if (colorSchemeMq.addListener) {
  colorSchemeMq.addListener(() => updateImages())
}

// Inicializa imagens corretas ao carregar a página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateImages)
} else {
  updateImages()
}
