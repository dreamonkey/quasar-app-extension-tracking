# @dreamonkey/quasar-app-extension-tracking

This is a [Quasar App Extension (AE)](https://quasar.dev/app-extensions/introduction#Introduction)
It provides composables for many commonly used tracking scripts using [Quasar Meta Composable](https://quasar.dev/vue-composables/use-meta).

- Google Tag Manager -> `useGoogleTagManager`
- Facebook Pixel -> `useFacebookPixel`
- Linkedin Insight Tag -> `useLinkedinInsightTag`

We'll gladly accept other contributions.

# Install

```bash
quasar ext add @dreamonkey/tracking
```

# Uninstall

```bash
quasar ext remove @dreamonkey/tracking
```

# Usage

Composables are meant to be placed into your layout components, as you usually want them to be triggered each time a user land on any of your pages.
All composables accept an id/key, either as a plain string or as a ref.
When using a ref, the script won't be added when its value is an empty string, undefined or any falsy value.

**Scripts won't be added at all when compiling the app in development mode (eg. when running `quasar dev`)**

```ts
// src/layouts/main-layout.vue

import {
  useGoogleTagManager,
  useLinkedinInsightTag,
} from "@dreamonkey/quasar-app-extension-tracking";

export default {
  name: "MainLayout",
  setup() {
    // Add Google Tag Manager script
    useGoogleTagManager("GTM-XXXXXXX");

    const linkedinId = ref();
    // Won't add the Linkedin Insight Tag script since the provided ref has undefined value
    useLinkedinInsightTag(linkedinId);

    // Tracking AE will react to the change and add Linkedin Insight Tag script
    linkedinId.value = "XXXXXXX";
  },
};
```

## Helpers

We provide some helpers to make your life easier.

### `logGoogleTagManagerEvent`

You can use this helper to log an event to Google Tag Manager.
We don't make assumption about the event name nor data, but you must assure that the event name is a valid Google Tag Manager event name.
The first time you log an event we generate a unique id which identifies the session.
The id is then saved into the browser local storage and automatically attached to each event as a `cid` property.

```ts
// Send a lead generation event
logGoogleTagManagerEvent("leadGeneration", {
  leadId: "12345",
});

// { event: "leadGeneration", leadId: "12345", cid: "XXXX-XX...XXX" }
```

For SPA websites or SSR/SSG with SPA takeover, Google Tag Manager will only catch the first PageView event.
To record all page views of subsequent navigations, you need to [create an ad-hoc custom event](https://fullstack-tutorials.com/quasar-framework/quasar-framework-google-tag-manager-and-analytics-setup-for-an-spa-website) on Google Tag Manager and use router's `afterEach` hook to fire it upon navigation.

```ts
// main-layout.vue - setup()

// Send a page view event each time the user navigate
const router = useRouter();
router.afterEach((to) => {
  logGoogleTagManagerEvent("customPageView", {
    path: to.path,
  });
});

// { event: "customPageView", path: "/homepage", cid: "XXXX-XX...XXX" }
```

In case you need to provide the page title too and you're using Quasar Meta Composable to update it accordingly to the loaded page, remember that Vue-Router isn't aware of that change and you'll need to add a delay to let the update occour.

```ts
// main-layout.vue - setup()

// Send a page view event each time the user navigate
const router = useRouter();
router.afterEach(async (to) => {
  // Wait for Meta plugin to kick in and update the document title
  await new Promise((resolve) => setTimeout(resolve, 500));
  logGoogleTagManagerEvent("customPageView", {
    path: to.path,
    title: document.title,
  });
});

// { event: "customPageView", path: "/homepage", title: "Homepage - My Website",  cid: "XXXX-XX...XXX" }
```

You can also use Google Tag Manager ["History Change" listener](https://www.analyticsmania.com/other-posts/single-page-applications-with-universal-analytics-and-google-tag-manager/) instead.

# Similar work

- https://github.com/gtm-support/vue-gtm: much more complete on GTM side, we may copy over some features at some point

# Donate

If you appreciate the work that went into this App Extension, please consider [donating to Dreamonkey](https://github.com/sponsors/dreamonkey).
