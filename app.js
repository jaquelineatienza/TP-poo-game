const readline = require("readline");
const { mostrarAsciiSecuencial, enfasisAscii } = require("./asciiUtil");

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
    this.arma = null;
    this.dañoExtra = 0;
  }

  get nombre() {
    return this.#name;
  }

  get vida() {
    return this.#live;
  }

  set vida(valor) {
    this.#live = valor;
  }

  recibirDaño(daño) {
    this.#live -= daño;
    if (this.#live <= 0) {
      console.log(`${this.#name} ha muerto`);
    }
  }

  mostrarInfo() {
    console.log(`Nombre: ${this.#name}, Vida: ${this.#live}`);
    if (this.arma) {
      console.log(`Arma: ${this.arma.nombre} (+${this.arma.daño} daño)`);
    }
  }
}

class Pirata extends Personaje {
  usar_Fruta(nombreFruta) {
    const fruta = frutas_del_diablo.find((f) => f.nombre === nombreFruta);
    if (fruta) {
      this.fruta = fruta.poder;
      this.dañoExtra = fruta.nivel_daño;
      console.log(
        `${this.nombre} ha comido la fruta ${fruta.nombre} (+${fruta.nivel_daño} daño)`
      );
    }
  }
}

class Marine extends Personaje {
  usar_Haki(nombreHaki) {
    const haki_elegido = hakis.find((f) => f.nombre === nombreHaki);
    if (haki_elegido) {
      this.haki = haki_elegido.nivel;
      this.dañoExtra = haki_elegido.nivel_daño;
      console.log(
        `${this.nombre} ha aprendido ${haki_elegido.nombre} (+${haki_elegido.nivel_daño} daño)`
      );
    }
  }
}

const armas = [
  { nombre: "pistola", daño: 40 },
  { nombre: "cuchillo", daño: 20 },
  { nombre: "piña", daño: 10 },
];

const frutas_del_diablo = [
  { nombre: "Neko Neko no Mi", poder: "Leopardo", nivel_daño: 20 },
  { nombre: "Mera Mera no Mi", poder: "Fuego", nivel_daño: 70 },
  { nombre: "Gomu Gomu No Mi", poder: "Elástico", nivel_daño: 50 },
];

const hakis = [
  { nombre: "Haki de Observación", nivel: "básico", nivel_daño: 20 },
  { nombre: "Haki de Armadura", nivel: "básico", nivel_daño: 50 },
  { nombre: "Haki de Conquistador", nivel: "avanzado", nivel_daño: 70 },
];

function elegirAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

class Batalla {
  static async iniciar(jugador, enemigo) {
    await mostrarAsciiSecuencial("Batalla!");
    await mostrarAsciiSecuencial(`${jugador.nombre} vs ${enemigo.nombre}`);

    while (jugador.vida > 0 && enemigo.vida > 0) {
      let dañoJugador = jugador.arma.daño + jugador.dañoExtra;
      enemigo.recibirDaño(dañoJugador);
      await mostrarAsciiSecuencial(`${jugador.nombre} ataca!`);
      console.log(
        `${jugador.nombre} inflige ${dañoJugador} de daño. Vida de ${enemigo.nombre}: ${enemigo.vida}`
      );

      if (enemigo.vida <= 0) break;

      let dañoEnemigo = enemigo.arma.daño + enemigo.dañoExtra;
      jugador.recibirDaño(dañoEnemigo);
      await mostrarAsciiSecuencial(`${enemigo.nombre} ataca!`);
      console.log(
        `${enemigo.nombre} inflige ${dañoEnemigo} de daño. Vida de ${jugador.nombre}: ${jugador.vida}`
      );
    }

    const ganador = jugador.vida > 0 ? jugador : enemigo;
    await enfasisAscii(`Ganador: ${ganador.nombre}`);
    console.log(` La batalla ha terminado. Ganador: ${ganador.nombre}`);
  }
}

async function elegirPersonaje() {
  rl.question("Elige tipo de personaje (Pirata/Marine): ", (tipo) => {
    rl.question("Ingresa el nombre del personaje: ", async (nombre) => {
      let personaje;

      switch (tipo.toLowerCase()) {
        case "pirata":
          personaje = new Pirata(nombre);
          personaje.arma = elegirAleatorio(armas);
          console.log("Frutas disponibles:");
          frutas_del_diablo.forEach((f) =>
            console.log(`- ${f.nombre} (${f.nivel_daño} daño)`)
          );

          rl.question("Elige una fruta: ", async (fruta) => {
            personaje.usar_Fruta(fruta);

            const enemigo = new Marine("Marine");
            enemigo.arma = elegirAleatorio(armas);
            enemigo.usar_Haki(elegirAleatorio(hakis).nombre);

            await mostrarAsciiSecuencial(personaje.nombre);
            personaje.mostrarInfo();
            await mostrarAsciiSecuencial(enemigo.nombre);
            enemigo.mostrarInfo();

            await mostrarAsciiSecuencial("¡Comienza la batalla!");
            await Batalla.iniciar(personaje, enemigo);

            rl.close();
          });
          break;

        case "marine":
          personaje = new Marine(nombre);
          personaje.arma = elegirAleatorio(armas);
          console.log("Hakis disponibles:");
          hakis.forEach((h) => console.log(`- ${h.nombre}`));

          rl.question("Elige un haki: ", async (haki) => {
            personaje.usar_Haki(haki);

            const enemigo = new Pirata("Pirata");
            enemigo.arma = elegirAleatorio(armas);
            enemigo.usar_Fruta(elegirAleatorio(frutas_del_diablo).nombre);

            await mostrarAsciiSecuencial(personaje.nombre);
            personaje.mostrarInfo();
            await mostrarAsciiSecuencial(enemigo.nombre);
            enemigo.mostrarInfo();

            await mostrarAsciiSecuencial("¡Comienza la batalla!");
            await Batalla.iniciar(personaje, enemigo);

            rl.close();
          });
          break;

        default:
          console.log("Tipo de personaje no válido");
          rl.close();
          break;
      }
    });
  });
}

elegirPersonaje();
