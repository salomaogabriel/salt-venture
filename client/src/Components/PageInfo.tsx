import { createPortal } from 'react-dom';

type Props = {
  modalOpen: boolean;
  children: React.ReactNode;
};

const PageInfo: React.FC<Props> = ({ modalOpen, children }) => {

  if (!modalOpen) return null;

  return createPortal(
    <div >
      <div>{children}</div> 
    </div>,
    document.activeElement
  );
};

export default PageInfo;