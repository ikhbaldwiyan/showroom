import React from 'react'
import { Button } from 'reactstrap'
import { RiGlobalLine } from 'react-icons/ri';
import { AiFillAppstore } from 'react-icons/ai';
import { IoSchoolSharp } from 'react-icons/io5';

function FilterRoomList({
  allMember,
  isAcademy,
  isRegular,
  setIsAcademy,
  setAllMember,
  setIsRegular,
  isLive,
  setIsLive,
  isRoomLive
}) {
  const filterAllMember = () => {
    setIsRegular(false);
    setAllMember(true);
    setIsAcademy(false);
    setIsLive(false);
  };

  const filterAcademy = () => {
    setIsAcademy(true);
    setAllMember(false);
    setIsRegular(false);
    setIsLive(false);
  };

  const filterRegular = () => {
    setIsRegular(true);
    setAllMember(false);
    setIsAcademy(false);
    setIsLive(false);
  };

  const filterIsLive = () => {
    setIsLive(true);
    setIsRegular(false);
    setAllMember(false);
    setIsAcademy(false);
  };

  return (
    <div className="mb-3 text-justify">
      <Button
        className="mr-1"
        color="danger"
        onClick={filterAllMember}
        disabled={allMember ? 'disabled' : ''}
        size="sm"
      >
        <AiFillAppstore className='mb-1' /> <span className="text-filter">ALL</span>
      </Button>
      <Button
        className="mr-1"
        color="info"
        onClick={filterAcademy}
        disabled={isAcademy ? 'disabled' : ''}
        size="sm"
        style={{ font: 'poppins' }}
      >
        <IoSchoolSharp className='mb-1' /> <span className="text-filter">ACADEMY</span>
      </Button>
      <Button
        className="mr-1"
        style={{ backgroundColor: 'teal', border: 'none' }}
        onClick={filterRegular}
        disabled={isRegular ? 'disabled' : ''}
        size="sm"
      >
        <RiGlobalLine className="mb-1" /> <span className="text-filter">REGULAR</span>
      </Button>
      {isRoomLive.length !== 0 && (
        <Button
          className="mr-1"
          style={{ backgroundColor: '#CD0C0D', border: 'none' }}
          onClick={filterIsLive}
          disabled={isLive ? 'disabled' : ''}
          size="sm"
        >
          <span className="text-filter">LIVES</span>
        </Button>
      )}
    </div>
  )
}

export default FilterRoomList