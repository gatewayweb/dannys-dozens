import Modal from 'react-modal';

const modalStyles = {
  content: {
    width: '600px',
    maxWidth: '90%',
    height: 'auto',
    minHeight: '0px',
    boxShadow: '5px 6px 25px 0px rgba(0,0,0,0.1)',
    border: 'none',
    borderRadius: '8px',
    position: 'static',
  },
  overlay: {
    zIndex: '50',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(10px)',
  },
};

export default function AppModal({ children, isOpen, setIsOpen, contentLabel }) {
  return (
    <Modal
      style={modalStyles}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}
