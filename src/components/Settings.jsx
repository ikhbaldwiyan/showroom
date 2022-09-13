import axios from "axios";
import { API } from "utils/api/api";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addFavoriteRoom } from "utils/addFavoriteRoom";

function Settings(props) {
  const [isOpen, setDropdownOpen] = useState(false);
  const [direction, setDirection] = useState('right')
  const [menu, setMenu] = useState([])
  const [profiles, setProfiles] = useState([]);


  const toggle = () => setDropdownOpen(prevState => !prevState);
  const dispatch = useDispatch();

  const css = { backgroundColor: 'teal', border: 'none', borderRadius: '10px', marginBottom: 4 }
  const inline = { display: 'inline' }

  const { hideTime, setHideTime, hideName, setHideName, hideViews, setHideViews, profile, hideMenu, setHideMenu, hideMultiMenu, setHideMultiMenu, roomId } = props

  useEffect(() => {
    isMobile && setDirection('left')
  }, [direction]);

  function hideOrShow(menu) {
    return menu ? 'Show' : 'Hide'
  }

  useEffect(() => {
    axios.get(`${API}/rooms/profile/${roomId}`).then((res) => {
      const data = res.data;
      setProfiles(data)
    });

  }, [profiles, roomId])

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
      {
        name: 'Add to favorite',
        update: function() { 
         return addFavoriteRoom(dispatch, profiles)
        }
      },
    ]
    setMenu(settingsMenu);
  }, [hideName, hideTime, hideViews, hideMenu, profiles, roomId])

  return (
    <div style={inline} className="ml-1 mt-1">
      <Dropdown style={inline} isOpen={isOpen} toggle={toggle} direction={direction}>
        <DropdownToggle style={css}>
          <IoMdSettings style={{fontSize: 20, marginBottom: 2}} />
        </DropdownToggle>
        <DropdownMenu>
          {menu.map((item, idx) => (
            <DropdownItem key={idx} onClick={item.update}>{item.name}</DropdownItem>
          ))}
          <DropdownItem href={profile.share_url_live} target="_blank" >Open Showroom</DropdownItem>
          {window.location.pathname === '/multi-room' && (
            <DropdownItem onClick={() => { setHideMultiMenu(!hideMultiMenu) }}>{hideOrShow(hideMultiMenu)} Multi Options</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Settings;
