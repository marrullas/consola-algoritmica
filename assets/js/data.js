/* ============================================================
   Consola Algorítmica – Radio Rating
   Modelo de contenido: capítulos, evidencias y campos.
   Guía de aprendizaje 3 · Competencia 220501093 · ADSO 228118
   ============================================================ */

const IDENTIFICACION = [
  { id: 'id_nombre',     label: 'Nombre completo',        type: 'short', required: true },
  { id: 'id_documento',  label: 'Número de documento',    type: 'short', required: true,
    help: 'Determina los módulos que te tocan sustentar en video.' },
  { id: 'id_ficha',      label: 'Ficha',                  type: 'short', required: true },
  { id: 'id_instructor', label: 'Instructor',             type: 'short', required: true },
  { id: 'id_centro',     label: 'Centro de formación',    type: 'short' },
  { id: 'id_fecha',      label: 'Fecha de entrega',       type: 'short', placeholder: 'DD/MM/AAAA' }
];

/* --- Módulos del capítulo 4: los 10 enunciados de AA2-EV03 ---------- */
const MODULOS = [
  { n: 1,  slug: 'tiempo-promedio',
    enunciado: 'Un corredor de maratón (distancia 42,195 Km) ha recorrido la carrera en 2 horas 25 minutos. Se desea un algoritmo que calcule el tiempo medio en minutos por kilómetro.',
    contexto: 'Promedio de duración al aire — la emisora transmite la maratón y necesita el ritmo medio para calcular los cortes.' },
  { n: 2,  slug: 'clima-cabina',
    enunciado: 'Realizar la conversión de una temperatura dada en grados Centígrados a grados Fahrenheit (Fórmula: F = (9/5) C + 32).',
    contexto: 'Reporte de clima en cabina — el locutor lee la temperatura en ambas escalas.' },
  { n: 3,  slug: 'puntaje-ponderado',
    enunciado: 'Escribir el algoritmo que permite calcular la nota correspondiente al primer parcial de "análisis" para un estudiante cualquiera. Se debe considerar que hay dos talleres y un quiz, que en conjunto valen un 30% de la nota y el resto (70%) corresponde a la nota del examen parcial.',
    contexto: 'Puntaje ponderado de una canción — 30% jurado, 70% audiencia. La ponderación es idéntica.' },
  { n: 4,  slug: 'proyeccion-pauta',
    enunciado: 'Un capital C está situado a un tipo de interés R anual ¿al término de cuántos años se doblará?',
    contexto: 'Proyección de ingresos por pauta publicitaria.' },
  { n: 5,  slug: 'filtro-valoraciones',
    enunciado: 'Elaborar un algoritmo que permita ingresar 20 números y muestre todos los números menores e iguales a 25.',
    contexto: 'Filtro de valoraciones — descarta las calificaciones bajas del top semanal.' },
  { n: 6,  slug: 'merchandising',
    enunciado: 'Hacer un programa que sume 5 precios de camisas (en dólares) y que luego muestre el total de la venta en pesos.',
    contexto: 'Merchandising de la emisora — camisetas del Top 10 vendidas en dólares.' },
  { n: 7,  slug: 'facturacion-patrocinador',
    enunciado: 'Hacer un programa que registre el consumo realizado por los clientes de un restaurante, si el consumo de cada cliente excede 50000 se hará un descuento del 20%. Se debe mostrar el pago de cada cliente y el total de todos los pagos.',
    contexto: 'Facturación del restaurante patrocinador que pauta en el programa matutino.' },
  { n: 8,  slug: 'reloj-programacion',
    enunciado: 'Diseñar un algoritmo que permita ingresar la hora, minutos y segundos, y que calcule la hora en el siguiente segundo ("0<= H <=23", "0<= M <=59", "0<= S <=59").',
    contexto: 'Reloj de programación — el avance segundo a segundo de la parrilla.' },
  { n: 9,  slug: 'combinatoria-rifa',
    enunciado: 'Dado N, escribir el producto desde 1 hasta N.',
    contexto: 'Combinatoria de la rifa entre los oyentes encuestados.' },
  { n: 10, slug: 'cuenta-regresiva',
    enunciado: 'Realizar un algoritmo que muestre por pantalla la tabla de multiplicar decreciente de cualquier número, ingresado entre el 1 y el 10.',
    contexto: 'Cuenta regresiva del Top — la tabla se recita de mayor a menor al aire.' }
];

/* --- Situaciones del capítulo 2: los 4 problemas de AA1-EV02 -------- */
const SITUACIONES = [
  { n: 1, texto: 'Se desea elaborar un algoritmo que permita identificar la cantidad de dólares equivalentes a una cantidad de pesos colombianos.' },
  { n: 2, texto: 'Se desea elaborar un algoritmo que permita determinar la temperatura equivalente en grados centígrados a la cantidad de grados Fahrenheit actuales en la ciudad de New York.' },
  { n: 3, texto: 'Suponiendo que nos encontramos descansando en nuestra casa en una ciudad de Colombia requiero hacer un plan detallado para llegar a tiempo a mi sitio de trabajo el día siguiente.' },
  { n: 4, texto: 'Suponiendo que tengo habilidades en la elaboración de comida necesito elaborar un arroz con pollo para 5 personas.' }
];

const PREGUNTAS_ENTRADA = [
  ['necesaria',   '¿Qué información es importante y necesaria para resolver el problema?'],
  ['prescindible','¿Qué información no es importante y se puede prescindir?'],
  ['datos',       '¿Cuáles son los datos de entrada conocidos?'],
  ['incognita',   '¿Cuál es la incógnita o qué debemos calcular?'],
  ['categorias',  '¿Los datos se pueden agrupar en categorías?'],
  ['faltante',    '¿Qué información adicional hace falta para resolver el problema?'],
  ['solicitada',  '¿Qué información están solicitando?'],
  ['formato',     '¿En qué formato se debe entregar esta información?']
];

/* --- Construcción de los bloques del capítulo 2 --------------------- */
function bloquesSituaciones() {
  const b = [];
  SITUACIONES.forEach(s => {
    b.push({ type: 'enunciado', label: `Situación ${s.n}`, text: s.texto });
    PREGUNTAS_ENTRADA.forEach(([k, q]) => {
      b.push({ id: `c2_s${s.n}_${k}`, label: q, type: 'text', rows: 2, required: true });
    });
  });
  return b;
}

/* --- Construcción de los bloques del capítulo 4 --------------------- */
function bloquesModulos() {
  const b = [];
  MODULOS.forEach(m => {
    b.push({ type: 'enunciado', label: `Módulo ${m.n} · ${m.contexto.split(' — ')[0]}`,
             text: m.enunciado, nota: m.contexto });
    b.push({ id: `c4_m${m.n}_pseudo`, label: `Pseudocódigo del módulo ${m.n}`,
             type: 'mono', rows: 12, required: true,
             placeholder: 'Inicio\n  ...\nFin' });
    b.push({ id: `c4_m${m.n}_df`, label: `Diagrama de flujo del módulo ${m.n}`,
             type: 'image', required: true,
             help: 'Dibújalo en draw.io, exporta como PNG y cárgalo aquí.' });
  });
  return b;
}

/* ============================ CAPÍTULOS ============================= */
const CAPITULOS = [
  {
    id: 'cap1', num: 1, code: 'GA3-220501093-AA1-EV01',
    title: 'Lógica proposicional',
    tipo: 'Evidencia de conocimiento', formato: 'PDF',
    intro: 'Resuelve las expresiones lógicas registrando cada paso y construye las tablas de verdad. El paso a paso es lo que evalúa la lista de chequeo, no solo el resultado.',
    blocks: [
      { type: 'enunciado', label: 'Expresión 1', text: '(2 * 5) < 8 OR ((4 * 6) > (2 * 5))' },
      { id: 'c1_ex1', label: 'Paso a paso de la expresión 1', type: 'text', rows: 6, required: true,
        placeholder: 'Paso 1: resuelvo las operaciones aritméticas...\nPaso 2: evalúo cada comparación...\nPaso 3: aplico el operador OR...' },
      { id: 'c1_ex1r', label: 'Resultado de la expresión 1', type: 'select',
        options: ['', 'Verdadero', 'Falso'], required: true },

      { id: 'c1_eval1', type: 'evaluador', required: true,
        label: 'Evalúa la expresión 1 paso a paso',
        expresion: '(2 * 5) < 8 OR ((4 * 6) > (2 * 5))',
        ayuda: 'Cada nivel se abre cuando resuelves el anterior. Ese orden —aritmética, comparaciones, operador lógico— es justamente lo que se evalúa.',
        niveles: [
          { titulo: 'Nivel 1 · Resuelve la aritmética', pasos: [
            { clave: 'a', texto: '2 * 5', opciones: ['7', '10', '25'], correcta: '10' },
            { clave: 'b', texto: '4 * 6', opciones: ['10', '24', '46'], correcta: '24' }
          ]},
          { titulo: 'Nivel 2 · Evalúa las comparaciones', pasos: [
            { clave: 'c', texto: '10 < 8', opciones: ['Verdadero', 'Falso'], correcta: 'Falso' },
            { clave: 'd', texto: '24 > 10', opciones: ['Verdadero', 'Falso'], correcta: 'Verdadero' }
          ]},
          { titulo: 'Nivel 3 · Aplica el operador lógico', pasos: [
            { clave: 'e', texto: 'Falso OR Verdadero', opciones: ['Verdadero', 'Falso'], correcta: 'Verdadero',
              nota: 'El OR es verdadero si al menos uno de los dos operandos lo es.' }
          ]}
        ]},

      { type: 'enunciado', label: 'Expresión 2', text: '(4 + 5) < 3 AND ((5 * 5) + (4 + 25 < 3))' },
      { id: 'c1_ex2', label: 'Paso a paso de la expresión 2', type: 'text', rows: 6, required: true },
      { id: 'c1_ex2r', label: 'Resultado de la expresión 2', type: 'select',
        options: ['', 'Verdadero', 'Falso'], required: true },
      { id: 'c1_ex2obs', label: 'Observación sobre la expresión 2', type: 'text', rows: 4, required: true,
        help: 'El segundo operando mezcla una suma con una comparación. Explica qué problema plantea eso y cómo lo resolviste.' },

      { id: 'c1_eval2', type: 'evaluador', required: true,
        label: 'Evalúa la expresión 2 paso a paso',
        expresion: '(4 + 5) < 3 AND ((5 * 5) + (4 + 25 < 3))',
        ayuda: 'Esta expresión trae una trampa. Llega hasta el nivel 3 y verás cuál.',
        niveles: [
          { titulo: 'Nivel 1 · Resuelve la aritmética', pasos: [
            { clave: 'a', texto: '4 + 5', opciones: ['1', '9', '20'], correcta: '9' },
            { clave: 'b', texto: '5 * 5', opciones: ['10', '25', '55'], correcta: '25' },
            { clave: 'c', texto: '4 + 25', opciones: ['21', '29', '100'], correcta: '29' }
          ]},
          { titulo: 'Nivel 2 · Evalúa las comparaciones', pasos: [
            { clave: 'd', texto: '9 < 3', opciones: ['Verdadero', 'Falso'], correcta: 'Falso' },
            { clave: 'e', texto: '29 < 3', opciones: ['Verdadero', 'Falso'], correcta: 'Falso' }
          ]},
          { titulo: 'Nivel 3 · Suma un número con un valor lógico', pasos: [
            { clave: 'f', texto: '25 + Falso', opciones: ['25', '26', 'No es una operación válida'],
              correcta: 'No es una operación válida',
              nota: 'Aquí está la trampa: sumar un número con un valor lógico no produce una proposición. JavaScript convertiría Falso en 0 y devolvería 25, pero en lógica proposicional la expresión está mal formada. Escribe eso en tu observación.' }
          ]},
          { titulo: 'Nivel 4 · Aplica el operador lógico', pasos: [
            { clave: 'g', texto: 'Falso AND (lo que resulte del nivel 3)', opciones: ['Verdadero', 'Falso'],
              correcta: 'Falso',
              nota: 'El AND exige que ambos operandos sean verdaderos. Como el primero ya es falso, el resultado es falso sin importar el segundo.' }
          ]}
        ]},

      { type: 'enunciado', label: 'Tablas de verdad', text: 'Construir la tabla de verdad para ( P ∧ Q ) y ( P ∨ Q ).' },
      { id: 'c1_tt_and', label: 'Tabla de verdad de P ∧ Q', type: 'truth', op: '∧', required: true },
      { id: 'c1_tt_or',  label: 'Tabla de verdad de P ∨ Q', type: 'truth', op: '∨', required: true }
    ]
  },

  {
    id: 'cap2', num: 2, code: 'GA3-220501093-AA1-EV02',
    title: 'Análisis de problemas y diagramas de flujo',
    tipo: 'Evidencia de producto', formato: 'PDF',
    intro: 'Primero identificas entradas y resultados esperados de cuatro situaciones. Después investigas los diagramas de flujo con al menos tres fuentes citadas en APA y representas una de las situaciones.',
    blocks: [
      { type: 'seccion', label: 'Sección 1 · Entradas y resultados esperados' },
      ...bloquesSituaciones(),

      { type: 'seccion', label: 'Sección 2 · Investigación sobre diagramas de flujo' },
      { id: 'c2_definicion', label: 'Definición de diagrama de flujo', type: 'text', rows: 5, required: true },
      { id: 'c2_simbolos', label: 'Símbolos más importantes', type: 'text', rows: 8, required: true,
        help: 'Nombra cada símbolo y di para qué sirve.' },
      { id: 'c2_fuentes', label: 'Fuentes consultadas (mínimo tres, formato APA)', type: 'text', rows: 6, required: true,
        placeholder: 'Apellido, N. (año). Título. Editorial. URL' },
      { id: 'c2_elegido', label: '¿Qué situación de la sección 1 representaste?', type: 'select',
        options: ['', 'Situación 1', 'Situación 2', 'Situación 3', 'Situación 4'], required: true },
      { id: 'c2_df', label: 'Diagrama de flujo de la situación elegida', type: 'image', required: true }
    ]
  },

  {
    id: 'cap3', num: 3, code: 'GA3-220501093-AA2-EV01',
    title: 'Estructuras de control: edad y año bisiesto',
    tipo: 'Evidencia de conocimiento', formato: 'PDF o Word',
    intro: 'Para cada algoritmo recorre las tres fases: análisis (entradas, salidas y procesos), diseño e implementación con diagrama de flujo.',
    blocks: [
      { type: 'referencia', label: 'Ejemplos de pseudocódigo',
        nota: 'Estos son modelos de la forma, no las soluciones de los algoritmos de este capítulo. Estúdialos antes de escribir el tuyo.',
        fragmentos: [
          { titulo: 'Secuencial con condicional — área y tamaño',
            codigo: 'Inicio\n  Leer base, altura\n  area ← base * altura\n  Si area > 100 Entonces\n    Mostrar "Es grande:", area\n  Sino\n    Mostrar "Es pequeño:", area\n  FinSi\nFin',
            nota: 'La forma típica: leer entradas, calcular, decidir y mostrar.' },
          { titulo: 'Bucle controlado — sumar del 1 al 10',
            codigo: 'Inicio\n  suma ← 0\n  Para i ← 1 Hasta 10\n    suma ← suma + i\n  FinPara\n  Mostrar "Suma:", suma\nFin',
            nota: 'El Para repite un número conocido de veces. La variable del contador (i) avanza sola.' }
        ]},

      { type: 'enunciado', label: 'Algoritmo A',
        text: 'Algoritmo que a partir de una fecha de nacimiento y una fecha actual determine la edad en años actual de una persona.' },
      { id: 'c3_a_entradas', label: 'Elementos de entrada', type: 'text', rows: 3, required: true },
      { id: 'c3_a_salidas', label: 'Elementos de salida', type: 'text', rows: 3, required: true },
      { id: 'c3_a_procesos', label: 'Procesos requeridos', type: 'text', rows: 5, required: true },
      { id: 'c3_a_pseudo', label: 'Pseudocódigo', type: 'mono', rows: 12, required: true },
      { id: 'c3_a_traza', type: 'traza', required: true,
        label: 'Prueba de escritorio del algoritmo A',
        datos: 'Fecha de nacimiento: 20/05/1990 · Fecha actual: 18/08/2026',
        ayuda: 'Recorre tu pseudocódigo línea por línea con esos datos y anota cómo cambia cada variable. Si al final la edad no da 36, el error está en el algoritmo, no en la tabla.',
        columnas: ['Línea del pseudocódigo', 'anioNac', 'anioActual', 'edad', 'Qué se muestra'],
        filas: 6 },
      { id: 'c3_a_df', label: 'Diagrama de flujo', type: 'image', required: true },

      { type: 'enunciado', label: 'Algoritmo B',
        text: 'Algoritmo que permita determinar si un año indicado es o no un año bisiesto.' },
      { id: 'c3_b_entradas', label: 'Elementos de entrada', type: 'text', rows: 3, required: true },
      { id: 'c3_b_salidas', label: 'Elementos de salida', type: 'text', rows: 3, required: true },
      { id: 'c3_b_procesos', label: 'Procesos requeridos', type: 'text', rows: 5, required: true },
      { id: 'c3_b_pseudo', label: 'Pseudocódigo', type: 'mono', rows: 12, required: true },
      { id: 'c3_b_traza', type: 'traza', required: true,
        label: 'Prueba de escritorio del algoritmo B',
        datos: 'Prueba con dos años: 2024 y 2100',
        ayuda: 'Usa una fila por cada condición que evalúa tu algoritmo. Fíjate en 2100: es divisible por 4 y por 100, pero no por 400.',
        columnas: ['Año probado', '¿Divisible por 4?', '¿Divisible por 100?', '¿Divisible por 400?', '¿Es bisiesto?'],
        filas: 4 },
      { id: 'c3_b_df', label: 'Diagrama de flujo', type: 'image', required: true }
    ]
  },

  {
    id: 'cap4', num: 4, code: 'GA3-220501093-AA2-EV03',
    title: 'Los diez módulos de la consola',
    tipo: 'Evidencia de producto', formato: 'ZIP',
    intro: 'Cada módulo se resuelve en las dos notaciones: pseudocódigo y diagrama de flujo. El enunciado es el de la guía; el contexto de la emisora solo le da sentido al conjunto.',
    blocks: [
      { type: 'referencia', label: 'Ejemplos de pseudocódigo',
        nota: 'Tres patrones cubren los diez módulos. Mira cuál se parece al enunciado que estás resolviendo y adáptalo: la forma es la misma, los datos cambian.',
        fragmentos: [
          { titulo: 'Secuencial — área de un triángulo',
            codigo: 'Inicio\n  Leer base, altura\n  area ← (base * altura) / 2\n  Mostrar "Área:", area\nFin',
            nota: 'Lee, calcula, muestra. Sin decisiones ni ciclos.' },
          { titulo: 'Condicional con bucle Para — primeros N múltiplos de 3',
            codigo: 'Inicio\n  Leer N\n  Si N <= 0 Entonces\n    Mostrar "Debe ser positivo"\n  Sino\n    Para i ← 1 Hasta N\n      Mostrar i, " x 3 = ", i * 3\n    FinPara\n  FinSi\nFin',
            nota: 'El Si valida antes de entrar al Para. Si no pasa la validación, el Para no se ejecuta.' },
          { titulo: 'Bucle Mientras con sentinela — sumar hasta ingresar 0',
            codigo: 'Inicio\n  suma ← 0\n  Leer n\n  Mientras n ≠ 0\n    suma ← suma + n\n    Leer n\n  FinMientras\n  Mostrar "Suma total:", suma\nFin',
            nota: 'El sentinela (un valor que nunca es un dato real, como 0 o −1) marca el final. El ciclo lee al inicio y al final para que el primer y el último dato entren.' }
        ]},
      ...bloquesModulos()
    ]
  },

  {
    id: 'cap5', num: 5, code: 'GA3-220501093-AA3-EV01',
    title: 'Fundamentos de JavaScript',
    tipo: 'Evidencia de conocimiento', formato: 'PDF',
    intro: 'Apoya cada argumentación con imágenes ilustrativas y referencia todas las fuentes que uses.',
    blocks: [
      { id: 'c5_compilados', label: 'Principales diferencias entre lenguajes compilados e interpretados', type: 'text', rows: 8, required: true },
      { id: 'c5_img1', label: 'Imagen ilustrativa (compilado vs. interpretado)', type: 'image' },
      { id: 'c5_caracteristicas', label: 'Características principales de JavaScript', type: 'text', rows: 8, required: true },
      { id: 'c5_tipos', label: 'Tipos de datos primitivos y su uso en JavaScript', type: 'text', rows: 8, required: true },
      { id: 'c5_img2', label: 'Imagen ilustrativa (tipos de datos)', type: 'image' },
      { id: 'c5_operadores', label: 'Operadores en JavaScript', type: 'text', rows: 8, required: true },
      { id: 'c5_img3', label: 'Imagen ilustrativa (operadores)', type: 'image' },
      { id: 'c5_fuentes', label: 'Fuentes consultadas (formato APA)', type: 'text', rows: 5, required: true }
    ]
  },

  {
    id: 'cap6', num: 6, code: 'GA3-220501093-AA3-EV02',
    title: 'Programación en JavaScript',
    tipo: 'Evidencia de desempeño', formato: 'ZIP',
    intro: 'Aquí escribes el código JavaScript. La consola no lo ejecuta; pruébalo en tu propio entorno (Node.js o la consola del navegador) antes de entregar.',
    blocks: [
      { type: 'referencia', label: 'Sintaxis mínima que vas a necesitar',
        nota: 'Esto es una chuleta, no una solución. Copia la forma, no el contenido.',
        fragmentos: [
          { titulo: 'Pedir un dato y convertirlo a número',
            codigo: 'const edad = Number(prompt("Escribe la edad"));',
            nota: 'prompt siempre devuelve texto. Sin Number(), "5" + "3" da "53" y no 8.' },
          { titulo: 'Mostrar un resultado',
            codigo: 'console.log("El promedio es", promedio);',
            nota: 'Puedes pasar varios valores separados por coma.' },
          { titulo: 'Decidir entre dos caminos',
            codigo: 'if (edad >= 18) {\n  console.log("Mayor de edad");\n} else {\n  console.log("Menor de edad");\n}' },
          { titulo: 'Repetir una cantidad conocida de veces',
            codigo: 'for (let i = 0; i < 10; i++) {\n  console.log("Vuelta número", i);\n}',
            nota: 'i arranca en 0 y para antes de llegar a 10: son 10 vueltas.' },
          { titulo: 'Repetir mientras algo siga siendo cierto',
            codigo: 'while (valor < 1 || valor > 120) {\n  valor = Number(prompt("Valor entre 1 y 120"));\n}',
            nota: 'Sirve para validar: no avanza hasta que el dato sea correcto.' },
          { titulo: 'Guardar varios datos en un arreglo',
            codigo: 'const edades = [];\nedades.push(25);\nconsole.log(edades[0], edades.length);',
            nota: 'push agrega al final. La primera posición es 0, no 1.' },
          { titulo: 'Recorrer un arreglo',
            codigo: 'for (let i = 0; i < edades.length; i++) {\n  console.log(edades[i]);\n}' },
          { titulo: 'Acumular y contar',
            codigo: 'let suma = 0;\nlet cuantos = 0;\nsuma = suma + edades[i];\ncuantos = cuantos + 1;',
            nota: 'El acumulador guarda un total; el contador cuenta cuántas veces pasó algo.' }
        ]},

      { type: 'enunciado', label: 'Programa 1 · Figuras planas',
        text: 'Desarrollar un programa que permita calcular el área o perímetro de algunas figuras planas: triángulo (perímetro a+b+c, área b×h/2), rectángulo (2×(b+a), b×a), cuadrado (4×a, a²) y círculo (2×π×r, π×r²).' },
      { id: 'c6_p1', type: 'mono', rows: 16, label: 'Código del programa 1', required: true,
        placeholder: '// PROGRAMA 1 · FIGURAS PLANAS\n// 1. Muestra un menú con las cuatro figuras y guarda la opción elegida.\n// 2. Según la opción, pide las medidas que esa figura necesita.\n// 3. Calcula perímetro y área con las fórmulas de la tabla de la guía.\n// 4. Muestra los dos resultados con console.log.\n// Recuerda: para el círculo usa Math.PI.' },
      { id: 'c6_p1_exp', label: 'Explica brevemente cómo organizaste el menú', type: 'text', rows: 3, required: true },

      { type: 'enunciado', label: 'Programa 2 · Vector de edades',
        text: 'Almacenar las edades de un grupo de 10 personas en un vector de enteros y determinar cuántas son menores de edad, cuántas mayores de edad, cuántos adultos mayores (60 años o más), la edad más baja, la más alta y el promedio. Validar que cada valor esté entre 1 y 120; si hay error, notificar y solicitar un nuevo valor.' },
      { id: 'c6_p2', type: 'mono', rows: 16, label: 'Código del programa 2', required: true,
        help: 'Datos de prueba: 15, 20, 67, 45, 72, 17, 33, 60, 29, 80. Esperado: 2 menores, 8 mayores, 4 adultos mayores, mínima 15, máxima 80, promedio 43.8.',
        placeholder: '// PROGRAMA 2 · VECTOR DE EDADES\n// 1. Crea un arreglo vacío para las edades.\n// 2. Repite 10 veces: pide una edad y valida que esté entre 1 y 120.\n//    Si está fuera de rango, avisa y vuelve a pedirla (no la guardes).\n// 3. Recorre el arreglo llevando contadores de menores, mayores y adultos\n//    mayores (60 o más), y acumuladores para el total, el mínimo y el máximo.\n// 4. Calcula el promedio y muestra los siete resultados.' },
      { id: 'c6_p2_exp', label: '¿Cómo resolviste la validación del rango?', type: 'text', rows: 3, required: true },

      { type: 'enunciado', label: 'Programa 3 · Mezcla de vectores ordenados',
        text: 'Leer dos vectores de números enteros ordenados ascendentemente y producir la lista ordenada de la mezcla de ambos. Limitar los vectores a tamaño 5 y validar en cada ingreso que los datos entren de forma ascendente.' },
      { id: 'c6_p3', type: 'mono', rows: 16, label: 'Código del programa 3', required: true,
        help: 'Datos de prueba: vector A = 1, 3, 6, 9, 17 y vector B = 2, 4, 10, 17. Salida esperada: 1 2 3 4 6 9 10 17 17.',
        placeholder: '// PROGRAMA 3 · MEZCLA DE VECTORES ORDENADOS\n// 1. Pide 5 números para el primer vector, validando que cada uno sea\n//    mayor o igual al anterior. Si no lo es, avisa y vuelve a pedirlo.\n// 2. Haz lo mismo con el segundo vector.\n// 3. Recorre ambos vectores comparando sus elementos y ve armando\n//    la lista mezclada en orden ascendente.\n// 4. Muestra la lista final.' },
      { id: 'c6_p3_exp', label: '¿Cómo garantizas que la mezcla queda ordenada?', type: 'text', rows: 3, required: true },

      { type: 'enunciado', label: 'Programa 4 · Sistema de la emisora',
        text: 'Registrar la respuesta de 6 personas sobre sus gustos musicales: nombre, cédula, fecha de nacimiento, correo, ciudad de residencia y ciudad de origen, más artista y título de hasta 3 canciones favoritas. El menú debe permitir (a) agregar una persona y (b) mostrar la información de una persona por su posición en el vector.' },
      { id: 'c6_p4', type: 'mono', rows: 16, label: 'Código del programa 4', required: true,
        placeholder: '// PROGRAMA 4 · SISTEMA DE LA EMISORA\n// 1. Decide cómo guardar cada persona: vectores paralelos o un arreglo\n//    de objetos. Anota tu decisión en el campo de abajo.\n// 2. Escribe una opción para agregar una persona: nombre, cédula, fecha de\n//    nacimiento, correo, ciudad de residencia y ciudad de origen.\n// 3. Pide hasta 3 canciones favoritas (artista y título) por persona.\n// 4. Escribe una opción para mostrar los datos de una persona por su\n//    posición en el vector.\n// 5. Arma el menú que repite hasta que el usuario decida salir.' },
      { id: 'c6_p4_exp', label: '¿Qué estructura elegiste para almacenar a las personas y por qué?', type: 'text', rows: 4, required: true }
    ]
  },

  {
    id: 'cap7', num: 7, code: 'Sustentación en video',
    title: 'Sustentación',
    tipo: 'Control de autoría', formato: 'Video',
    intro: 'Graba tu pantalla ejecutando la consola y explica los módulos que te asignó el ticket. Entre 8 y 12 minutos, subido a YouTube como no listado.',
    blocks: [
      { type: 'ticket' },
      { id: 'c7_url', label: 'URL del video en YouTube', type: 'short', required: true,
        placeholder: 'https://youtu.be/...' },
      { id: 'c7_guion', label: 'Guion de la sustentación', type: 'text', rows: 8, required: true,
        help: 'Qué vas a mostrar y en qué orden. No leas el guion en cámara: es tu mapa, no tu libreto.' }
    ]
  }
];

/* --- Foro: única evidencia que no entra al paquete ------------------ */
const FORO = {
  code: 'GA3-220501093-AA2-EV02',
  title: 'Foro temático: estructuras de programación',
  preguntas: [
    '¿Qué beneficios tiene una representación en comparación con la otra?',
    '¿Respecto a las herramientas existentes, cuál tiene más representación?',
    '¿Cuál sería la más fácil para entender las estructuras algorítmicas?',
    '¿Cuál permitirá una transición más fácil hacia la codificación?'
  ]
};
