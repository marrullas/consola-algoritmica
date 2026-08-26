/* ============================================================
   Persistencia: localStorage + exportar/importar sesión
   ============================================================ */

const CLAVE = 'consola-algoritmica-ga3-v1';
const LIMITE_IMAGEN = 1400;   // px de ancho máximo
const CALIDAD_IMAGEN = 0.82;

const Estado = {
  datos: {},
  guardadoEn: null,

  cargar() {
    try {
      const crudo = localStorage.getItem(CLAVE);
      this.datos = crudo ? JSON.parse(crudo) : {};
    } catch (e) {
      this.datos = {};
      console.warn('No se pudo leer la sesión guardada:', e);
    }
    return this.datos;
  },

  get(id) { return this.datos[id] ?? ''; },

  set(id, valor) {
    this.datos[id] = valor;
    this.guardar();
  },

  guardar() {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(this.datos));
      this.guardadoEn = new Date();
      document.dispatchEvent(new CustomEvent('sesion:guardada'));
      return true;
    } catch (e) {
      document.dispatchEvent(new CustomEvent('sesion:error', {
        detail: 'No hay espacio para guardar. Descarga tu sesión y libera imágenes pesadas.'
      }));
      return false;
    }
  },

  borrar() {
    localStorage.removeItem(CLAVE);
    this.datos = {};
  },

  /* Tamaño aproximado ocupado, en KB */
  peso() {
    try { return Math.round(JSON.stringify(this.datos).length / 1024); }
    catch (e) { return 0; }
  },

  exportar() {
    const contenido = JSON.stringify({
      version: 1,
      generado: new Date().toISOString(),
      datos: this.datos
    }, null, 2);
    const blob = new Blob([contenido], { type: 'application/json' });
    descargar(blob, `sesion-${nombreArchivo()}.json`);
  },

  async importar(archivo) {
    const texto = await archivo.text();
    const paquete = JSON.parse(texto);
    if (!paquete || typeof paquete.datos !== 'object') {
      throw new Error('El archivo no tiene el formato de una sesión.');
    }
    this.datos = paquete.datos;
    this.guardar();
  }
};

/* --- Utilidades ---------------------------------------------------- */

function descargar(blob, nombre) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function nombreArchivo() {
  const doc = (Estado.get('id_documento') || 'sin-documento').toString().replace(/\W+/g, '');
  const ficha = (Estado.get('id_ficha') || 'ficha').toString().replace(/\W+/g, '');
  return `GA3_${ficha}_${doc}`;
}

/* Reduce la imagen antes de guardarla para no agotar el almacenamiento */
function procesarImagen(archivo) {
  return new Promise((resolve, reject) => {
    if (!archivo.type.startsWith('image/')) {
      reject(new Error('Ese archivo no es una imagen.'));
      return;
    }
    const lector = new FileReader();
    lector.onerror = () => reject(new Error('No se pudo leer la imagen.'));
    lector.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('La imagen está dañada o en un formato no soportado.'));
      img.onload = () => {
        const escala = Math.min(1, LIMITE_IMAGEN / img.width);
        const lienzo = document.createElement('canvas');
        lienzo.width = Math.round(img.width * escala);
        lienzo.height = Math.round(img.height * escala);
        const ctx = lienzo.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, lienzo.width, lienzo.height);
        ctx.drawImage(img, 0, 0, lienzo.width, lienzo.height);
        resolve(lienzo.toDataURL('image/jpeg', CALIDAD_IMAGEN));
      };
      img.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  });
}

function dataUrlABlob(dataUrl) {
  const [cabecera, base64] = dataUrl.split(',');
  const tipo = /:(.*?);/.exec(cabecera)[1];
  const binario = atob(base64);
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return new Blob([bytes], { type: tipo });
}
