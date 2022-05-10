import { TrackingId, useTrackingMeta } from "./shared";

export function useLinkedinInsightTag(maybeId: TrackingId) {
  useTrackingMeta(maybeId, (id) => ({
    script: {
      linkedinPartnerId: {
        type: "text/javascript",
        innerHTML: `window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(${id});`,
      },
      linkedinInsightTag: {
        type: "text/javascript",
        innerHTML: `(function(l) {if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);`,
      },
    },
    noscript: {
      linkedinInsightTag: `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=${id}&fmt=gif" />`,
    },
  }));
}
