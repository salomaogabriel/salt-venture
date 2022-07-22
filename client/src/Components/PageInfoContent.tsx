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
      <p className='pop-up-title'> &lt;/ {gameName} &gt;</p>
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
          Crash consists of a line that keeps going up and up, multiplying your bet until it crashes. <br />
          <GiFallingStar/> During this time period, you are free to cash out whenever you want. <br />
          <GiFallingStar/>  If you cash out before the random crash, you keep your winnings otherwise, you lose your whole bet. 
          </p>

        }
        {gameName === "4 in a row" &&
          <p className='description'>
          4 in a row is a 1v1 game where the goal is to get 4 rocks in a row before your opponent does. <br />
          <GiFallingStar/>  the winner gets all the points betted from the loser, and the loser doesn't get anything.
          </p>

        }
        {gameName === "Diamonds" &&
          <p className='description'>
            Diamonds is a game that is similar to a lottery.
            You can place between 1 and 24 diamonds, for a higher reward, inside boxes then, depending on the risk value, 
            a certain number of boxes will be chosen. <br />
            <GiFallingStar/> If all your diamonds are selected, you win. <br />
            <GiFallingStar/> You lose everything otherwise.
            
          </p>

        }
        {gameName === "Dragon Tower" &&
          <p className='description'>
            The goal of Tower is to get as high as you can in the tower, to get higher rewards. <br />
            <GiFallingStar/> To do that, in each round, you have to find an egg that has been placed in a box. <br />
            <GiFallingStar/> If you find an egg, you can go to the next floor, or cashout. <br />
            <GiFallingStar/> If you don't find it, you lose all your leveraged points.
            </p>

        }
        {gameName === "Tenzies" &&
          <p className='description'>
            Tenzies is a dice game where the goal is to match all same dice numbers as fast as you can. <br/>
            <GiFallingStar/> Roll until all dice are the same. <br/>
            <GiFallingStar/>Click each die to freeze it at its current value between rolls. <br/>
            
          </p>

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
        className={`play-button ${gameName == "Salt & Pepper" || gameName === "Tenzies" ? "" : "play-button--disabled"}`}
        onClick={() => { setModalOpen(false); 
          {gameName === "Salt & Pepper" && navigate('/salt-venture/games/saltandpepper');}
          {gameName === "Tenzies" && navigate('/salt-venture/games/tenzies');}
        
        }}
      >
        <span>Play</span>
      </button>
        }
      

      </div>
    </div>

  );
}
export default PageInfoContent;