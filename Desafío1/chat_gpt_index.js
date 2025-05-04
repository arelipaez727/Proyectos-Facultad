//Versión chat gpt
const seedrandom = require('seedrandom');
const rng = seedrandom('1763519', { state: true });

const TOTAL_NUMEROS = 1_000_000;
const numeros = [];

for (let i = 0; i < TOTAL_NUMEROS; i++) {
  const num = rng.int32();
  numeros.push(num);
}

// Punto 1: Cantidad de positivos y negativos
let positivos = 0;
let negativos = 0;

numeros.forEach(num => {
  if (num > 0) positivos++;
  else if (num < 0) negativos++;
});

// Punto 2: Resto al dividir por 7 (0, 3, 5, 6)
let countRestos = 0;
numeros.forEach(num => {
  const resto = Math.abs(num % 7);
  if ([0, 3, 5, 6].includes(resto)) countRestos++;
});

// Punto 3: Arreglo por anteúltimo dígito (decenas)
const decenas = {
  0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
  5: 0, 6: 0, 7: 0, 8: 0, 9: 0
};

numeros.forEach(num => {
  const absNum = Math.abs(num);
  if (absNum >= 10) {
    const decena = Math.floor(absNum / 10) % 10;
    decenas[decena]++;
  }
});

// Punto 4: Valor y posición del menor
let menor = numeros[0];
let posicionMenor = 1; // 1-based

for (let i = 1; i < numeros.length; i++) {
  if (numeros[i] < menor) {
    menor = numeros[i];
    posicionMenor = i + 1;
  }
}

// Punto 5: Signo igual al anterior
let igualesAlAnterior = 0;
for (let i = 1; i < numeros.length; i++) {
  const mismoSigno = (numeros[i] >= 0 && numeros[i - 1] >= 0) ||
                     (numeros[i] < 0 && numeros[i - 1] < 0);
  if (mismoSigno) igualesAlAnterior++;
}

// Punto 6: Promedio redondeado de números con 6 dígitos
let suma6dig = 0;
let count6dig = 0;

numeros.forEach(num => {
  const abs = Math.abs(num);
  if (abs >= 100000 && abs <= 999999) {
    suma6dig += num;
    count6dig++;
  }
});

const promedio6dig = count6dig > 0 ? Math.round(suma6dig / count6dig) : 0;

// Mostrar resultados
console.log("1. Positivos:", positivos, "| Negativos:", negativos);
console.log("2. Divisibles por 7 con resto 0, 3, 5 o 6:", countRestos);
console.log("3. Contadores por decenas (anteúltimo dígito):", decenas);
console.log("4. Menor valor:", menor, "| Posición (1-based):", posicionMenor);
console.log("5. Mismo signo que el anterior:", igualesAlAnterior);
console.log("6. Promedio (redondeado) de números con 6 dígitos:", promedio6dig);

console.log("Primeros 5 números:", numeros.slice(0, 5));
console.log("Últimos 5 números:", numeros.slice(-5));
