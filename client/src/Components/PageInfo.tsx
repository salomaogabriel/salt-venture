import { createPortal } from 'react-dom';

type Props = {
  modalOpen: boolean;
  children: React.ReactNode;
  setModalOpen: (b:boolean) => void; 
};

const PageInfo: React.FC<Props> = ({ modalOpen, children, setModalOpen }) => {

  if (!modalOpen) return null;

  return createPortal(
    <div >
      <div className="full-screen-cover" onClick={() => setModalOpen(false)}></div>
      <div>{children}</div> 
    </div>,
    document.activeElement
  );
};

export default PageInfo;