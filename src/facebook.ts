import { TrackingId, useTrackingMeta } from "./shared";

export function useFacebookPixel(maybeId: TrackingId) {
  useTrackingMeta(maybeId, (id) => ({
    script: {
      facebookPixel: {
        type: "text/javascript",
        innerHTML: `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${id}'); 
        fbq('track', 'PageView');`,
      },
    },
    noscript: {
      facebookPixel: `<img height="1" width="1" src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"/>`,
    },
  }));
}
