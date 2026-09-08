"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./cuentas.module.css";

type Product = {
  id: string;
  name: string;
  price: number;
};

type LineItem = Product & {
  qty: number;
};

const DEFAULT_PRODUCTS: Product[] = [
  { id: "menu", name: "Menú", price: 12000 },
  { id: "agua-mineral", name: "Agua mineral", price: 4500 },
  { id: "coca-cola", name: "Coca-Cola", price: 5000 },
];

const CATALOG_KEY = "la-camila-cuentas-catalog-v1";
const DRAFT_KEY = "la-camila-cuentas-draft-v1";

const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const today = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const ascii = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const textCommand = (
  text: string,
  x: number,
  y: number,
  size = 11,
  font: "F1" | "F2" = "F1",
) => `BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${ascii(text)}) Tj ET\n`;

const lineCommand = (x1: number, y1: number, x2: number, y2: number) =>
  `${x1} ${y1} m ${x2} ${y2} l S\n`;

function buildPdf(pages: string[]) {
  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = "";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  const pageRefs: number[] = [];

  for (const stream of pages) {
    const pageRef = objects.length;
    const contentRef = pageRef + 1;
    pageRefs.push(pageRef);
    objects[pageRef] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentRef} 0 R >>`;
    objects[contentRef] = `<< /Length ${stream.length} >>\nstream\n${stream}endstream`;
  }

  objects[2] = `<< /Type /Pages /Count ${pageRefs.length} /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] >>`;

  let pdf = "%PDF-1.4\n% La Camila\n";
  const offsets: number[] = [0];

  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function createAccountPdf(args: {
  date: string;
  guest: string;
  room: string;
  notes: string;
  items: LineItem[];
  total: number;
}) {
  const { date, guest, room, notes, items, total } = args;
  const accountNumber = `LC-${date.replaceAll("-", "")}-${String(Date.now()).slice(-5)}`;
  const chunks: LineItem[][] = [];
  const pageSize = 19;

  for (let i = 0; i < items.length; i += pageSize) {
    chunks.push(items.slice(i, i + pageSize));
  }
  if (chunks.length === 0) chunks.push([]);

  const pages = chunks.map((chunk, pageIndex) => {
    let stream = "0 G 0.7 w\n";
    stream += textCommand("LA CAMILA", 222, 790, 22, "F2");
    stream += textCommand("Restaurant", 267, 770, 11, "F1");
    stream += lineCommand(55, 752, 540, 752);
    stream += textCommand("CUENTA DE CONSUMO", 55, 724, 16, "F2");
    stream += textCommand(`Cuenta: ${accountNumber}`, 55, 704, 9, "F1");
    stream += textCommand(`Fecha: ${date || "-"}`, 385, 704, 9, "F1");
    stream += textCommand(`Cliente: ${guest || "-"}`, 55, 685, 9, "F1");
    stream += textCommand(`Habitacion / Mesa: ${room || "-"}`, 315, 685, 9, "F1");
    stream += lineCommand(55, 666, 540, 666);

    stream += textCommand("CANT.", 55, 646, 9, "F2");
    stream += textCommand("DESCRIPCION", 112, 646, 9, "F2");
    stream += textCommand("P. UNIT.", 370, 646, 9, "F2");
    stream += textCommand("SUBTOTAL", 465, 646, 9, "F2");
    stream += lineCommand(55, 636, 540, 636);

    let y = 613;
    for (const item of chunk) {
      const subtotal = item.qty * item.price;
      const cleanName = item.name.length > 34 ? `${item.name.slice(0, 31)}...` : item.name;
      stream += textCommand(String(item.qty).padStart(2, "0"), 59, y, 10, "F1");
      stream += textCommand(cleanName, 112, y, 10, "F1");
      stream += textCommand(money(item.price).replace("ARS", "").trim(), 370, y, 10, "F1");
      stream += textCommand(money(subtotal).replace("ARS", "").trim(), 465, y, 10, "F1");
      y -= 24;
    }

    const isLastPage = pageIndex === chunks.length - 1;
    if (isLastPage) {
      const totalY = Math.max(112, y - 18);
      stream += lineCommand(330, totalY + 25, 540, totalY + 25);
      stream += textCommand("TOTAL", 355, totalY, 13, "F2");
      stream += textCommand(money(total).replace("ARS", "").trim(), 455, totalY, 16, "F2");
      if (notes.trim()) {
        const note = notes.trim().length > 70 ? `${notes.trim().slice(0, 67)}...` : notes.trim();
        stream += textCommand(`Observaciones: ${note}`, 55, 84, 8, "F1");
      }
      stream += textCommand("Comprobante interno - No valido como factura", 176, 52, 8, "F1");
    } else {
      stream += textCommand(`Continua en pagina ${pageIndex + 2}`, 222, 52, 8, "F1");
    }
    stream += textCommand(`Pagina ${pageIndex + 1} de ${chunks.length}`, 472, 28, 7, "F1");
    return stream;
  });

  return { pdf: buildPdf(pages), accountNumber };
}

export default function CuentasPage() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [items, setItems] = useState<LineItem[]>([]);
  const [guest, setGuest] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState(today());
  const [notes, setNotes] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [toast, setToast] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem(CATALOG_KEY);
      if (savedCatalog) setProducts(JSON.parse(savedCatalog));

      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        setItems(Array.isArray(draft.items) ? draft.items : []);
        setGuest(typeof draft.guest === "string" ? draft.guest : "");
        setRoom(typeof draft.room === "string" ? draft.room : "");
        setDate(typeof draft.date === "string" ? draft.date : today());
        setNotes(typeof draft.notes === "string" ? draft.notes : "");
      }
    } catch {
      // If local data is corrupted, the defaults keep the system usable.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
  }, [products, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ items, guest, room, date, notes }));
  }, [items, guest, room, date, notes, ready]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items],
  );

  const addToAccount = (product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1, price: product.price } : item,
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
    setToast(`${product.name} agregado`);
  };

  const updateQty = (id: string, qty: number) => {
    const safeQty = Math.max(1, Math.min(999, Math.floor(qty || 1)));
    setItems((current) => current.map((item) => (item.id === id ? { ...item, qty: safeQty } : item)));
  };

  const updateLinePrice = (id: string, price: number) => {
    const safePrice = Math.max(0, Math.floor(price || 0));
    setItems((current) => current.map((item) => (item.id === id ? { ...item, price: safePrice } : item)));
  };

  const removeLine = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateProduct = (id: string, changes: Partial<Product>) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              ...changes,
              price:
                changes.price === undefined
                  ? product.price
                  : Math.max(0, Math.floor(changes.price || 0)),
            }
          : product,
      ),
    );
  };

  const removeProduct = (id: string) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  const addProduct = () => {
    const name = newName.trim();
    const price = Math.max(0, Math.floor(Number(newPrice) || 0));
    if (!name || price <= 0) {
      setToast("Ingresá nombre y precio válidos");
      return;
    }
    const product: Product = {
      id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name,
      price,
    };
    setProducts((current) => [...current, product]);
    setNewName("");
    setNewPrice("");
    setToast("Producto guardado");
  };

  const resetAccount = () => {
    setItems([]);
    setGuest("");
    setRoom("");
    setDate(today());
    setNotes("");
    localStorage.removeItem(DRAFT_KEY);
    setToast("Nueva cuenta lista");
  };

  const downloadPdf = () => {
    if (!items.length) return;
    const { pdf, accountNumber } = createAccountPdf({ date, guest, room, notes, items, total });
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${accountNumber}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setToast("PDF descargado");
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <div className={styles.logoMark}>LC</div>
            <div>
              <h1 className={styles.brandTitle}>LA CAMILA</h1>
              <p className={styles.brandSub}>Restaurant · Generador de cuentas</p>
            </div>
          </div>
          <div className={styles.status}>Datos guardados en este dispositivo</div>
        </div>
      </header>

      <section className={styles.main}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Cuenta de consumo</h2>
              <p className={styles.cardHint}>Cargá el consumo y descargá el comprobante en PDF.</p>
            </div>
            <button type="button" className={styles.buttonDanger} onClick={resetAccount}>
              Nueva cuenta
            </button>
          </div>

          <div className={styles.body}>
            <div className={styles.gridFields}>
              <label>
                <span className={styles.label}>Fecha</span>
                <input className={styles.input} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label>
                <span className={styles.label}>Habitación / Mesa</span>
                <input
                  className={styles.input}
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Ej: Hab. 204 o Mesa 5"
                />
              </label>
              <label className={styles.fieldWide}>
                <span className={styles.label}>Cliente / Huésped (opcional)</span>
                <input
                  className={styles.input}
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                  placeholder="Nombre del cliente"
                />
              </label>
            </div>

            <h3 className={styles.sectionTitle}>Detalle</h3>
            <div className={styles.itemsWrap}>
              <div className={styles.itemHeader}>
                <div>Cant.</div>
                <div>Producto</div>
                <div className={styles.money}>P. unit.</div>
                <div className={styles.money}>Subtotal</div>
                <div />
              </div>

              {items.length === 0 ? (
                <div className={styles.empty}>Agregá productos desde el catálogo para comenzar.</div>
              ) : (
                items.map((item) => (
                  <div className={styles.itemRow} key={item.id}>
                    <input
                      aria-label={`Cantidad de ${item.name}`}
                      className={styles.qtyInput}
                      type="number"
                      min="1"
                      max="999"
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    />
                    <div className={styles.productName}>{item.name}</div>
                    <input
                      aria-label={`Precio de ${item.name}`}
                      className={styles.priceInput}
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) => updateLinePrice(item.id, Number(e.target.value))}
                    />
                    <div className={styles.money}>{money(item.qty * item.price)}</div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeLine(item.id)}
                      aria-label={`Quitar ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            <label className={`${styles.fieldWide} ${styles.notesField}`}>
              <span className={styles.label}>Observaciones (opcional)</span>
              <textarea
                className={styles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: consumo cargado a habitación"
              />
            </label>

            <div className={styles.totalBox}>
              <span className={styles.totalLabel}>Total</span>
              <strong className={styles.totalValue}>{money(total)}</strong>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.buttonPrimary} onClick={downloadPdf} disabled={!items.length}>
                Descargar PDF
              </button>
              <button type="button" className={styles.button} onClick={() => window.print()} disabled={!items.length}>
                Imprimir
              </button>
            </div>

            <div className={styles.note}>
              El PDF se genera directamente en el navegador. No es una factura fiscal y los datos de esta pantalla no se envían a una base de datos.
            </div>
          </div>
        </article>

        <aside className={`${styles.card} ${styles.catalogCard}`}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Productos</h2>
              <p className={styles.cardHint}>Tocá “Agregar” para sumarlo a la cuenta.</p>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.catalogList}>
              {products.map((product) => (
                <div className={styles.product} key={product.id}>
                  <div>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>{money(product.price)}</div>
                  </div>
                  <button type="button" className={styles.productButton} onClick={() => addToAccount(product)}>
                    Agregar
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.catalogEditor}>
              <h3 className={styles.sectionTitle}>Editar catálogo</h3>
              {products.map((product) => (
                <div className={styles.editorRow} key={`edit-${product.id}`}>
                  <input
                    className={styles.input}
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                    aria-label="Nombre del producto"
                  />
                  <input
                    className={styles.input}
                    type="number"
                    min="0"
                    value={product.price}
                    onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) })}
                    aria-label={`Precio de catálogo de ${product.name}`}
                  />
                  <button
                    className={styles.smallButton}
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    aria-label={`Eliminar ${product.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}

              <div className={styles.addProductBox}>
                <input
                  className={styles.input}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nuevo producto"
                />
                <input
                  className={styles.input}
                  type="number"
                  min="0"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Precio"
                />
                <button
                  type="button"
                  className={`${styles.button} ${styles.addProductButton}`}
                  onClick={addProduct}
                >
                  + Guardar producto
                </button>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {toast ? <div className={styles.toast}>{toast}</div> : null}
    </main>
  );
}
