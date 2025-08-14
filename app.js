const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class Personaje {
  #name;
  #live;
  constructor(name) {
    this.#name = name;
    this.#live = 100;
  }

  get vida() {
    return this.#live;
  }
  generar_daño(daño) {
    this.#live = this.#live - daño;

    if (this.#live < 0) {
      console.log("Personaje muerto");
    }
  }
}

class Protagonista extends Personaje {
  regenerar_vida() {
    this.vida += 10;
  }
}

class Pirata extends Protagonista {
  usar_Fruta(fruta) {
    const fruta_elegida = frutas_del_diablo.find((f) => f.name === fruta);
    return fruta_elegida.nivel_daño;
  }
}

class Marine extends Protagonista {
  usar_Haki(haki) {
    const haki_elegido = hakis.find((f) => f.name === haki);
    return haki_elegido.nivel_daño;
  }
}

const frutas_del_diablo = [
  { nombre: "Neko Neko no Mi", poder: "Leopardo", nivel_daño: 20 },
  { nombre: "Mera Mera no Mi", poder: "Fuego", nivel_daño: 70 },
  { nombre: "Gomu Gomu No Mi", poder: "Elastico", nivel_daño: 50 },
];
const hakis = [
  { nombre: "Haki de Observación ", nivel: "basico", nivel_daño: 20 },
  { nombre: "Haki de Armadura ", poder: "basico", nivel_daño: 50 },
  { nombre: "Haki de Conquistador", poder: "Avanzado", nivel_daño: 70 },
];
function elegirPersonaje() {
  rl.question("Elige tipo de personaje (Pirata/Marine): ", (tipo) => {
    rl.question("Ingresa el nombre del personaje: ", (nombre) => {
      let personaje;

      if (tipo.toLowerCase() === "pirata") {
        personaje = new Pirata(nombre);
        console.log("Frutas disponibles:");
        frutas_del_diablo.forEach((f) => console.log(`- ${f.nombre}`));
        rl.question("Elige una fruta: ", (fruta) => {
          personaje.usar_Fruta(fruta);
          personaje.mostrarInfo();
          rl.close();
        });
      } else if (tipo.toLowerCase() === "marine") {
        personaje = new Marine(nombre);
        console.log("Hakis disponibles:");
        hakis.forEach((h) => console.log(`- ${h.nombre}`));
        rl.question("Elige un haki: ", (haki) => {
          personaje.usar_Haki(haki);
          personaje.mostrarInfo();
          rl.close();
        });
      } else {
        console.log("Tipo de personaje no válido");
        rl.close();
      }
    });
  });
}

elegirPersonaje();
