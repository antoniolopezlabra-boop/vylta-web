/* Meta Pixel compartido — VYLTA.
   Dataset/Pixel del negocio: 2584977208329904 (Soluciones Digitales Tyndu de México's pixel).
   Incluir en <head> con: <script src="/meta-pixel.js"></script>
   Dispara PageView al cargar. Usa window.fbLead() en clics de CTA. */
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
try{fbq('init','2584977208329904');fbq('track','PageView');}catch(e){}
/* Lead = clic en CTA de registro (intención). La conversión real
   (CompleteRegistration) se dispara del lado de app.vylta.lat. */
window.fbLead=function(){try{fbq('track','Lead');}catch(e){}};
