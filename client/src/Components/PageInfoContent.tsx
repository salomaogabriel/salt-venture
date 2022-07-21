import '../Styles/InfoPage.css';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { GiFallingStar } from 'react-icons/gi';

type Props = {
  setModalOpen: any,
  gameName: any,
  user:any
};

const PageInfoContent: React.FC<Props> = ({ setModalOpen, gameName,user }) => {
  const navigate = useNavigate();
  const navigteToLogIn = () => {
      navigate('/salt-venture/Login');
  };
  return (

    <div className='pop-up-main'>
      <p className='title'> &lt;/ {gameName} &gt;</p>
      <div>
        <AiOutlineCloseCircle className='cancel-popup__button' onClick={() => setModalOpen(false)} />

        <hr className='description-divider'/>
        {gameName === "Salt & Pepper" &&
          <p className='description'>
            Salt & Pepper is a board game where the goal is to find the highest amount of salt shakers behind the squares. <br/>
            <GiFallingStar/> If you happen to find a pepper shaker, you lose the game and all your leveraged points. <br/>
            <GiFallingStar/> For each salt shaker you find, the reward multiplier increases.<br/>
            <GiFallingStar/> You can decide at any point to cash out with your points.
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
        {gameName === "Mine Sweeper " &&
          <p className='description'>
            This game is single-player Mine Sweeper.</p>
        }
        {user.id == undefined ? 
          <button
          type='button'
          className='play-button'
        onClick={navigteToLogIn}
        >
          <span>Log In</span>
        </button>
        :
        <button
        type='button'
        className='play-button'
        onClick={() => {setModalOpen(false); navigate('/salt-venture/games/saltandpepper');}}
      >
        <span>Play</span>
      </button>
        }
      

      </div>
    </div>

  );
}
export default PageInfoContent;