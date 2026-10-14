import { demoTrackingOrder } from "@/lib/tracking-order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const demoStatuses = ["Preparing", "Picked up", "On the way", "Delivered"];

export async function GET(request, { params }) {
  const { id } = await params;
  if (id !== demoTrackingOrder.id) return Response.json({ error: "Order not found" }, { status: 404 });

  const encoder = new TextEncoder();
  let index = Math.max(0, demoStatuses.indexOf(demoTrackingOrder.status));
  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      let timer;
      const send = (data) => {
        if (!closed) controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      const close = () => {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        request.signal.removeEventListener("abort", close);
        try { controller.close(); } catch { /* The client may already have disconnected. */ }
      };
      const sendStatus = () => {
        if (closed) return;
        send({ orderId: id, status: demoStatuses[index], updatedAt: new Date().toISOString() });
        if (demoStatuses[index] === "Delivered") { close(); return; }
        index += 1;
      };
      sendStatus();
      if (!closed) timer = setInterval(sendStatus, 5000);
      request.signal.addEventListener("abort", close, { once: true });
    },
    cancel() { /* request abort handler performs timer cleanup */ },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
