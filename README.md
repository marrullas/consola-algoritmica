# Consola Algorítmica · Radio Rating

Entorno de trabajo en el navegador para las evidencias de la **competencia 220501093** (Guía de aprendizaje 3, programa ADSO 228118). El aprendiz resuelve los ejercicios dentro de la consola y esta arma el documento de entrega y el paquete ZIP.

No requiere servidor, base de datos ni instalación: son archivos estáticos.

---

## Publicar en GitHub Pages

1. Crea un repositorio nuevo (por ejemplo `consola-algoritmica`).
2. Sube el contenido de esta carpeta a la raíz del repositorio, incluido el archivo `.nojekyll`.
3. En el repositorio entra a **Settings → Pages**.
4. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
5. A los pocos minutos queda publicada en `https://<usuario>.github.io/consola-algoritmica/`.

Comparte ese enlace en Zajuna. No hay cuentas ni claves: cada aprendiz trabaja en su propio navegador.

Para probarla en tu equipo antes de publicar, basta con abrir `index.html` directamente — o, si prefieres, levantar un servidor local:

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000`.

---

## Cómo funciona para el aprendiz

- **Todo se guarda solo** en el navegador, en cada tecla. El indicador del panel izquierdo muestra la hora del último guardado y el espacio usado.
- **El trabajo vive en un solo navegador y un solo equipo.** Si cambia de computador debe usar *Guardar sesión* (descarga un `.json`) y *Cargar sesión* en el otro. Conviene insistir en esto el primer día.
- **Ver documento** muestra el informe armado; desde ahí *Imprimir o guardar como PDF* usa el diálogo del navegador (destino: "Guardar como PDF").
- **Descargar ZIP** arma el paquete completo: documento, código, pseudocódigo, diagramas, ticket y respaldo de la sesión.
- **JavaScript aparece solo en el capítulo 6**, que es donde la guía lo exige (AA3-EV02). Antes de eso el aprendiz trabaja con el evaluador paso a paso y las pruebas de escritorio, sin escribir código.
- El código del capítulo 6 **no se ejecuta en la consola**: el aprendiz lo escribe en un campo de texto y lo prueba en su propio entorno (Node.js o la consola del navegador) antes de entregar. Cada programa trae en el placeholder los pasos numerados y, cuando aplica, los datos de prueba con el resultado esperado.

## Qué recibe cada slot de Zajuna

| Evidencia | Qué se sube |
|---|---|
| `GA3-220501093-AA1-EV01` | PDF del documento |
| `GA3-220501093-AA1-EV02` | PDF del documento |
| `GA3-220501093-AA2-EV01` | PDF del documento |
| `GA3-220501093-AA2-EV02` | Participación en el foro (no sale de aquí) |
| `GA3-220501093-AA2-EV03` | ZIP |
| `GA3-220501093-AA3-EV01` | PDF del documento |
| `GA3-220501093-AA3-EV02` | ZIP |

El video de sustentación se enlaza dentro del documento y del ticket.

---

## Notas para el instructor

**La consola no escribe por el aprendiz.** Solo maqueta lo que él teclea. Los campos vacíos salen marcados en rojo en el documento como "Sin registrar", así que un entregable incompleto se ve de inmediato.

**El ticket de sustentación** asigna tres de los diez módulos a partir del número de documento. Es determinista: el mismo documento da siempre los mismos módulos, y tú puedes reproducirlos abriendo la consola y escribiendo ese número. Sirve para que nadie ensaye un guion prestado.

**La expresión 2 de la evidencia AA1-EV01** —`(4+5) < 3 AND ((5*5) + (4+25 < 3))`— mezcla una suma con una comparación dentro del mismo operando. Tal como está, el segundo operando no es una proposición bien formada. La consola pide explícitamente que el aprendiz explique esa ambigüedad en lugar de fingir que no existe; conviene que en la sesión sincrónica aclares qué interpretación aceptas.

**El evaluador paso a paso (capítulo 1)** descompone cada expresión en niveles: primero la aritmética, luego las comparaciones, al final el operador lógico. Cada nivel se abre cuando el anterior está resuelto, así que el aprendiz recorre el orden de evaluación con las manos en vez de adivinar el resultado. Marca en verde los pasos correctos y en ámbar los que conviene revisar, pero nunca impide avanzar.

**Las pruebas de escritorio (capítulo 3)** son tablas de seguimiento de variables con datos de prueba fijos: 20/05/1990 y 18/08/2026 para la edad, los años 2024 y 2100 para el bisiesto. El segundo caso es el que descubre el error clásico —2100 es divisible por 4 y por 100, pero no por 400, así que no es bisiesto—. Se cuentan como completas a partir de dos filas con datos, y se imprimen en el documento.

**Los paneles de referencia (capítulos 3, 4 y 6)** son chuletas plegables con la forma, nunca la solución. El de los capítulos 3 y 4 muestra ejemplos de pseudocódigo: secuencial con condicional, bucle controlado y bucle con sentinela, cubriendo los patrones que usan los algoritmos. El del capítulo 6 trae la sintaxis mínima de JavaScript: prompt, Number, if, for, while, arreglos, contadores y acumuladores. Los placeholders de los cuatro programas de JavaScript traen los pasos numerados en comentarios, también sin resolverlos.

**Datos de prueba.** Los programas 2 y 3 muestran, como ayuda del campo, los valores de entrada y la salida esperada para que el aprendiz verifique su código en su propio entorno. Los programas 1 y 4 no los incluyen porque el resultado depende del diseño del menú.

**Ajustes.** Los enunciados, contextos, niveles del evaluador, columnas de las pruebas de escritorio y valores esperados están todos en `assets/js/data.js`. Para reusar la consola con otra ficha o cambiar un ejercicio, ese es el único archivo que necesitas tocar.

---

## Estructura

```
index.html
.nojekyll
assets/
  css/app.css          Interfaz de la consola
  js/data.js           Capítulos, enunciados y campos  ← edita aquí
  js/docstyle.js       Estilo del documento de entrega
  js/storage.js        Guardado local, imágenes, sesión
  js/report.js         Documento, ticket y ZIP
  js/app.js            Interfaz y navegación
```

Dependencia externa: JSZip desde CDN, solo al descargar el paquete.
