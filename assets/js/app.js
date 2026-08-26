/* ============================================================
   Consola Algorítmica — interfaz
   ============================================================ */

const SECCIONES = [
  { id: 'cap0', num: 0, code: 'Identificación', title: 'Quién entrega',
    tipo: 'Datos del aprendiz', formato: '—',
    intro: 'Estos datos encabezan el documento y nombran el archivo ZIP. El número de documento define además los módulos que te tocará sustentar en video.',
    blocks: IDENTIFICACION.map(f => ({ ...f, type: f.type || 'short' })) },
  ...CAPITULOS
];

let actual = 'cap0';

/* ---------------- Arranque ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  const estilo = document.createElement('style');
  estilo.textContent = CSS_DOCUMENTO;
  document.head.appendChild(estilo);

  Estado.cargar();
  pintarRail();
  abrir(localStorage.getItem('consola-cap-actual') || 'cap0');
  conectarBarra();

  document.addEventListener('sesion:guardada', () => {
    const h = Estado.guardadoEn;
    document.getElementById('estado-guardado').innerHTML =
      `Guardado <b>${h.getHours().toString().padStart(2, '0')}:${h.getMinutes().toString().padStart(2, '0')}</b> · ${Estado.peso()} KB`;
  });
  document.addEventListener('sesion:error', e => avisar(e.detail, 'error'));
});

/* ---------------- Rail ---------------- */
function pintarRail() {
  const lista = document.getElementById('canales');
  lista.innerHTML = SECCIONES.map(s => `
    <li class="canal" data-cap="${s.id}" aria-current="${s.id === actual}">
      <button type="button">
        <span class="fader" data-estado="vacio"><i></i></span>
        <span class="canal-texto">
          <strong>${s.num === 0 ? 'Identificación' : 'Cap. ' + s.num}</strong>
          <span>${s.num === 0 ? 'Datos' : s.code.replace('GA3-220501093-', '')}</span>
        </span>
      </button>
    </li>`).join('');

  lista.querySelectorAll('.canal button').forEach(b => {
    b.addEventListener('click', () => abrir(b.closest('.canal').dataset.cap));
  });
  actualizarFaders();
}

function requeridos(seccion) {
  return seccion.blocks.filter(b => b.required && b.id);
}

function estaCompleto(b) {
  const v = (Estado.get(b.id) || '').toString().trim();
  if (!v) return false;
  if (b.type === 'evaluador') {
    const r = leerJSON(b.id, {});
    return b.niveles.every(n => n.pasos.every(p => r[p.clave]));
  }
  if (b.type === 'traza') {
    const filas = leerJSON(b.id, []);
    const conDatos = filas.filter(f => (f || []).some(c => (c || '').trim()));
    return conDatos.length >= 2;
  }
  if (b.type === 'truth') return v.split(',').filter(x => x).length === 4;
  return true;
}

function actualizarFaders() {
  SECCIONES.forEach(s => {
    const req = requeridos(s);
    const llenos = req.filter(estaCompleto).length;
    const pct = req.length ? Math.round((llenos / req.length) * 100) : 0;
    const fader = document.querySelector(`.canal[data-cap="${s.id}"] .fader`);
    if (!fader) return;
    fader.style.setProperty('--nivel', pct + '%');
    fader.dataset.estado = pct === 100 ? 'completo' : pct === 0 ? 'vacio' : 'parcial';
    fader.setAttribute('title', `${llenos} de ${req.length} campos`);
  });
}

/* ---------------- Panel ---------------- */
function abrir(capId) {
  const s = SECCIONES.find(x => x.id === capId);
  if (!s) return;
  actual = capId;
  localStorage.setItem('consola-cap-actual', capId);
  document.querySelectorAll('.canal').forEach(c =>
    c.setAttribute('aria-current', c.dataset.cap === capId));

  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <header class="cap-cabecera">
      <p class="eyebrow">${s.num === 0 ? 'Paso previo' : 'Capítulo ' + s.num}</p>
      <h2>${s.title}</h2>
      <p class="intro">${s.intro}</p>
      <div class="cap-meta">
        <span class="pastilla pastilla-verde">${s.code}</span>
        <span class="pastilla">${s.tipo}</span>
        <span class="pastilla">Formato: ${s.formato}</span>
      </div>
    </header>
    <div id="bloques">${s.blocks.map(bloqueHTML).join('')}</div>
    ${s.id === 'cap4' ? avisoForoHTML() : ''}
    <nav class="pasos">
      <button class="btn" id="ir-atras" ${SECCIONES.indexOf(s) === 0 ? 'disabled' : ''}>← Anterior</button>
      <button class="btn btn-verde" id="ir-adelante" ${SECCIONES.indexOf(s) === SECCIONES.length - 1 ? 'disabled' : ''}>Siguiente →</button>
    </nav>`;

  conectarCampos();
  const i = SECCIONES.indexOf(s);
  const atras = document.getElementById('ir-atras');
  const adelante = document.getElementById('ir-adelante');
  if (i > 0) atras.addEventListener('click', () => { abrir(SECCIONES[i - 1].id); window.scrollTo(0, 0); });
  if (i < SECCIONES.length - 1) adelante.addEventListener('click', () => { abrir(SECCIONES[i + 1].id); window.scrollTo(0, 0); });
  window.scrollTo(0, 0);
}

function avisoForoHTML() {
  return `<aside class="aviso-foro">
    <p class="eyebrow">${FORO.code} — fuera de este paquete</p>
    <strong>${FORO.title}</strong>
    <p>Esta evidencia se responde directamente en Zajuna: es participación viva y exige una réplica crítica a un compañero. El trabajo de este capítulo te da el argumento.</p>
    <ul>${FORO.preguntas.map(p => `<li>${p}</li>`).join('')}</ul>
  </aside>`;
}

const escapa = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function bloqueHTML(b) {
  if (b.type === 'seccion') return `<h3 class="bloque-seccion">${b.label}</h3>`;
  if (b.type === 'enunciado') return `
    <div class="enunciado">
      <p class="eyebrow">${b.label}</p>
      <p>${escapa(b.text)}</p>
      ${b.nota ? `<p class="contexto">${escapa(b.nota)}</p>` : ''}
    </div>`;
  if (b.type === 'ticket') return ticketHTML();
  if (b.type === 'referencia') return referenciaHTML(b);
  if (b.type === 'evaluador') return evaluadorHTML(b);
  if (b.type === 'traza') return trazaHTML(b);

  const valor = Estado.get(b.id);
  const ayuda = b.help ? `<p class="ayuda">${b.help}</p>` : '';
  const marca = b.required && !valor ? ' requerido-vacio' : '';

  if (b.type === 'short') return `
    <div class="campo">
      <label for="${b.id}">${b.label}${b.required ? ' *' : ''}</label>${ayuda}
      <input type="text" id="${b.id}" data-campo="${b.id}" class="${marca}"
        value="${escapa(valor)}" placeholder="${b.placeholder || ''}">
    </div>`;

  if (b.type === 'select') return `
    <div class="campo">
      <label for="${b.id}">${b.label}${b.required ? ' *' : ''}</label>${ayuda}
      <select id="${b.id}" data-campo="${b.id}" class="${marca}">
        ${b.options.map(o => `<option value="${o}" ${o === valor ? 'selected' : ''}>${o || '— elige —'}</option>`).join('')}
      </select>
    </div>`;

  if (b.type === 'text' || b.type === 'mono') return `
    <div class="campo">
      <label for="${b.id}">${b.label}${b.required ? ' *' : ''}</label>${ayuda}
      <textarea id="${b.id}" data-campo="${b.id}" rows="${b.rows || 4}"
        class="${b.type === 'mono' ? 'mono' : ''}${marca}"
        placeholder="${escapa(b.placeholder || '')}">${escapa(valor)}</textarea>
    </div>`;

  if (b.type === 'image') return `
    <div class="campo">
      <span class="campo-titulo">${b.label}${b.required ? ' *' : ''}</span>${ayuda}
      <div class="subida" data-imagen="${b.id}">
        ${valor ? `<img src="${valor}" alt="${b.label}">` : ''}
        <div class="subida-acciones">
          <input type="file" accept="image/*" data-file="${b.id}">
          ${valor ? `<button class="btn" data-quitar="${b.id}">Quitar imagen</button>` : ''}
        </div>
      </div>
    </div>`;

  if (b.type === 'truth') return `
    <div class="campo">
      <span class="campo-titulo">${b.label}${b.required ? ' *' : ''}</span>
      ${tablaVerdadEditable(b, valor)}
    </div>`;

  if (b.type === 'code') return `
    <div class="campo">
      <span class="campo-titulo">${b.label}${b.required ? ' *' : ''}</span>${ayuda}
      <div class="editor">
        <div class="editor-barra">
          <p class="eyebrow">JavaScript</p>
          <button class="btn btn-verde" data-ejecutar="${b.id}">Ejecutar</button>
          <label for="${b.id}__inputs">Entradas de prueba (separadas por coma)</label>
          <input type="text" id="${b.id}__inputs" data-campo="${b.id}__inputs"
            value="${escapa(Estado.get(b.id + '__inputs') || b.inputs || '')}">
        </div>
        <textarea id="${b.id}" data-campo="${b.id}" rows="16"
          spellcheck="false">${escapa(valor || b.starter || '')}</textarea>
        <pre class="salida" id="${b.id}__salida"></pre>
        <p class="pista" id="${b.id}__pista">${b.validate && b.validate.hint ? b.validate.hint : ''}</p>
      </div>
    </div>`;

  return '';
}

function referenciaHTML(b) {
  return `<details class="referencia">
    <summary><span class="eyebrow">Referencia</span> ${escapa(b.label)}</summary>
    ${b.nota ? `<p class="ayuda">${escapa(b.nota)}</p>` : ''}
    <div class="referencia-lista">
      ${b.fragmentos.map(f => `
        <article>
          <h4>${escapa(f.titulo)}</h4>
          <pre>${escapa(f.codigo)}</pre>
          ${f.nota ? `<p>${escapa(f.nota)}</p>` : ''}
        </article>`).join('')}
    </div>
  </details>`;
}

function leerJSON(id, porDefecto) {
  try {
    const v = Estado.get(id);
    return v ? JSON.parse(v) : porDefecto;
  } catch (e) { return porDefecto; }
}

function evaluadorHTML(b) {
  const r = leerJSON(b.id, {});
  const nivelListo = i => b.niveles[i].pasos.every(p => r[p.clave]);
  return `<div class="campo">
    <span class="campo-titulo">${escapa(b.label)}${b.required ? ' *' : ''}</span>
    ${b.ayuda ? `<p class="ayuda">${escapa(b.ayuda)}</p>` : ''}
    <div class="evaluador" data-evaluador="${b.id}">
      <p class="expresion">${escapa(b.expresion)}</p>
      ${b.niveles.map((n, i) => {
        const abierto = i === 0 || nivelListo(i - 1);
        return `<section class="nivel" data-abierto="${abierto}">
          <p class="eyebrow">${escapa(n.titulo)}</p>
          ${abierto ? n.pasos.map(p => {
            const valor = r[p.clave] || '';
            const estado = !valor ? '' : (valor === p.correcta ? 'bien' : 'revisar');
            return `<div class="paso" data-estado="${estado}">
              <code>${escapa(p.texto)}</code>
              <span class="igual">=</span>
              <select data-eval-paso="${b.id}" data-clave="${p.clave}">
                <option value="">— elige —</option>
                ${p.opciones.map(o => `<option value="${escapa(o)}" ${o === valor ? 'selected' : ''}>${escapa(o)}</option>`).join('')}
              </select>
              ${estado === 'bien' ? '<span class="marca">✓</span>' : ''}
              ${estado === 'revisar' ? '<span class="marca">revisa este paso</span>' : ''}
              ${estado === 'bien' && p.nota ? `<p class="nota-paso">${escapa(p.nota)}</p>` : ''}
            </div>`;
          }).join('') : '<p class="bloqueado">Resuelve el nivel anterior para abrir este.</p>'}
        </section>`;
      }).join('')}
    </div>
  </div>`;
}

function trazaHTML(b) {
  const filas = leerJSON(b.id, []);
  const total = Math.max(b.filas, filas.length);
  const celda = (f, c) => escapa((filas[f] && filas[f][c]) || '');
  return `<div class="campo">
    <span class="campo-titulo">${escapa(b.label)}${b.required ? ' *' : ''}</span>
    ${b.ayuda ? `<p class="ayuda">${escapa(b.ayuda)}</p>` : ''}
    ${b.datos ? `<p class="datos-prueba"><span class="eyebrow">Datos de prueba</span> ${escapa(b.datos)}</p>` : ''}
    <div class="traza-caja">
      <table class="traza" data-traza="${b.id}">
        <thead><tr>${b.columnas.map(c => `<th>${escapa(c)}</th>`).join('')}</tr></thead>
        <tbody>
          ${Array.from({ length: total }, (_, f) => `<tr>${b.columnas.map((_, c) =>
            `<td><input type="text" data-traza-celda="${b.id}" data-fila="${f}" data-col="${c}" value="${celda(f, c)}"></td>`
          ).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
    <button class="btn" data-traza-fila="${b.id}">Agregar fila</button>
  </div>`;
}

function tablaVerdadEditable(b, valor) {
  const filas = [['V', 'V'], ['V', 'F'], ['F', 'V'], ['F', 'F']];
  const r = (valor || ',,,').toString().split(',');
  return `<table class="tv"><tr><th>P</th><th>Q</th><th>P ${b.op} Q</th></tr>
    ${filas.map((f, i) => `<tr><td>${f[0]}</td><td>${f[1]}</td><td>
      <select data-tv="${b.id}" data-fila="${i}">
        <option value="">—</option>
        <option value="V" ${r[i] === 'V' ? 'selected' : ''}>V</option>
        <option value="F" ${r[i] === 'F' ? 'selected' : ''}>F</option>
      </select></td></tr>`).join('')}
  </table>`;
}

function ticketHTML() {
  const t = ticketSustentacion();
  if (!t) return `<div class="ticket"><p class="eyebrow">Ticket de sustentación</p>
    <p>Escribe tu número de documento en la sección de identificación y aquí aparecerán los tres módulos que te toca defender.</p></div>`;
  return `<div class="ticket">
    <p class="eyebrow">Ticket de sustentación</p>
    <strong>Explica en video estos tres módulos:</strong>
    <ol>${t.map(m => `<li>Módulo ${m.n} · ${escapa(m.contexto.split(' — ')[0])} — ${escapa(m.enunciado.slice(0, 90))}…</li>`).join('')}</ol>
    <p class="aviso">Los módulos salen de tu número de documento, así que a cada aprendiz le tocan otros. Muestra el código corriendo, no solo las diapositivas.</p>
  </div>`;
}

/* ---------------- Conexión de eventos ---------------- */
function conectarCampos(raiz) {
  const zona = raiz || document;
  zona.querySelectorAll('[data-campo]').forEach(el => {
    el.addEventListener('input', () => {
      Estado.set(el.dataset.campo, el.value);
      el.classList.toggle('requerido-vacio', el.classList.contains('requerido-vacio') && !el.value.trim());
      actualizarFaders();
      if (el.dataset.campo === 'id_documento') refrescarTicket();
    });
    el.addEventListener('change', () => { Estado.set(el.dataset.campo, el.value); actualizarFaders(); });
  });

  zona.querySelectorAll('[data-tv]').forEach(sel => {
    sel.addEventListener('change', () => {
      const id = sel.dataset.tv;
      const valores = [...document.querySelectorAll(`[data-tv="${id}"]`)].map(s => s.value);
      Estado.set(id, valores.join(','));
      actualizarFaders();
    });
  });

  zona.querySelectorAll('[data-file]').forEach(inp => {
    inp.addEventListener('change', async () => {
      const archivo = inp.files[0];
      if (!archivo) return;
      try {
        const dataUrl = await procesarImagen(archivo);
        Estado.set(inp.dataset.file, dataUrl);
        abrir(actual);
        avisar('Imagen cargada.');
      } catch (e) { avisar(e.message, 'error'); }
    });
  });

  zona.querySelectorAll('[data-quitar]').forEach(btn => {
    btn.addEventListener('click', () => {
      Estado.set(btn.dataset.quitar, '');
      abrir(actual);
    });
  });

  zona.querySelectorAll('[data-ejecutar]').forEach(btn => {
    btn.addEventListener('click', () => correr(btn.dataset.ejecutar));
  });

  zona.querySelectorAll('[data-eval-paso]').forEach(sel => {
    sel.addEventListener('change', () => {
      const id = sel.dataset.evalPaso;
      const r = leerJSON(id, {});
      if (sel.value) r[sel.dataset.clave] = sel.value; else delete r[sel.dataset.clave];
      Estado.set(id, JSON.stringify(r));
      redibujarBloque(id);
      actualizarFaders();
    });
  });

  zona.querySelectorAll('[data-traza-celda]').forEach(inp => {
    inp.addEventListener('input', () => {
      const id = inp.dataset.trazaCelda;
      const filas = leerJSON(id, []);
      const f = +inp.dataset.fila, c = +inp.dataset.col;
      while (filas.length <= f) filas.push([]);
      filas[f][c] = inp.value;
      Estado.set(id, JSON.stringify(filas));
      actualizarFaders();
    });
  });

  zona.querySelectorAll('[data-traza-fila]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.trazaFila;
      const filas = leerJSON(id, []);
      const bloque = SECCIONES.flatMap(s => s.blocks).find(b => b.id === id);
      while (filas.length < bloque.filas) filas.push([]);
      filas.push([]);
      Estado.set(id, JSON.stringify(filas));
      redibujarBloque(id);
    });
  });
}

/* Redibuja un solo bloque sin perder la posición de lectura */
function redibujarBloque(id) {
  const bloque = SECCIONES.flatMap(s => s.blocks).find(b => b.id === id);
  const contenedor = document.querySelector(`[data-evaluador="${id}"], [data-traza="${id}"]`);
  if (!bloque || !contenedor) return;
  const campo = contenedor.closest('.campo');
  const y = window.scrollY;
  const molde = document.createElement('div');
  molde.innerHTML = bloque.type === 'evaluador' ? evaluadorHTML(bloque) : trazaHTML(bloque);
  const reemplazo = molde.firstElementChild;
  campo.replaceWith(reemplazo);
  conectarCampos(reemplazo);
  window.scrollTo(0, y);
}

function refrescarTicket() {
  const cont = document.querySelector('.ticket');
  if (cont) cont.outerHTML = ticketHTML();
}

async function correr(id) {
  const bloque = SECCIONES.flatMap(s => s.blocks).find(b => b.id === id);
  const codigo = document.getElementById(id).value;
  const crudo = (document.getElementById(id + '__inputs') || {}).value || '';
  const entradas = crudo.split(',').map(s => s.trim()).filter(s => s !== '');
  const salida = document.getElementById(id + '__salida');
  const pista = document.getElementById(id + '__pista');

  salida.textContent = 'Ejecutando…';
  const r = await ejecutarCodigo(codigo, entradas);
  salida.textContent = r.salida.length ? r.salida.join('\n') : '(sin salida)';

  if (r.error) {
    pista.dataset.ok = 'error';
    pista.textContent = 'Error: ' + r.error;
    return;
  }
  const v = verificar(bloque.validate, r.salida);
  if (!v) {
    delete pista.dataset.ok;
    pista.textContent = (bloque.validate && bloque.validate.hint) || 'Revisa la salida a mano.';
  } else {
    pista.dataset.ok = v.ok ? 'true' : 'false';
    pista.textContent = v.ok ? '✓ ' + v.mensaje : v.mensaje + ' ' + ((bloque.validate.hint) || '');
  }
}

/* ---------------- Barra de acciones ---------------- */
function conectarBarra() {
  document.getElementById('btn-documento').addEventListener('click', verDocumento);
  document.getElementById('btn-volver').addEventListener('click', () => {
    document.body.classList.remove('modo-documento');
  });
  document.getElementById('btn-imprimir').addEventListener('click', () => window.print());
  document.getElementById('btn-zip').addEventListener('click', async () => {
    try {
      avisar('Armando el paquete…');
      await generarZip(CSS_DOCUMENTO);
      avisar('ZIP descargado.');
    } catch (e) { avisar(e.message, 'error'); }
  });
  document.getElementById('btn-exportar').addEventListener('click', () => {
    Estado.exportar();
    avisar('Sesión descargada.');
  });
  document.getElementById('archivo-sesion').addEventListener('change', async e => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      await Estado.importar(f);
      pintarRail();
      abrir('cap0');
      avisar('Sesión cargada.');
    } catch (err) { avisar('No se pudo leer esa sesión: ' + err.message, 'error'); }
    e.target.value = '';
  });
  document.getElementById('btn-limpiar').addEventListener('click', () => {
    if (!confirm('Se borra todo lo que has escrito en este navegador. ¿Descargaste tu sesión antes?')) return;
    Estado.borrar();
    pintarRail();
    abrir('cap0');
    avisar('Consola en blanco.');
  });
}

function verDocumento() {
  document.querySelector('.doc-lienzo .documento').innerHTML = construirDocumento();
  document.body.classList.add('modo-documento');
  window.scrollTo(0, 0);
}

let relojAviso;
function avisar(texto, tipo) {
  let caja = document.querySelector('.aviso-flotante');
  if (!caja) {
    caja = document.createElement('div');
    caja.className = 'aviso-flotante';
    caja.setAttribute('role', 'status');
    document.body.appendChild(caja);
  }
  caja.textContent = texto;
  if (tipo) caja.dataset.tipo = tipo; else delete caja.dataset.tipo;
  clearTimeout(relojAviso);
  relojAviso = setTimeout(() => caja.remove(), 4200);
}
