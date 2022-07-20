import React from 'react';
import '../Styles/InfoPage.css';

type Props = {
  setModalOpen: any;
};

const PageInfoContent: React.FC<Props> = ({ setModalOpen }) => (
  <div className='center'>
    <p className='title'> Name of the Game</p>
    <div>
      <i className=''></i>
      <button
        type='button'
        className=''
        onClick={() => setModalOpen(false)}
      >
        <span>Close</span>
      </button>
      <p>Here goes the game info </p>
      <button
        type='button'
        className=''
        //onClick={() => setModalOpen(false)}
      >
        <span>Play</span>
      </button>
    </div>
  </div>
);

export default PageInfoContent;