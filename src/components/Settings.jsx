import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { IoMdSettings } from "react-icons/io";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProfileModal from "./ProfileModal";

function Settings(props) {
  const [isOpen, setDropdownOpen] = useState(false);
  const [direction, setDirection] = useState('right')
  const [menu, setMenu] = useState([])
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const css = { backgroundColor: 'teal', border: 'none', borderRadius: '10px', marginBottom: 4 }
  const inline = { display: 'inline' }

  const { hideTime, setHideTime, hideName, setHideName, hideViews, setHideViews, profile, hideMenu, setHideMenu } = props

  useEffect(() => {
    isMobile && setDirection('left')
  }, [direction]);

  function hideOrShow(menu) {
    return menu ? 'Show' : 'Hide'
  }

  useEffect(() => {
    const settingsMenu = [
      {
        name: hideOrShow(hideName) + ' Name',
        update: function() { 
         return setHideName(!hideName)
        }
      },
      {
        name: hideOrShow(hideViews) + ' Views',
        update: function() { 
          return setHideViews(!hideViews)
        }
      },
      {
        name: hideOrShow(hideMenu) + ' Menu',
        update: function() { 
          return setHideMenu(!hideMenu)
        }
      },
      {
        name: hideOrShow(hideTime) + ' Time / Title',
        update: function() { 
         return setHideTime(!hideTime)
        }
      },
    ]
    setMenu(settingsMenu);
  }, [hideName, hideTime, hideViews, hideMenu])

  return (
    <div style={inline} className="ml-1 mt-1">
      <Dropdown style={inline} direction="up" isOpen={isOpen} toggle={toggle} direction={direction}>
        <DropdownToggle style={css}>
          <IoMdSettings style={{fontSize: 20, marginBottom: 2}} />
        </DropdownToggle>
        <DropdownMenu>
          {menu.map((item, idx) => (
            <DropdownItem key={idx} onClick={item.update}>{item.name}</DropdownItem>
          ))}
          <ProfileModal className="btn-sm mt-1 px-4 mb-1" profile={profile} buttonLabel="Show Profile" />
          <DropdownItem href={profile.share_url_live} target="_blank" >Open Showroom</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Settings;
