import { TrackingId, useTrackingMeta } from "./shared";

import { uid } from "quasar";

interface GoogleTagManagerEvent {
  event: string;
  cid: string;
  [index: string]: string;
}

declare global {
  interface Window {
    dataLayer?: GoogleTagManagerEvent[];
  }
}

export function useGoogleTagManager(maybeId: TrackingId) {
  useTrackingMeta(maybeId, (id) => ({
    script: {
      googleTagManager: {
        type: "text/javascript",
        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');
      `,
      },
    },
    noscript: {
      googleTagManager: `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    },
  }));
}

function getCid() {
  // We need an unique identifier for this session
  // We store it in a localStorage, but cookies could be used too
  if (!localStorage.cid) {
    localStorage.cid = uid();
  }
  return localStorage.cid;
}

export function logGoogleTagManagerEvent(
  eventName: string,
  eventData: Record<string, string>
) {
  if (!window.dataLayer) {
    throw new Error(
      "You haven't initialized properly the Google Tag Manager, call 'useGoogleTagManager' into your main layout"
    );
  }

  window.dataLayer.push({
    event: eventName,
    cid: getCid(),
    ...eventData,
  });
}
