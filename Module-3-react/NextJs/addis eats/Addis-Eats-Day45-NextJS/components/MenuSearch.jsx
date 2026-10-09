"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
const fetcher = async (url) => { const res = await fetch(url); if (!res.ok) throw new Error("Search failed"); return res.json(); };
function useDebounce(value, delay=300) { const [result,setResult]=useState(value); useEffect(()=>{ const timer=setTimeout(()=>setResult(value),delay); return ()=>clearTimeout(timer); },[value,delay]); return result; }
export default function MenuSearch() {
 const [search,setSearch]=useState(""); const [page,setPage]=useState(1); const query=useDebounce(search.trim(),300);
 useEffect(()=>setPage(1),[query]);
 const key=query ? `/api/dishes?q=${encodeURIComponent(query)}&page=${page}` : null;
 const {data,error,isLoading}=useSWR(key,fetcher,{keepPreviousData:true});
 return <section className="search-panel"><div className="search-heading"><div><span className="eyebrow">FIND YOUR FAVOURITE</span><h2>Search the menu</h2></div><span className="search-count">{data?.total ?? "—"} dishes</span></div>
 <label className="search-input-wrap"><span aria-hidden="true">⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Try kitfo, shiro, pizza…" aria-label="Search dishes"/>{search && <button type="button" onClick={()=>setSearch("")}>Clear</button>}</label>
 {query && isLoading && <p className="muted">Loading results…</p>}{query && error && <p role="alert" className="form-error">Could not load results. Please try again.</p>}
 {query && data && <><div className="search-results">{data.items.map(d=><Link href={`/menu/${d.id}`} className="search-result" key={d.id}><Image src={d.image} alt={d.name} width={76} height={68}/><span><strong>{d.name}</strong><small>{d.categoryLabel}</small></span><b>{d.price} ETB ↗</b></Link>)}</div>{data.items.length===0&&<p>No dishes match “{query}”. Try another search.</p>}
 <div className="pagination"><span>Page {data.page} of {data.totalPages}</span><div><button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Previous</button><button disabled={page>=data.totalPages} onClick={()=>setPage(p=>p+1)}>Next</button></div></div></>}
 </section>;
}
