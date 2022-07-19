import React, { useState } from 'react'
import '../Styles/MenuBar.css';
import Header from './Header'
import { Squeeze as Hamburger } from 'hamburger-react'
import { isTemplateExpression } from 'typescript';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { GiWorld } from 'react-icons/gi';
import { MdOutlineSettings } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

interface Props {
  user: {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined,
    token: string | undefined,
  },
  logOut: () => void;
}

const MenuBar = ({ user, logOut }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => {
    setIsActive(!isActive);

  }
  const logOutFromApp = () => {
    toggleIsActive();
    localStorage.clear();
    logOut();

  }
  const sidebarNavItems = [
    {
      display: 'Home',
      icon: <AiOutlineHome className='dropdown-icon' />,
      to: '/salt-venture/',
      section: ''
    },
    {
      display: 'Profile',
      icon: <FaUserAlt className='dropdown-icon' />,
      to: '/salt-venture/profile',
      section: 'profile'
    },
    {
      display: 'Rankings',
      icon: <GiWorld className='dropdown-icon' />,
      to: '/salt-venture/ranks',
      section: 'rank'
    },
    {
      display: 'Settings',
      icon: <MdOutlineSettings className='dropdown-icon' />,
      to: '/salt-venture/settings',
      section: 'rank'
    }
  ]
  if(user.id == undefined)
  {
    return (
      <>Salt Venture</>
    );
  }
  if (isActive === true ) {
    return (
      <>


        <div className="burger-header">
          <Hamburger rounded color='#8C8A93' onToggle={toggleIsActive} toggled={true} />
        </div>
        <div id="mySidepanel" className="sidepanel" style={{ "width": "250px" } as React.CSSProperties}>
          <FaUserAlt className='dropdown-user-icon' />
          <div className="dropdown-user">
            <p> {user.username} </p>
            <p className='dropdown-email'> {user.email} </p>
          </div>
          <hr className='log-out-divider' />
          {sidebarNavItems.map((item) => {
            return (
              <Link to={item.to} onClick={toggleIsActive} >
                {item.icon} {item.display}
              </Link>
            );
          })}
          <hr className='log-out-divider' />
          <div onClick={logOutFromApp} className="log-out">
            <BiLogOut className="log-out-icon" />
            <div className='log-out-text'>Log out</div>
          </div>
        </div>
        <div className="full-screen-cover"></div>
      </>

    )
  } else {
    return (
      <>
        <div className="burger-header">
          <Hamburger rounded color='#8C8A93' onToggle={toggleIsActive} toggled={false} />
        </div>
        <div id="mySidepanel" className="sidepanel" style={{ "width": "0px" } as React.CSSProperties} >
        </div>
      </>
    );
  }
}

export default MenuBar

function item(item: any): React.ReactNode {
  throw new Error('Function not implemented.');
}
