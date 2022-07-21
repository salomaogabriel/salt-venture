import '../Styles/InfoPage.css';

import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
  setModalOpen: any,
  gameName: any,
};

const PageInfoContent: React.FC<Props> = ({ setModalOpen, gameName }) => (

  <div className='pop-up-main'>
    <p className='title'> &lt;/{gameName}&gt;</p>
    <div>
      <AiOutlineCloseCircle className='cancel-popup__button' onClick={() => setModalOpen(false)} />

      {gameName === "Mine Sweeper" &&
        <p className='description'>
          This game is single-player logic-based computer game played on
          rectangular board whose object is to locate a predetermined number of randomly-placed "mines"
          in the shortest possible time by clicking on "safe" squares
          while avoiding the squares with mines. If the player clicks on a mine,
          the game ends.
        </p>

      }
      {gameName === "Crash" &&
        <p className='description'>
          This game is single-player Crash.
        </p>

      }
      {gameName === "4 in a row" &&
        <p className='description'>
          This game is single-player 4 in a row.
        </p>

      }
      {gameName === "Diamonds" &&
        <p className='description'>
          This game is single-player Diamonds.
        </p>

      }
      {gameName === "Tower" &&
        <p className='description'>

          This game is single-player Tower.</p>

      }
      <button
        type='button'
        className='play-button'
      //onClick={() => setModalOpen(false)}
      >
        <span>Play</span>
      </button>

    </div>
  </div>

);

export default PageInfoContent;