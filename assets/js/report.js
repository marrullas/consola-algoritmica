/* ============================================================
   Documento de entrega, ticket de sustentación y paquete ZIP
   La consola maqueta: todo el contenido lo escribe el aprendiz.
   ============================================================ */

/* --- Ticket: tres módulos derivados del número de documento -------- */
function semillaDesde(texto) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function ticketSustentacion() {
  const doc = (Estado.get('id_documento') || '').toString().trim();
  if (!doc) return null;
  let s = semillaDesde(doc);
  const siguiente = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
  const bolsa = MODULOS.map(m => m.n);
  for (let i = bolsa.length - 1; i > 0; i--) {
    const j = Math.floor(siguiente() * (i + 1));
    [bolsa[i], bolsa[j]] = [bolsa[j], bolsa[i]];
  }
  const elegidos = bolsa.slice(0, 3).sort((a, b) => a - b);
  return elegidos.map(n => MODULOS.find(m => m.n === n));
}

/* --- Escapes ------------------------------------------------------- */
const esc = t => String(t ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const parrafos = t => esc(t).split(/\n{2,}/).filter(Boolean)
  .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('') || '<p class="vacio">Sin registrar.</p>';

/* --- Construcción del documento ------------------------------------ */
function construirDocumento() {
  const d = id => Estado.get(id);
  const partes = [];

  partes.push(`
    <header class="doc-portada">
      <p class="doc-eyebrow">Servicio Nacional de Aprendizaje · SENA</p>
      <h1>Consola Algorítmica<span>Radio Rating</span></h1>
      <p class="doc-sub">Guía de aprendizaje 3 · Competencia 220501093<br>
      Evaluar requisitos de la solución de software de acuerdo con metodologías de análisis y estándares</p>
      <table class="doc-ident">
        ${IDENTIFICACION.map(f => `<tr><th>${esc(f.label)}</th><td>${esc(d(f.id)) || '—'}</td></tr>`).join('')}
        <tr><th>Programa</th><td>Análisis y desarrollo de software · 228118</td></tr>
      </table>
      <p class="doc-nota">Este documento reúne las evidencias de la competencia técnica. Cada capítulo indica el código de la evidencia y el espacio de Zajuna al que corresponde.</p>
    </header>`);

  CAPITULOS.forEach(cap => {
    partes.push(`<section class="doc-cap">
      <p class="doc-eyebrow">${esc(cap.code)} · ${esc(cap.tipo)}</p>
      <h2>Capítulo ${cap.num}. ${esc(cap.title)}</h2>`);

    cap.blocks.forEach(b => {
      if (b.type === 'seccion') {
        partes.push(`<h3 class="doc-seccion">${esc(b.label)}</h3>`);
        return;
      }
      if (b.type === 'enunciado') {
        partes.push(`<div class="doc-enunciado"><strong>${esc(b.label)}</strong><p>${esc(b.text)}</p>${
          b.nota ? `<p class="doc-contexto">${esc(b.nota)}</p>` : ''}</div>`);
        return;
      }
      if (b.type === 'ticket') {
        const t = ticketSustentacion();
        partes.push(`<div class="doc-campo"><h4>Módulos asignados para sustentar</h4>${
          t ? `<ul>${t.map(m => `<li>Módulo ${m.n} · ${esc(m.contexto.split(' — ')[0])}</li>`).join('')}</ul>`
            : '<p class="vacio">Sin número de documento no se puede generar el ticket.</p>'}</div>`);
        return;
      }

      if (b.type === 'referencia') return;
      if (b.type === 'evaluador') {
        const r = (() => { try { return JSON.parse(Estado.get(b.id) || '{}'); } catch (e) { return {}; } })();
        const filas = b.niveles.flatMap(n => n.pasos.map(p =>
          `<tr><td>${esc(n.titulo)}</td><td><code>${esc(p.texto)}</code></td><td>${esc(r[p.clave] || '—')}</td></tr>`));
        partes.push(`<div class="doc-campo"><h4>${esc(b.label)}</h4>
          <p class="doc-contexto">${esc(b.expresion)}</p>
          <table class="doc-tv doc-pasos"><tr><th>Nivel</th><th>Subexpresión</th><th>Valor</th></tr>${filas.join('')}</table></div>`);
        return;
      }
      if (b.type === 'traza') {
        const filas = (() => { try { return JSON.parse(Estado.get(b.id) || '[]'); } catch (e) { return []; } })();
        const conDatos = filas.filter(f => (f || []).some(c => (c || '').trim()));
        partes.push(`<div class="doc-campo"><h4>${esc(b.label)}</h4>
          ${b.datos ? `<p class="doc-contexto">${esc(b.datos)}</p>` : ''}
          ${conDatos.length ? `<table class="doc-tv doc-traza">
            <tr>${b.columnas.map(c => `<th>${esc(c)}</th>`).join('')}</tr>
            ${conDatos.map(f => `<tr>${b.columnas.map((_, i) => `<td>${esc((f && f[i]) || '')}</td>`).join('')}</tr>`).join('')}
          </table>` : '<p class="vacio">Sin prueba de escritorio.</p>'}</div>`);
        return;
      }

      const valor = d(b.id);

      if (b.type === 'image') {
        partes.push(`<div class="doc-campo"><h4>${esc(b.label)}</h4>${
          valor ? `<figure><img src="${valor}" alt="${esc(b.label)}"></figure>`
                : '<p class="vacio">Sin diagrama cargado.</p>'}</div>`);
        return;
      }
      if (b.type === 'truth') {
        partes.push(`<div class="doc-campo"><h4>${esc(b.label)}</h4>${tablaVerdadHTML(b, valor)}</div>`);
        return;
      }
      if (b.type === 'mono' || b.type === 'code') {
        const cuerpo = b.type === 'code' ? (valor || '') : valor;
        partes.push(`<div class="doc-campo"><h4>${esc(b.label)}</h4>${
          cuerpo ? `<pre>${esc(cuerpo)}</pre>` : '<p class="vacio">Sin registrar.</p>'}</div>`);
        return;
      }
      partes.push(`<div class="doc-campo"><h4>${esc(b.label)}</h4>${parrafos(valor)}</div>`);
    });

    partes.push('</section>');
  });

  return partes.join('');
}

function tablaVerdadHTML(bloque, valor) {
  const filas = [['V', 'V'], ['V', 'F'], ['F', 'V'], ['F', 'F']];
  const r = (valor || '').toString().split(',');
  return `<table class="doc-tv">
    <tr><th>P</th><th>Q</th><th>P ${bloque.op} Q</th></tr>
    ${filas.map((f, i) => `<tr><td>${f[0]}</td><td>${f[1]}</td><td>${r[i] || '—'}</td></tr>`).join('')}
  </table>`;
}

/* --- Documento autónomo para el ZIP -------------------------------- */
function documentoAutonomo(css) {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8">
<title>Consola Algorítmica — ${esc(Estado.get('id_nombre'))}</title>
<style>${css}</style></head>
<body class="solo-documento"><main class="documento">${construirDocumento()}</main></body></html>`;
}

/* --- Paquete ZIP ---------------------------------------------------- */
async function generarZip(cssDocumento) {
  if (typeof JSZip === 'undefined') {
    throw new Error('No se pudo cargar la librería del ZIP. Revisa tu conexión y recarga la página.');
  }
  const zip = new JSZip();

  zip.file('documento/documento.html', documentoAutonomo(cssDocumento));

  /* Código JavaScript */
  const cabecera = txt => `/* ${txt}\n   ${Estado.get('id_nombre') || 'Sin nombre'} · Documento ${Estado.get('id_documento') || '—'} · Ficha ${Estado.get('id_ficha') || '—'}\n*/\n\n`;
  const archivosCodigo = [
    ['c6_p1', '01-figuras-planas.js', 'Programa 1 · Figuras planas'],
    ['c6_p2', '02-vector-edades.js', 'Programa 2 · Vector de edades'],
    ['c6_p3', '03-mezcla-vectores.js', 'Programa 3 · Mezcla de vectores ordenados'],
    ['c6_p4', '04-sistema-emisora.js', 'Programa 4 · Sistema de la emisora']
  ];
  archivosCodigo.forEach(([id, nombre, titulo]) => {
    const c = Estado.get(id);
    if (c && c.trim()) zip.file('codigo/' + nombre, cabecera(titulo) + c);
  });

  /* Pseudocódigo de los diez módulos */
  MODULOS.forEach(m => {
    const p = Estado.get(`c4_m${m.n}_pseudo`);
    if (p && p.trim()) {
      zip.file(`pseudocodigo/modulo-${String(m.n).padStart(2, '0')}-${m.slug}.txt`,
        `MÓDULO ${m.n} · ${m.contexto}\n\nEnunciado:\n${m.enunciado}\n\nPseudocódigo:\n${p}\n`);
    }
  });

  /* Diagramas de flujo */
  const imagenes = [];
  CAPITULOS.forEach(cap => cap.blocks.forEach(b => {
    if (b.type === 'image' && Estado.get(b.id)) imagenes.push([b.id, b.label]);
  }));
  imagenes.forEach(([id, label]) => {
    const dataUrl = Estado.get(id);
    const base64 = dataUrl.split(',')[1];
    const nombre = label.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    zip.file(`diagramas/${nombre}.jpg`, base64, { base64: true });
  });

  /* Ticket y sesión */
  const t = ticketSustentacion();
  zip.file('ticket-sustentacion.txt',
    `TICKET DE SUSTENTACIÓN\n${'='.repeat(50)}\n` +
    `Aprendiz: ${Estado.get('id_nombre') || '—'}\n` +
    `Documento: ${Estado.get('id_documento') || '—'}\n` +
    `Ficha: ${Estado.get('id_ficha') || '—'}\n\n` +
    `Módulos asignados:\n` +
    (t ? t.map(m => `  · Módulo ${m.n} — ${m.contexto}`).join('\n') : '  Sin generar.') +
    `\n\nVideo: ${Estado.get('c7_url') || 'sin URL'}\n`);

  zip.file('sesion.json', JSON.stringify({ version: 1, datos: Estado.datos }, null, 2));

  zip.file('LEEME.txt',
    `CONSOLA ALGORÍTMICA — RADIO RATING\n` +
    `Guía 3 · Competencia 220501093 · Programa ADSO 228118\n\n` +
    `Contenido:\n` +
    `  documento/       El informe completo. Ábrelo en el navegador e imprímelo a PDF.\n` +
    `  codigo/          Programas en JavaScript.\n` +
    `  pseudocodigo/    Los diez módulos en notación de pseudocódigo.\n` +
    `  diagramas/       Diagramas de flujo.\n` +
    `  ticket-*.txt     Módulos asignados para la sustentación en video.\n` +
    `  sesion.json      Copia de respaldo: cárgala en la consola para seguir trabajando.\n`);

  const blob = await zip.generateAsync({ type: 'blob' });
  descargar(blob, `${nombreArchivo()}.zip`);
}
