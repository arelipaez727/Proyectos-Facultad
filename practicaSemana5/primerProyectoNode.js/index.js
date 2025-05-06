"use strict";

import seedrandom from "seedrandom";

var random = seedrandom(1763519);

let numerosAleatorios = Array.from({ length: 100}, () => random.int32());

console.log("demostracion de join: {" + numerosAleatorios.join(", ") + "}");

console.log("Cantidad de positivos: ", numerosAleatorios.filter(value => value > 0).length);


