import { useMeta } from "quasar";
import { MetaOptions } from "quasar/dist/types/meta";
import { Ref, unref } from "vue";

export type TrackingId = string | Ref<string | undefined>;

export function useTrackingMeta(
  maybeId: TrackingId,
  metaOptionsFn: (id: string) => MetaOptions
): void {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  useMeta(() => {
    const id = unref(maybeId);
    if (!id) {
      return {};
    }

    return metaOptionsFn(id);
  });
}
