import ModalConfirm from "~/components/Modal/ModalConfirm.vue";

const overlay = useOverlay();
export function openConfirmModal(
  path: string,
  ids: number[],
  refresh: () => void
) {
  const modal = overlay.create(ModalConfirm, {
    props: {
      path,
      ids,
      refresh,
    },
  });

  modal.open();
}
