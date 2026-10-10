// Demo-only in-memory order store. Replace with the course's existing backend/API for persistence.
const orders = globalThis.__addisEatsOrders || (globalThis.__addisEatsOrders = []);
export function getAllOrders() { return [...orders].sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
export function listOrdersFor(userId) { return orders.filter((order) => order.userId === userId).sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
export function getOrderById(id) { return orders.find((order) => order.id === String(id)) || null; }
export function createOrder({ user, items, customer }) {
  const order = { id: `AE-${Date.now().toString(36).toUpperCase()}`, userId: user.id, customer, items, total: items.reduce((sum,item)=>sum+item.price*item.quantity,0), status:"Received", createdAt:new Date().toISOString(), statusUpdatedAt:new Date().toISOString() };
  orders.push(order); return order;
}
export function updateOrderStatus(id, status) {
  const order = getOrderById(id); if (!order) return null;
  order.status = status; order.statusUpdatedAt = new Date().toISOString(); return order;
}
