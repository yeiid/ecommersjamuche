import{c as w}from"./cartStore.Dg_JJ8gq.js";import{w as g}from"./wishlistStore.DdiVJu_S.js";import{m as x,a as y}from"./index.9eZ28vGx.js";const s=x({}),b=y([]);function H(t){s.get(),s.setKey(t.id,{...t,viewedAt:new Date().toISOString()}),h(),n()}function n(){const t=w.get(),i=g.get(),o=s.get(),a=new Set;Object.values(t).forEach(e=>{e.category&&a.add(e.category)}),Object.values(i).forEach(e=>{e.category&&a.add(e.category)}),Object.values(o).forEach(e=>{e.category&&a.add(e.category)});const l=[{id:"r1",name:"Kit de Cultivo Básico",price:15e4,discountPrice:129e3,image:"https://images.unsplash.com/photo-1520618821593-5016e5a0409f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",description:"Kit de inicio para cultivo con todo lo necesario para comenzar tu jardín.",category:"accesorios"},{id:"r2",name:"Extracto Relajante",price:69e3,image:"https://images.unsplash.com/photo-1591736555078-d991c8e024ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",description:"Extracto con propiedades relajantes para aliviar el estrés y ansiedad.",category:"extractos"},{id:"r3",name:"Semillas Premium",price:52e3,discountPrice:45e3,image:"https://images.unsplash.com/photo-1674243478722-387779cb1f09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",description:"Pack de semillas de alta calidad con alta tasa de germinación.",category:"semillas"},{id:"r4",name:"Planta Medicinal",price:95e3,image:"https://images.unsplash.com/photo-1588084072563-819440434d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",description:"Planta con propiedades medicinales cultivada en ambiente controlado.",category:"plantas"},{id:"r5",name:"Bálsamo Natural",price:38e3,discountPrice:32e3,image:"https://images.unsplash.com/photo-1558155001-7a4122e1155c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",description:"Bálsamo natural para aliviar dolores musculares.",category:"extractos"}],f=Object.keys(t),m=Object.keys(i),d=l.filter(e=>!f.includes(e.id)&&!m.includes(e.id)),c=Array.from(a);let r=d;return c.length>0&&(r=d.sort((e,u)=>{const p=c.includes(e.category)?1:0;return(c.includes(u.category)?1:0)-p})),r=r.slice(0,4),b.set(r),r}function h(){if(typeof window<"u"){const t=s.get(),i=Object.values(t).sort((o,a)=>new Date(a.viewedAt).getTime()-new Date(o.viewedAt).getTime()).slice(0,20).reduce((o,a)=>(o[a.id]=a,o),{});localStorage.setItem("jamuchee-viewed-products",JSON.stringify(i))}}function D(){if(typeof window<"u"){const t=localStorage.getItem("jamuchee-viewed-products");if(t)try{const i=JSON.parse(t);s.set(i)}catch(i){console.error("Error loading viewed products from localStorage:",i)}}}D();n();export{H as a,n as g,b as r};
