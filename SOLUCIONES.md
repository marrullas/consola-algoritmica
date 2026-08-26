# Soluciones de referencia · Consola Algorítmica

> Material para el instructor. No publiques este archivo donde el aprendiz lo vea
> antes de entregar: convierte la consola en un simple copiar y pegar. La idea es
> que tú lo uses para validar respuestas, preparar la sesión sincrónica y
> detectar los puntos donde el aprendiz se traba con más frecuencia.

Cada bloque del documento (en `assets/js/data.js`) está resuelto abajo con la
lógica esperada y, cuando aplica, el pseudocódigo o el código en JavaScript.

---

## Capítulo 1 · Lógica proposicional (AA1-EV01)

### Expresión 1 — `(2 * 5) < 8 OR ((4 * 6) > (2 * 5))`

| Paso | Subexpresión | Resultado |
|------|--------------|-----------|
| 1 (aritmética) | `2 * 5` | `10` |
| 1 (aritmética) | `4 * 6` | `10` *(ojo: 2*5 a la derecha también da 10, no 25)* |
| 1 (aritmética) | `2 * 5` | `10` |
| 2 (comparación) | `10 < 8` | `Falso` |
| 2 (comparación) | `10 > 10` | `Falso` |
| 3 (lógico) | `Falso OR Falso` | **`Falso`** |

El error clásico aquí es leer el último término como `2 * 5` separado cuando
realmente son tres multiplicaciones distintas. El resultado es **Falso**, no
Verdadero como muchos creen a primera vista.

### Expresión 2 — `(4 + 5) < 3 AND ((5 * 5) + (4 + 25 < 3))`

| Paso | Subexpresión | Resultado |
|------|--------------|-----------|
| 1 | `4 + 5` | `9` |
| 1 | `5 * 5` | `25` |
| 1 | `4 + 25` | `29` |
| 2 | `9 < 3` | `Falso` |
| 2 | `29 < 3` | `Falso` |
| 3 | `25 + Falso` | **inválido como proposición** |
| 4 | `Falso AND ?` | **`Falso`** (AND corta con el primer Falso) |

**La observación que debe escribir el aprendiz:** el segundo operando del AND
suma un número (`25`) con un valor lógico (`Falso`). Eso no es una proposición
bien formada en lógica. En JavaScript la coerción lo evalúa como `25` (porque
`Falso` se convierte a `0`), pero en lógica proposicional la expresión está mal
construida y el AND se queda en `Falso` por cortocircuito. Esta es la trampa
que la guía pone a propósito.

### Tablas de verdad

**P ∧ Q:**

| P | Q | P ∧ Q |
|---|---|-------|
| V | V | **V** |
| V | F | F |
| F | V | F |
| F | F | F |

**P ∨ Q:**

| P | Q | P ∨ Q |
|---|---|-------|
| V | V | **V** |
| V | F | V |
| F | V | V |
| F | F | F |

---

## Capítulo 2 · Análisis de problemas y diagramas de flujo (AA1-EV02)

Las preguntas de las cuatro situaciones admiten variaciones. Lo que importa es
que el aprendiz identifique **qué se conoce**, **qué se calcula** y **qué
información falta**. Abajo va una respuesta razonable para cada una.

### Situación 1 — Pesos a dólares

- **Necesaria:** tasa de cambio del día (pesos por dólar) y el valor en pesos.
- **Prescindible:** nombre del banco, ciudad, fecha exacta.
- **Datos de entrada:** valor en pesos, tasa de cambio.
- **Incógnita:** valor equivalente en dólares.
- **Categorías:** sí — moneda origen, moneda destino, tasa.
- **Faltante:** la tasa del día (cambia).
- **Solicitada:** el valor numérico en dólares.
- **Formato:** número con dos decimales, idealmente con el símbolo `USD`.

### Situación 2 — Fahrenheit a centígrados

- **Necesaria:** temperatura en °F y la fórmula de conversión.
- **Prescindible:** humedad, hora del día, ciudad específica.
- **Datos de entrada:** temperatura actual en °F.
- **Incógnita:** temperatura en °C.
- **Categorías:** sí — escalas de temperatura.
- **Faltante:** ninguna. La fórmula es universal: `C = (F − 32) × 5/9`.
- **Solicitada:** la temperatura equivalente en °C.
- **Formato:** número con un decimal, símbolo `°C`.

### Situación 3 — Plan para llegar al trabajo

- **Necesaria:** hora de ingreso, distancia, medio de transporte, hora de salida.
- **Prescindible:** qué desayuna, con quién va.
- **Datos de entrada:** hora límite, distancia, modo de transporte.
- **Incógnita:** hora a la que debe salir (o la ruta óptima).
- **Categorías:** sí — tiempos, trayectos, medios.
- **Faltante:** estado del tráfico en tiempo real, disponibilidad de transporte.
- **Solicitada:** un plan ordenado con horarios.
- **Formato:** lista cronológica de pasos con horas.

### Situación 4 — Arroz con pollo para 5 personas

- **Necesaria:** receta base (con sus cantidades para otra porción), ingredientes disponibles, utensilios.
- **Prescindible:** marca del arroz, decoración del plato.
- **Datos de entrada:** receta original (por ejemplo, para 2 o 4 personas).
- **Incógnita:** cantidades ajustadas a 5 porciones y pasos de preparación.
- **Categorías:** sí — ingredientes, cantidades, pasos.
- **Faltante:** restricciones alimentarias (alergias, vegetarianos), tiempo disponible.
- **Solicitada:** receta detallada para 5.
- **Formato:** dos bloques — lista de ingredientes con cantidades, lista de pasos numerados.

### Símbolos del diagrama de flujo (respuesta corta)

| Símbolo | Forma | Uso |
|---------|-------|-----|
| Inicio / Fin | Óvalo | Marca el inicio y el final del algoritmo. |
| Proceso | Rectángulo | Una acción (asignación, cálculo). |
| Decisión | Rombo | Una comparación que produce Sí/No o Verdadero/Falso. |
| Entrada / Salida | Paralelogramo | Lectura de datos o impresión de resultados. |
| Conector | Círculo | Une partes del diagrama en la misma página. |
| Conector de página | Pentágono / casa | Une partes del diagrama entre páginas distintas. |
| Dirección | Flecha | Indica el orden de ejecución. |

### Tres fuentes en formato APA (ejemplo orientativo)

- Joyanes Aguilar, L. (2008). *Fundamentos de programación: algoritmos, estructuras de datos y objetos* (4.ª ed.). McGraw-Hill.
- Cairó Battistutti, O. (2005). *Metodología de la programación: algoritmos, diagramas de flujo y programas* (3.ª ed.). Alfaomega.
- Pinales Delgado, F. J., & Velázquez Amador, C. (2014). *Algoritmos resueltos con diagramas de flujo y pseudocódigo*. Universidad Autónoma de Aguascalientes. http://editorial.uaa.mx

(El aprendiz puede usar otras; lo que se evalúa es que sean tres, confiables y bien citadas.)

---

## Capítulo 3 · Estructuras de control (AA2-EV01)

### Algoritmo A — Edad entre dos fechas

**Entradas:** día, mes y año de nacimiento; día, mes y año actuales.
**Salidas:** edad en años.
**Procesos:** resta de años, ajuste si todavía no ha cumplido años este año.

**Pseudocódigo:**

```
Inicio
  Leer dia_nac, mes_nac, anio_nac
  Leer dia_act, mes_act, anio_act
  edad ← anio_act − anio_nac
  Si (mes_act < mes_nac) O (mes_act = mes_nac Y dia_act < dia_nac) Entonces
    edad ← edad − 1
  FinSi
  Mostrar edad
Fin
```

**Prueba de escritorio con 20/05/1990 y 18/08/2026:**

| Línea | anio_nac | anio_act | mes_nac | mes_act | dia_nac | dia_act | edad | Mostrar |
|-------|----------|----------|---------|---------|---------|---------|------|---------|
| `edad ← 2026 − 1990` | 1990 | 2026 | 5 | 8 | 20 | 18 | **36** | — |
| ¿ajuste? 8 ≥ 5, no entra al Si | 1990 | 2026 | 5 | 8 | 20 | 18 | 36 | — |
| `Mostrar edad` | — | — | — | — | — | — | 36 | **36** |

Resultado: **36 años** (cumplió en mayo, estamos en agosto).

### Algoritmo B — Año bisiesto

**Entradas:** un año (entero).
**Salidas:** "Es bisiesto" o "No es bisiesto".
**Procesos:** comprobación de divisibilidad por 4, por 100 y por 400.

**Pseudocódigo:**

```
Inicio
  Leer anio
  Si (anio % 4 = 0) Y ((anio % 100 ≠ 0) O (anio % 400 = 0)) Entonces
    Mostrar "Es bisiesto"
  Sino
    Mostrar "No es bisiesto"
  FinSi
Fin
```

**Prueba de escritorio:**

| Año | anio % 4 | anio % 100 | anio % 400 | Resultado |
|-----|----------|------------|------------|-----------|
| 2024 | 0 | ≠0 | — | **Es bisiesto** |
| 2100 | 0 | 0 | ≠0 | **No es bisiesto** |

El caso 2100 es el que descubre el error clásico: muchos algoritmos revisan
solo `anio % 4 = 0` y se equivocan con 2100 (y con 1900, 2200, 2300…). Un año
es bisiesto si es divisible por 4 **y** no por 100, **salvo** que también sea
divisible por 400.

---

## Capítulo 4 · Los diez módulos (AA2-EV03)

Cada módulo espera pseudocódigo y diagrama de flujo. Abajo va el pseudocódigo
de referencia — el diagrama de flujo es la traducción visual del mismo flujo.

### Módulo 1 · Tiempo medio por kilómetro (corredor de maratón)

```
Inicio
  Leer horas, minutos
  Leer distancia_km
  tiempo_total ← horas * 60 + minutos
  ritmo ← tiempo_total / distancia_km
  Mostrar "Ritmo medio:", ritmo, "min/km"
Fin
```

Con 2 h 25 min y 42,195 km: `tiempo_total = 145 min`, `ritmo = 145 / 42,195 ≈ 3,44 min/km`.

### Módulo 2 · Centígrados a Fahrenheit

```
Inicio
  Leer celsius
  fahrenheit ← (9 / 5) * celsius + 32
  Mostrar fahrenheit
Fin
```

### Módulo 3 · Nota del primer parcial (30% talleres+quiz, 70% examen)

```
Inicio
  Leer taller1, taller2, quiz, examen
  nota_talleres ← (taller1 + taller2 + quiz) / 3
  nota_final ← nota_talleres * 0.3 + examen * 0.7
  Mostrar nota_final
Fin
```

### Módulo 4 · Años para duplicar un capital a interés R

```
Inicio
  Leer C, R          // R en decimal (0.05 = 5%)
  anios ← log(2) / log(1 + R)
  Mostrar anios
Fin
```

(Equivale a despejar `n` de `2 = (1 + R)^n`. Si la guía no permite `log`,
se resuelve iterando con un ciclo `Mientras`: `capital *= (1 + R)` y contar
vueltas hasta que `capital >= 2 * C`.)

### Módulo 5 · Números ≤ 25 entre 20 ingresados

```
Inicio
  Para i ← 1 Hasta 20
    Leer num
    Si num <= 25 Entonces
      Mostrar num
    FinSi
  FinPara
Fin
```

### Módulo 6 · Suma de 5 precios en USD, total en pesos

```
Inicio
  Leer trm           // pesos por dólar
  suma_usd ← 0
  Para i ← 1 Hasta 5
    Leer precio_usd
    suma_usd ← suma_usd + precio_usd
  FinPara
  total_cop ← suma_usd * trm
  Mostrar total_cop
Fin
```

### Módulo 7 · Consumo en restaurante con descuento

```
Inicio
  total_general ← 0
  Repetir
    Leer consumo
    Si consumo <= 0 Entonces
      // sentinela: salir del ciclo
    Sino
      Si consumo > 50000 Entonces
        pago ← consumo * 0.8
      Sino
        pago ← consumo
      FinSi
      total_general ← total_general + pago
      Mostrar pago
    FinSi
  Hasta que consumo <= 0
  Mostrar "Total del día:", total_general
Fin
```

(La guía no especifica el criterio de cierre; lo más limpio es un valor
sentinela como 0 o −1. El aprendiz debe dejarlo explícito en el diagrama.)

### Módulo 8 · Hora en el siguiente segundo

```
Inicio
  Leer H, M, S
  S ← S + 1
  Si S = 60 Entonces
    S ← 0
    M ← M + 1
    Si M = 60 Entonces
      M ← 0
      H ← H + 1
      Si H = 24 Entonces
        H ← 0
      FinSi
    FinSi
  FinSi
  Mostrar H, ":", M, ":", S
Fin
```

### Módulo 9 · Producto 1 × 2 × … × N

```
Inicio
  Leer N
  producto ← 1
  Para i ← 1 Hasta N
    producto ← producto * i
  FinPara
  Mostrar producto
Fin
```

### Módulo 10 · Tabla de multiplicar decreciente (1 a 10)

```
Inicio
  Leer N
  Si N < 1 O N > 10 Entonces
    Mostrar "Fuera de rango"
  Sino
    Para i ← 10 Hasta 1
      Mostrar N, " x ", i, " = ", N * i
    FinPara
  FinSi
Fin
```

---

## Capítulo 5 · Fundamentos de JavaScript (AA3-EV01)

Respuestas de referencia para los campos teóricos. Sirven como guía de
evaluación; el aprendiz puede dar formulaciones equivalentes.

### Compilados vs. interpretados

- **Compilados:** se traducen completo a código máquina antes de ejecutarse
  (C, C++, Rust, Go). El programa final corre directo contra el hardware, así
  que es más rápido. El ciclo editar-compilar-ejecutar es más rígido.
- **Interpretados:** se ejecutan línea por línea mediante un intérprete
  (Python, Ruby, PHP). Más lentos en crudo pero el ciclo de prueba es
  inmediato: editas y recargas.
- **JavaScript:** históricamente interpretado por el navegador. Hoy los
  motores modernos (V8, SpiderMonkey) usan compilación JIT: interpretan al
  principio y recompilan en caliente las partes que más se ejecutan, así que
  en la práctica es un híbrido.

### Características principales de JavaScript

- Multiparadigma: soporta programación funcional, orientada a objetos
  (prototipos) e imperativa.
- Tipado dinámico: una variable puede cambiar de tipo en tiempo de ejecución.
- Ejecución en el navegador (cliente) y, desde 2009, también en el servidor
  (Node.js).
- Garbage collector automático.
- Un solo hilo de ejecución con modelo asíncrono basado en event loop.
- Sintaxis inspirada en Java/C pero con semántica propia (no confundir con
  Java más allá del nombre).
- Interactúa directamente con el DOM y la API del navegador.

### Tipos de datos primitivos

| Tipo | Ejemplo | Notas |
|------|---------|-------|
| `number` | `42`, `3.14`, `-7` | Un solo tipo numérico: enteros y flotantes conviven. |
| `string` | `"hola"`, `'hola'` | Cadenas inmutables. |
| `boolean` | `true`, `false` | — |
| `null` | `null` | Ausencia intencional de valor. |
| `undefined` | `undefined` | Variable declarada sin asignar. |
| `symbol` | `Symbol("id")` | Identificador único, introducido en ES6. |
| `bigint` | `123n` | Enteros arbitrariamente grandes, desde ES2020. |

### Operadores

- **Aritméticos:** `+`, `-`, `*`, `/`, `%` (módulo), `**` (potencia).
- **Comparación:** `==`, `!=` (con coerción), `===`, `!==` (estrictos,
  recomendados), `<`, `>`, `<=`, `>=`.
- **Lógicos:** `&&` (AND), `||` (OR), `!` (NOT), `??` (fusión nula).
- **Asignación:** `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`.
- **Incremento / decremento:** `++`, `--`.
- **Concatenación:** el `+` entre strings une texto (mismo símbolo que la
  suma, por eso la conversión con `Number()` antes de `prompt`).
- **Ternario:** `condición ? valor_si : valor_no`.
- **Tipo:** `typeof`, `instanceof`.

### Fuentes APA (mínimo tres)

- Flanagan, D. (2020). *JavaScript: la guía definitiva* (7.ª ed.). O'Reilly.
- Mozilla Developer Network. (s. f.). *JavaScript*. MDN Web Docs. https://developer.mozilla.org/es/docs/Web/JavaScript
- Haverbeke, M. (2018). *Eloquent JavaScript* (3.ª ed.). No Starch Press. https://eloquentjavascript.net

---

## Capítulo 6 · Programación en JavaScript (AA3-EV02)

La consola ya no ejecuta el código (cambió para evitar que un ciclo colgado
congele la pestaña o que el aprendiz pruebe cosas fuera de la guía). Los
siguientes son códigos de referencia que el aprendiz puede usar para
comparar contra su propia solución al ejecutarlos en su equipo.

### Programa 1 · Figuras planas

```js
const opcion = Number(prompt(
  "1 triángulo · 2 rectángulo · 3 cuadrado · 4 círculo"
));

if (opcion === 1) {
  const a = Number(prompt("Lado a"));
  const b = Number(prompt("Lado b"));
  const c = Number(prompt("Lado c"));
  const h = Number(prompt("Altura"));
  console.log("Perímetro:", a + b + c);
  console.log("Área:", (b * h) / 2);
} else if (opcion === 2) {
  const b = Number(prompt("Base"));
  const a = Number(prompt("Altura"));
  console.log("Perímetro:", 2 * (b + a));
  console.log("Área:", b * a);
} else if (opcion === 3) {
  const a = Number(prompt("Lado"));
  console.log("Perímetro:", 4 * a);
  console.log("Área:", a * a);
} else if (opcion === 4) {
  const r = Number(prompt("Radio"));
  console.log("Perímetro:", 2 * Math.PI * r);
  console.log("Área:", Math.PI * r * r);
} else {
  console.log("Opción no válida");
}
```

**Cómo organizar el menú:** con `if / else if` encadenados sobra; el aprendiz
también puede usar `switch`. Lo importante es que cada rama pida **solo** las
medidas que su figura necesita y muestre los dos resultados con `console.log`.

### Programa 2 · Vector de 10 edades

```js
const edades = [];
for (let i = 0; i < 10; i++) {
  let e;
  do {
    e = Number(prompt("Edad #" + (i + 1)));
    if (isNaN(e) || e < 1 || e > 120) {
      console.log("Fuera de rango, intenta de nuevo");
    }
  } while (isNaN(e) || e < 1 || e > 120);
  edades.push(e);
}

let menores = 0, mayores = 0, adultos = 0;
let min = edades[0], max = edades[0], suma = 0;

for (let i = 0; i < edades.length; i++) {
  if (edades[i] < 18) menores++;
  else if (edades[i] < 60) mayores++;
  else adultos++;

  if (edades[i] < min) min = edades[i];
  if (edades[i] > max) max = edades[i];
  suma += edades[i];
}

const promedio = suma / edades.length;

console.log("Menores de edad:", menores);
console.log("Mayores de edad:", mayores);
console.log("Adultos mayores (60+):", adultos);
console.log("Edad mínima:", min);
console.log("Edad máxima:", max);
console.log("Promedio:", promedio);
```

**Validación del rango:** un `do...while` que vuelve a pedir mientras el dato
no esté entre 1 y 120. La variable `e` queda con el último valor válido
**fuera** del ciclo antes del `push`. Es el patrón más limpio: pedir, validar,
volver a pedir si toca, guardar solo cuando pasa.

**Verificación con `15, 20, 67, 45, 72, 17, 33, 60, 29, 80`:**

- menores (`< 18`): 15, 17 → **2**
- mayores (`18..59`): 20, 45, 33, 29 → **4**
- adultos mayores (`≥ 60`): 67, 72, 60, 80 → **4**
- mínimo: **15**, máximo: **80**
- promedio: `438 / 10 = 43.8`

(Si el aprendiz separa "mayores" como `≥ 18` y "adultos mayores" como
subconjunto, el conteo de mayores cambia. Conviene pactar una convención en
la sesión sincrónica antes de calificar.)

### Programa 3 · Mezcla de dos vectores ordenados

```js
const A = [];
const B = [];

for (let i = 0; i < 5; i++) {
  let v;
  do {
    v = Number(prompt("A[" + (i + 1) + "]"));
    if (i > 0 && v < A[i - 1]) {
      console.log("Debe ser >= " + A[i - 1]);
      v = NaN;
    }
  } while (isNaN(v));
  A.push(v);
}

for (let i = 0; i < 5; i++) {
  let v;
  do {
    v = Number(prompt("B[" + (i + 1) + "]"));
    if (i > 0 && v < B[i - 1]) {
      console.log("Debe ser >= " + B[i - 1]);
      v = NaN;
    }
  } while (isNaN(v));
  B.push(v);
}

const mezcla = [];
let i = 0, j = 0;
while (i < A.length && j < B.length) {
  if (A[i] <= B[j]) mezcla.push(A[i++]);
  else mezcla.push(B[j++]);
}
while (i < A.length) mezcla.push(A[i++]);
while (j < B.length) mezcla.push(B[j++]);

console.log(mezcla.join(" "));
```

**Cómo se garantiza el orden:** los dos vectores ya entran ordenados
ascendentemente, así que basta con recorrerlos en paralelo y meter siempre el
menor de los dos frentes. Los dos `while` finales vacían lo que sobre de
cualquier vector cuando el otro ya se terminó.

**Verificación con `A = 1, 3, 6, 9, 17` y `B = 2, 4, 10, 17`:**
salida esperada: `1 2 3 4 6 9 10 17 17`.

### Programa 4 · Sistema de la emisora

```js
const personas = [];
let opcion;

do {
  opcion = Number(prompt(
    "1 Agregar persona\n2 Mostrar persona\n0 Salir"
  ));

  if (opcion === 1) {
    const p = {
      nombre: prompt("Nombre"),
      cedula: prompt("Cédula"),
      nacimiento: prompt("Fecha de nacimiento (DD/MM/AAAA)"),
      correo: prompt("Correo"),
      ciudadRes: prompt("Ciudad de residencia"),
      ciudadOrig: prompt("Ciudad de origen"),
      canciones: []
    };
    const cant = Number(prompt("¿Cuántas canciones favoritas? (máx 3)"));
    for (let i = 0; i < Math.min(cant, 3); i++) {
      p.canciones.push({
        artista: prompt("Artista #" + (i + 1)),
        titulo: prompt("Título #" + (i + 1))
      });
    }
    personas.push(p);
    console.log("Persona agregada. Total:", personas.length);
  }

  else if (opcion === 2) {
    if (personas.length === 0) {
      console.log("No hay personas registradas.");
    } else {
      const pos = Number(prompt(
        "Posición (0 a " + (personas.length - 1) + ")"
      ));
      if (pos >= 0 && pos < personas.length) {
        const p = personas[pos];
        console.log("Nombre:", p.nombre);
        console.log("Cédula:", p.cedula);
        console.log("Nacimiento:", p.nacimiento);
        console.log("Correo:", p.correo);
        console.log("Residencia:", p.ciudadRes);
        console.log("Origen:", p.ciudadOrig);
        p.canciones.forEach((c, i) =>
          console.log("Canción " + (i + 1) + ":", c.artista, "-", c.titulo)
        );
      } else {
        console.log("Posición inválida");
      }
    }
  }

} while (opcion !== 0);

console.log("Sesión cerrada. Personas registradas:", personas.length);
```

**Estructura elegida:** un **arreglo de objetos**, no vectores paralelos.
Con seis campos por persona y tres canciones, los vectores paralelos obligan
a mantener 8 arreglos sincronizados — un índice fuera de lugar y se rompe
todo. Un objeto por persona mantiene los datos juntos y hace que
`personas.push(p)` agregue a todos los campos en una sola operación.

---

## Capítulo 7 · Sustentación en video

No tiene una sola respuesta correcta. El ticket asigna tres módulos a partir
del número de documento y la sustentación debe:

- Mostrar la consola con el nombre y el documento del aprendiz visibles.
- Recorrer cada módulo asignado explicando el análisis, el pseudocódigo y el
  diagrama de flujo.
- Si el módulo implica JavaScript, ejecutar el código en vivo (Node.js o
  consola del navegador) y mostrar la salida con los datos de prueba.
- Cerrar con la reflexión: qué decisión de diseño tomó y por qué.

Duración esperada: entre 8 y 12 minutos.

---

## Notas finales para el instructor

- **Las preguntas de análisis del capítulo 2** admiten más de una respuesta
  válida. La idea es que el aprendiz distinga información útil de la que
  sobra; no que copie una lista. Si tu respuesta razonada y la del aprendiz
  difieren en algún punto pero el razonamiento es consistente, también cuenta.
- **El truco de la expresión 2** es la pieza más pedagógica del capítulo 1.
  Si el aprendiz la entrega como `Falso` sin la observación, no está mal,
  pero está incompleto. La observación es lo que demuestra que entendió la
  trampa.
- **El año 2100** en el algoritmo de bisiesto es el caso que separa a quien
  entendió la regla completa de quien solo memorizó "divisible por 4".
  Vale la pena resaltarlo en la sesión.
- **Los programas 1 y 4** no tienen datos de prueba fijos porque el
  resultado depende de cómo el aprendiz organice el menú. La evaluación ahí
  es de diseño, no de verificación numérica.
- **Si el aprendiz se queda trabado en cap6**, lo más útil suele ser que
  ejecute su código en su propia máquina con `node archivo.js` o pegándolo
  en la consola del navegador. Así ve los errores reales de JavaScript
  (que son distintos a los del Web Worker de la versión anterior).
