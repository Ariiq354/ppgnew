import { useOverlay } from "#ui/composables/useOverlay";
import ModalConfirm from "~/components/Modal/ModalConfirm.vue";

const overlay = useOverlay();
export function openConfirmModal(
  path: string,
  body: object,
  refresh: () => void
) {
  const modal = overlay.create(ModalConfirm, {
    props: {
      path,
      body,
      refresh,
    },
  });

  modal.open();
}
