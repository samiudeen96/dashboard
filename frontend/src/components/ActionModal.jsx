// components/ActionModal.jsx
import useUiStore from "../store/uiStore";

const ActionModal = () => {
  const { isModalOpen, modalData, closeModal } = useUiStore();

  if (!isModalOpen || !modalData) return null;

  const handleConfirm = () => {
    if (modalData.onConfirm) {
      modalData.onConfirm(modalData.actionType); // run callback
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-sm shadow-sm m-3 p-5 min-w-[300px]">
        <p>{modalData.desc}</p>
        <div className="flex justify-center gap-5 mt-5">
          <button className="button_secondary" onClick={closeModal}>
            Cancel
          </button>
          <button
            className={`button_tertiary ${modalData.color || ""}`}
            onClick={handleConfirm}
          >
            {modalData.buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
