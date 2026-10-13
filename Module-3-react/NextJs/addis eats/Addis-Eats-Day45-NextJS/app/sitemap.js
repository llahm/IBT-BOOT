import dishes from "@/lib/dishes";
export default function sitemap() {
 const site=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000").replace(/\/$/,"");
 return [{url:site,lastModified:new Date(),changeFrequency:"weekly",priority:1},{url:`${site}/menu`,lastModified:new Date(),changeFrequency:"daily",priority:.9},...dishes.map(d=>({url:`${site}/menu/${d.id}`,lastModified:new Date(),changeFrequency:"weekly",priority:.7}))];
}
