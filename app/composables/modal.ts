import ModalConfirm from "~/components/Modal/ModalConfirm.vue";

const overlay = useOverlay();
export function openConfirmModal(anyFunction: () => Promise<void>) {
  const modal = overlay.create(ModalConfirm, {
    props: {
      function: anyFunction,
    },
  });

  modal.open();
}
