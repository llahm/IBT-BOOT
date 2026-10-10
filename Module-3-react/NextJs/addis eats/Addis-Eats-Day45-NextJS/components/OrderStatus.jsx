"use client";
import useSWR from "swr";
const fetcher=async url=>{const r=await fetch(url);if(!r.ok)throw new Error("Unable to refresh status");return r.json();};
export default function OrderStatus({orderId,initialStatus}) {
 const {data,error,isLoading}=useSWR(`/api/orders/${encodeURIComponent(orderId)}/status`,fetcher,{refreshInterval:5000,fallbackData:{id:orderId,status:initialStatus}});
 return <div className="status-live"><span className="status-dot"/><span><strong>{data?.status || initialStatus}</strong><small>{error?"Live updates unavailable":isLoading?"Checking latest status…":"Updates automatically every 5 seconds"}</small></span></div>;
}
