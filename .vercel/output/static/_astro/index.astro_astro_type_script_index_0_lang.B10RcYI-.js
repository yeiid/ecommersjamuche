import{s as o}from"./supabase.CIJy6KaJ.js";import"./authStore.oNKChDb7.js";import"./index.Bj88MMzq.js";import"./equality.Dp7T0ObN.js";typeof window<"u"&&(sessionStorage.removeItem("admin_redirection_attempted"),sessionStorage.removeItem("dashboard_redirection_attempted"),sessionStorage.removeItem("devModeAuth"),localStorage.getItem("devModeAuth"),console.log("Verificando sesión con Supabase"),o.auth.getSession().then(({data:{session:e}})=>{e?(console.log("Sesión activa detectada, redirigiendo al dashboard"),window.location.href="/admin/dashboard"):console.log("No hay sesión activa, mostrando formulario de login")}).catch(e=>{console.error("Error al verificar sesión:",e)}));
