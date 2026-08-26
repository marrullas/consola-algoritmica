/* ============================================================
   Estilo del documento de entrega.
   Vive en JavaScript para que la misma hoja sirva en pantalla,
   en la impresión a PDF y dentro del ZIP.
   ============================================================ */

const CSS_DOCUMENTO = `
.documento {
  --tinta: #00324D; --verde: #39A900; --linea: #C9D3D9; --gris: #6C7F8A;
  font-family: "IBM Plex Sans", -apple-system, Segoe UI, sans-serif;
  color: #16242C; font-size: 10.5pt; line-height: 1.55;
  max-width: 19cm; margin: 0 auto; background: #fff;
}
.documento h1, .documento h2, .documento h3, .documento h4 {
  font-family: "Barlow Condensed", "IBM Plex Sans", sans-serif;
  color: var(--tinta); margin: 0;
}
.documento .doc-eyebrow {
  font-family: "Barlow Condensed", sans-serif; text-transform: uppercase;
  letter-spacing: .14em; font-size: 9pt; font-weight: 600;
  color: var(--verde); margin: 0 0 .3rem;
}
.documento .doc-portada { padding: 0 0 1.6rem; border-bottom: 3px solid var(--verde); }
.documento .doc-portada h1 {
  font-size: 34pt; font-weight: 700; line-height: .95; letter-spacing: -.01em;
}
.documento .doc-portada h1 span {
  display: block; font-size: 15pt; font-weight: 400; color: var(--gris);
  letter-spacing: .18em; text-transform: uppercase; margin-top: .35rem;
}
.documento .doc-sub { margin: 1rem 0 1.4rem; color: var(--gris); font-size: 10pt; }
.documento .doc-ident { border-collapse: collapse; width: 100%; margin-bottom: 1.2rem; }
.documento .doc-ident th, .documento .doc-ident td {
  border: 1px solid var(--linea); padding: .35rem .6rem; text-align: left; font-size: 9.5pt;
}
.documento .doc-ident th {
  width: 33%; background: #F1F4F5; font-family: "Barlow Condensed", sans-serif;
  text-transform: uppercase; letter-spacing: .06em; color: var(--tinta); font-weight: 600;
}
.documento .doc-nota { font-size: 9pt; color: var(--gris); font-style: italic; }
.documento .doc-cap { padding-top: 1.6rem; break-before: page; page-break-before: always; }
.documento .doc-cap h2 {
  font-size: 20pt; font-weight: 600; padding-bottom: .35rem;
  border-bottom: 1px solid var(--linea); margin-bottom: 1rem;
}
.documento .doc-seccion {
  font-size: 13pt; margin: 1.6rem 0 .8rem; text-transform: uppercase; letter-spacing: .06em;
}
.documento .doc-enunciado {
  background: #F1F4F5; border-left: 3px solid var(--tinta);
  padding: .6rem .9rem; margin: 1.1rem 0 .9rem;
}
.documento .doc-enunciado strong {
  font-family: "Barlow Condensed", sans-serif; text-transform: uppercase;
  letter-spacing: .08em; color: var(--tinta); font-size: 10pt;
}
.documento .doc-enunciado p { margin: .3rem 0 0; font-size: 9.5pt; }
.documento .doc-contexto { color: var(--gris); font-style: italic; }
.documento .doc-campo { margin: .9rem 0 1.2rem; break-inside: avoid; page-break-inside: avoid; }
.documento .doc-campo h4 {
  font-size: 11pt; font-weight: 600; margin-bottom: .3rem;
}
.documento .doc-campo p { margin: 0 0 .5rem; }
.documento pre {
  font-family: "IBM Plex Mono", Consolas, monospace; font-size: 8.8pt; line-height: 1.45;
  background: #F7F9F9; border: 1px solid var(--linea); border-left: 3px solid var(--verde);
  padding: .7rem .9rem; white-space: pre-wrap; word-break: break-word; margin: 0;
}
.documento figure { margin: .4rem 0; }
.documento figure img {
  max-width: 100%; max-height: 13cm; border: 1px solid var(--linea); display: block;
}
.documento .doc-tv { border-collapse: collapse; margin: .3rem 0; }
.documento .doc-tv th, .documento .doc-tv td {
  border: 1px solid var(--linea); padding: .28rem .9rem; text-align: center; font-size: 9.5pt;
}
.documento .doc-tv th {
  background: var(--tinta); color: #fff; font-family: "Barlow Condensed", sans-serif;
  text-transform: uppercase; letter-spacing: .08em;
}
.documento .doc-pasos td, .documento .doc-traza td { text-align: left; }
.documento .doc-pasos code, .documento .doc-traza td {
  font-family: "IBM Plex Mono", Consolas, monospace; font-size: 8.8pt;
}
.documento .doc-traza, .documento .doc-pasos { width: 100%; }
.documento .vacio { color: #B03A2E; font-style: italic; }
.documento ul { margin: .3rem 0 .5rem 1.1rem; padding: 0; }

body.solo-documento {
  margin: 0; padding: 2rem 1rem; background: #E8ECEE;
  font-family: "IBM Plex Sans", sans-serif;
}
body.solo-documento .documento {
  padding: 2.2cm 2cm; box-shadow: 0 2px 24px rgba(0,50,77,.14);
}
@media print {
  body.solo-documento { background: #fff; padding: 0; }
  body.solo-documento .documento { box-shadow: none; padding: 0; }
}
`;
