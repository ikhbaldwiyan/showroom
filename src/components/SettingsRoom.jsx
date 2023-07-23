import React, { useState } from 'react';
import { FaKey, FaLock, FaEye, FaEyeSlash, FaUsers, FaUsersCog, FaInfo } from 'react-icons/fa';
import { Input, Button, Popover, PopoverBody, Form } from 'reactstrap';
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";
import { showToast } from "utils/showToast";
import CustomModal from './CustomModal';

const SettingsRoom = ({ iconCss, set3Room, set4Room }) => {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to show/hide password
  const [showInfoPopover, setShowInfoPopover] = useState(false); // State to control info popover
  const secretPassword = 'sorumMultiStre@m';

  const handleModalPassword = () => {
    setModal(!modal);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === secretPassword) {
      setShowButtons(true);
      showToast("success", "Congrats Multi Room Access Unlocked")
      gaTag({
        action: "submit_multi_access_valid",
        category: "Multi Room Secret",
        label: "Multi Room Page",
        value: null,
        username: getSession()?.profile?.name,
      });
    } else {
      setShowButtons(false);
      showToast("error", "Password salah silahkan cek discord server")
      gaTag({
        action: "submit_multi_access_failed",
        category: "Multi Room Secret",
        label: "Multi Room Page",
        value: null,
        username: getSession()?.profile?.name,
      });
    }
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleInfoPopover = () => {
    setShowInfoPopover(!showInfoPopover);
  };

  return (
    <CustomModal
      color="success"
      autoShowModal={modal}
      toggle={handleModalPassword}
      buttonText={(
        <FaKey style={iconCss} />
      )}
      modalTitle="Multi Room Access"
    >
      <b>
        <p> {!showButtons ? "Unlock Settings Room" : "Multi Room Access Unlocked"} </p>
      </b>
      {showButtons ? (
        <div>
          <Button className="mr-2" color="info" onClick={() => set3Room()}>
            <FaUsers style={iconCss} /> Set 3 Room
          </Button>
          <Button color="info" onClick={() => set4Room()}>
            <FaUsersCog style={iconCss} /> Set 4 Room
          </Button>
        </div>
      ) : (
        <Form onSubmit={handlePasswordSubmit}>
          <Input
            placeholder="Input Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
          />
          <Button className="mt-3" color="danger" onClick={handlePasswordSubmit}>
            <FaLock className="mb-1" />  Unlock
          </Button>
          {/* Toggle show/hide password icon */}
          <Button className="mt-3 ml-2" color="secondary" onClick={handleToggleShowPassword}>
            {showPassword ? <FaEyeSlash style={iconCss} /> : <FaEye style={iconCss} />}
          </Button>
          {/* Separate button with FaInfo icon for the informative text */}
          <Button className="mt-3 ml-2" color="info" id="popover-info" onClick={handleToggleInfoPopover}>
            <FaInfo style={iconCss} />
          </Button>
          {/* Popover for the separate informative text */}
          <Popover style={{ borderRadius: "8px" }} placement="bottom" isOpen={showInfoPopover} target="popover-info" toggle={handleToggleInfoPopover}>
            <PopoverBody style={{ backgroundColor: "#282c34", color: "white", borderRadius: "8px" }}>
              Silahkan join server discord untuk mendapatkan password.
            </PopoverBody>
          </Popover>
        </Form>
      )}
    </CustomModal>
  );
};

export default SettingsRoom;
