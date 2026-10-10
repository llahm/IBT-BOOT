"use client";
import { useState, useTransition } from "react";
import { updateOrderStatusAction } from "@/app/actions";
const statuses=["Received","Preparing","Ready","Out for delivery","Delivered","Cancelled"];
export default function KitchenControls({order}) {
 const [status,setStatus]=useState(order.status); const [message,setMessage]=useState(""); const [pending,startTransition]=useTransition();
 function update(){startTransition(async()=>{const result=await updateOrderStatusAction(order.id,status);setMessage(result?.error||"Status updated.");});}
 return <div className="kitchen-controls"><label>Status for {order.id}<select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></label><button className="button button-primary" disabled={pending||status===order.status} onClick={update}>{pending?"Saving…":"Update status"}</button>{message&&<small role="status">{message}</small>}</div>;
}
