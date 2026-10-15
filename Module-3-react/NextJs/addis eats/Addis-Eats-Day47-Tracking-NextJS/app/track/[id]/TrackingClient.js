"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MapPanel from "./MapPanel";
import { etb, relative, when } from "@/lib/format";
import { downloadCsv, toCsv } from "@/lib/csv";

const progress = ["Preparing", "Picked up", "On the way", "Delivered"];

export default function TrackingClient({ order }) {
  const [status, setStatus] = useState(order.status);
  const [updatedAt, setUpdatedAt] = useState(order.placedAt);
  const [connection, setConnection] = useState("connecting");
  const [history, setHistory] = useState(order.history);

  useEffect(() => {
    const source = new EventSource(`/api/orders/${order.id}/stream`);
    setConnection("connecting");
    source.onopen = () => setConnection("live");
    source.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        setStatus(update.status);
        setUpdatedAt(update.updatedAt);
        setHistory((previous) => {
          if (previous.at(-1)?.status === update.status) return previous;
          return [...previous, { time: update.updatedAt, status: update.status }];
        });
        if (update.status === "Delivered") {
          setConnection("delivered");
          source.close();
        }
      } catch {
        setConnection("reconnecting");
      }
    };
    source.onerror = () => {
      if (source.readyState !== EventSource.CLOSED) setConnection("reconnecting");
    };
    return () => source.close();
  }, [order.id]);

  function exportHistory() {
    const rows = history.map((item) => ({ order: order.id, status: item.status, time: when.format(new Date(item.time)) }));
    downloadCsv(toCsv(rows), `order-${order.id}-history.csv`);
  }

  const currentStep = progress.indexOf(status);
  return (
    <main className="tracking-page">
      <div className="tracking-topline">
        <div><span className="tracking-eyebrow">ADDIS EATS · DELIVERY TRACKING</span><h1>Your order is on its way.</h1><p className="tracking-lead">Follow order <strong>{order.id}</strong> from Almaz Kitchen to your door.</p></div>
        <Link href="/menu" className="tracking-back-link">← Back to menu</Link>
      </div>

      <section className="tracking-progress" aria-label="Delivery progress">
        {progress.map((step, index) => <div className={`tracking-step ${currentStep >= index ? "is-complete" : ""} ${status === step ? "is-current" : ""}`} key={step}>
          <span className="tracking-step-dot">{currentStep > index ? "✓" : index + 1}</span><span>{step}</span>
        </div>)}
      </section>

      <div className="tracking-grid">
        <section className="tracking-panel tracking-map-panel">
          <div className="tracking-panel-heading"><div><span className="tracking-eyebrow">LIVE LOCATION VIEW</span><h2>Courier and destination</h2></div><span className="tracking-demo-badge">Demo map</span></div>
          <MapPanel courier={order.courier} destination={order.destination} />
          <div className="tracking-map-legend"><span><i className="legend-dot courier-dot" /> Courier · {order.courier.name}</span><span><i className="legend-dot destination-dot" /> Delivery destination</span></div>
          <div className="tracking-address"><span className="tracking-location-icon">⌖</span><div><small>DELIVERY ADDRESS</small><strong>{order.address}</strong><p>Coordinates: {order.destination.latitude.toFixed(4)}, {order.destination.longitude.toFixed(4)}</p></div></div>
          <p className="tracking-disclaimer">Map coordinates are illustrative demonstration data, not a live GPS location.</p>
        </section>

        <aside className="tracking-panel tracking-details-panel">
          <div className="tracking-status-card"><div className="tracking-status-heading"><span className={`tracking-connection-dot connection-${connection}`} /><span>{connection === "live" ? "Live status connected" : connection === "reconnecting" ? "Reconnecting to status updates…" : connection === "delivered" ? "Delivery completed" : "Connecting to status updates…"}</span></div><small>CURRENT ORDER STATUS</small><h2>{status}</h2><p>Last updated {relative(updatedAt)} · {when.format(new Date(updatedAt))}</p></div>
          <div className="tracking-order-summary"><span className="tracking-eyebrow">ORDER SUMMARY</span><div className="tracking-summary-row"><span>Restaurant</span><strong>{order.restaurant}</strong></div><div className="tracking-summary-row"><span>Order number</span><strong>{order.id}</strong></div><div className="tracking-summary-row"><span>Courier</span><strong>{order.courier.name}</strong></div><div className="tracking-summary-row tracking-total"><span>Total paid</span><strong>{etb.format(order.total)}</strong></div><div className="tracking-summary-row"><span>Order placed</span><strong>{when.format(new Date(order.placedAt))}</strong></div></div>
          <div className="tracking-history"><div className="tracking-history-heading"><div><span className="tracking-eyebrow">ORDER ACTIVITY</span><h3>Status history</h3></div><button className="tracking-export-button" onClick={exportHistory} type="button">↓ Export CSV</button></div>
            <ol>{history.map((item, index) => <li key={`${item.status}-${item.time}`} className={index === history.length - 1 ? "history-latest" : ""}><span className="history-marker" /><div><strong>{item.status}</strong><time dateTime={item.time}>{when.format(new Date(item.time))}</time></div></li>)}</ol>
          </div>
          <CsvUpload />
        </aside>
      </div>
      <p className="tracking-demo-note">Learning demo: the order and courier data are fictional. The server-sent event (SSE) stream simulates status changes every five seconds; it is not connected to a real courier.</p>
    </main>
  );
}

function CsvUpload() {
  const [message, setMessage] = useState("Choose a CSV file up to 2 MB to preview its text.");
  const [isError, setIsError] = useState(false);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setIsError(true); setMessage("File must be 2 MB or smaller."); event.target.value = ""; return;
    }
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setIsError(true); setMessage("Select a file with a .csv extension."); event.target.value = ""; return;
    }
    try {
      const contents = await file.text();
      setIsError(false);
      setMessage(`Read ${file.name} successfully (${contents.length.toLocaleString("en-ET")} characters). This demo previews the file only; it does not import or save rows.`);
    } catch {
      setIsError(true); setMessage("Could not read this file. Try another CSV file.");
    } finally {
      event.target.value = "";
    }
  }

  return <section className="tracking-upload"><span className="tracking-eyebrow">FILES</span><h3>Import order history</h3><label htmlFor="tracking-csv">Choose CSV file</label><input id="tracking-csv" type="file" accept=".csv,text/csv" onChange={handleFileChange} /><p className={isError ? "upload-message upload-error" : "upload-message"} role="status">{message}</p></section>;
}
