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

# Similar work

- https://github.com/gtm-support/vue-gtm: much more complete on GTM side, we may copy over some features at some point

# Donate

If you appreciate the work that went into this App Extension, please consider [donating to Dreamonkey](https://github.com/sponsors/dreamonkey).
