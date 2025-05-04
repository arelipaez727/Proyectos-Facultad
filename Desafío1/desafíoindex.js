//Mi versión del desafío 1

const seedrandom = require('seedrandom');
const aleatorio = seedrandom('1763519', { state: true });
const TOTAL_NUMEROS = 1_000_000;
const lista_numeros = [];

for (let i=0; i < TOTAL_NUMEROS; i++) {
    const num = aleatorio.int32();
    lista_numeros.push(num);
}



console.log("Primeros 5 números:", lista_numeros.slice(0, 5));


//1) Cantidad de numeros postivos y negativos.
let positivos = 0;
let negativos = 0;
for (let i = 0; i < lista_numeros.length; i++) {
    if(lista_numeros[i] > 0) {
        positivos++;
    }
    if (lista_numeros[i] < 0) {
        negativos++;
    }
}

//2) Cantidad de numeros que al dividir por 7 dan resto 0, 3, 5 o 6.
let restos =0;
for (let i=0 ; i < lista_numeros.length; i++) {
    let resto = Math.abs(lista_numeros[i])%7;
    if ([0,3,5,6].includes(resto) === true) {
        restos++;
    }
}


//3) Arreglo por anteúltimo dígito (decenas).
let contador = [0,0,0,0,0,0,0,0,0,0]
for (i=0; i< lista_numeros.length; i++) {
    num = Math.abs(lista_numeros[i]);
    if (num >= 10) {
        let decena = Math.floor(num/10)%10;
        contador[decena]++;
    }

}


//4) Valor y posición del menor.
let menor = lista_numeros[0];
let posicion_menor = 1;  // 1-based index

for (let i = 1; i < lista_numeros.length; i++) {
    if (lista_numeros[i] < menor) {
        menor = lista_numeros[i];
        posicion_menor = i + 1;
    }
}


//5) Cantidad de números con el mismo signo que el anterior.

let iguales = 0;
for (let i = 1; i < lista_numeros.length; i++) {
    if ((lista_numeros[i] >= 0 && lista_numeros[i-1] >= 0) || (lista_numeros[i] < 0 && lista_numeros[i-1] < 0)) {
        iguales++;
    }
}


//6) Promedio redondeado de números con 6 dígitos.
let suma6dig = 0;
let contador6dig = 0;   
for (let i = 0; i < lista_numeros.length; i++) {
    let absoluto = Math.abs(lista_numeros[i]);
    if (absoluto >= 100000 && absoluto <= 999999) {
        suma6dig += lista_numeros[i];
        contador6dig++;
    }
}

let promedio = 0;
if (contador6dig > 0) {
    promedio = Math.round(suma6dig / contador6dig);
}


console.log("1. Positivos:", positivos, "| Negativos:", negativos);
console.log("2. Cantidad de numeros que al dividir por 7 dan resto 0, 3, 5 o 6:", restos);
console.log("3. Arreglo por anteúltimo dígito (decenas):", contador);
console.log("4. Valor y posición del menor:", menor, posicion_menor);
console.log("5. Cantidad de números con el mismo signo que el anterior:", iguales);
console.log("6. Promedio redondeado de números con 6 dígitos:", promedio);


console.log("Primeros 5 números:", lista_numeros.slice(0, 5));
console.log("Últimos 5 números:", lista_numeros.slice(-5));
