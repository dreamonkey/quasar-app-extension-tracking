import { TrackingId, useTrackingMeta } from "./shared";

export function useLinkedinInsightTag(maybeId: TrackingId) {
  useTrackingMeta(maybeId, (id) => ({
    script: {
      linkedinInsightTag: {
        type: "text/javascript",
        innerHTML: `window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(${id});
        (function(){var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})();`,
      },
    },
    noscript: {
      linkedinInsightTag: `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=${id}&fmt=gif" />`,
    },
  }));
}
