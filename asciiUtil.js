const figlet = require("figlet");

function mostrarAsciiSecuencial(texto) {
  return new Promise((resolve) => {
    figlet(texto, { font: "Slant" }, (err, data) => {
      if (!err) console.log(data);
      setTimeout(resolve, 1500);
    });
  });
}
function enfasisAscii(texto) {
  return new Promise((resolve) => {
    figlet(texto, { font: "ANSI Shadow" }, (err, data) => {
      if (!err) console.log(data);
      setTimeout(resolve, 1500);
    });
  });
}

module.exports = { mostrarAsciiSecuencial, enfasisAscii };
