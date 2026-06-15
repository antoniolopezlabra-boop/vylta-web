/* VYLTA funnel tracker — envía eventos a Supabase (funnel_events).
   Público por diseño: usa la anon key (insert-only via RLS). */
(function () {
  var SB = 'https://nhjmwmkaduiaifgztymi.supabase.co';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oam13bWthZHVpYWlmZ3p0eW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODk3MTYsImV4cCI6MjA4ODE2NTcxNn0.p53BZPf6qygAYw29bIJ0bA5VwZ_lRxw-aocV8LuGB1c';

  function sid() {
    try {
      var k = 'vf_sid', v = localStorage.getItem(k);
      if (!v) { v = Date.now().toString(36) + Math.random().toString(36).slice(2, 10); localStorage.setItem(k, v); }
      return v;
    } catch (e) { return 'anon-' + Math.random().toString(36).slice(2, 10); }
  }
  function qp(n) { try { return new URLSearchParams(location.search).get(n) || null; } catch (e) { return null; } }

  // Fase 2: añade vf_sid (y vf_giro) a los enlaces de registro para atribuir
  // sesión → cliente al cruzar de vylta.lat a app.vylta.lat (otro origen).
  function attachSid() {
    try {
      var s = sid();
      var links = document.querySelectorAll('a[href*="app.vylta.lat/register"]');
      for (var i = 0; i < links.length; i++) {
        try {
          var u = new URL(links[i].href);
          if (!u.searchParams.get('vf_sid')) u.searchParams.set('vf_sid', s);
          var g = links[i].getAttribute('data-giro') || u.searchParams.get('utm_campaign') || qp('giro');
          if (g && !u.searchParams.get('vf_giro')) u.searchParams.set('vf_giro', g);
          links[i].href = u.toString();
        } catch (e) {}
      }
    } catch (e) {}
  }
  if (document.readyState !== 'loading') attachSid();
  else document.addEventListener('DOMContentLoaded', attachSid);

  window.vfunnel = function (name, extra) {
    extra = extra || {};
    var body = {
      session_id: sid(),
      event_name: name,
      scene_num: (extra.scene_num != null ? extra.scene_num : null),
      giro: extra.giro || qp('giro') || null,
      utm_source: qp('utm_source'),
      utm_medium: qp('utm_medium'),
      utm_campaign: qp('utm_campaign'),
      path: location.pathname,
      referrer: document.referrer || null
    };
    try {
      fetch(SB + '/rest/v1/funnel_events', {
        method: 'POST',
        headers: {
          'apikey': KEY,
          'Authorization': 'Bearer ' + KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(body),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  };
})();
