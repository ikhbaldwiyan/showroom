import React from 'react';
import { FcSearch } from 'react-icons/fc';
import { Button } from 'reactstrap';
import { RiGlobalLine } from 'react-icons/ri';
import { AiFillAppstore, AiFillVideoCamera } from 'react-icons/ai';
import { IoSchoolSharp } from 'react-icons/io5';
import { isMobile } from 'react-device-detect';

function SearchAndFilter({
  handleSearch,
  allMember,
  isAcademy,
  isRegular,
  setIsAcademy,
  setAllMember,
  setIsRegular,
  isLive,
  setIsLive,
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
    !isMobile ? (
      <div className="row mt-4">
        <div className="col-md-5 col-sm-12 search-wrapper">
          <FcSearch className="search-bar" color="#03665c" size="1.5em" />
          <input
            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem' }}
            type="text"
            placeholder="Search member name"
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="col-md-7 col-sm-12 search-wrapper">
          <Button
            className="mx-2"
            color="danger"
            onClick={filterAllMember}
            disabled={allMember ? 'disabled' : ''}
          >
            <AiFillAppstore className='mb-1'/> <span className="text-filter">ALL MEMBER</span>
          </Button>
          <Button
            className="mx-2"
            color="info"
            onClick={filterAcademy}
            disabled={isAcademy ? 'disabled' : ''}
            style={{font: 'poppins'}}
          >
            <IoSchoolSharp className='mb-1 mr-1' /> <span className="text-filter">ACADEMY</span>
          </Button>
          <Button
            className="mx-2"
            style={{ backgroundColor: 'teal', border: 'none' }}
            onClick={filterRegular}
            disabled={isRegular ? 'disabled' : ''}
          >
           <RiGlobalLine className="mb-1" /> <span className="text-filter">REGULAR</span>
          </Button>
          <Button
            className="mx-2 btn-onlive"
            style={{backgroundColor: '#CD0C0D', border: 'none'}}
            onClick={filterIsLive}
            disabled={isLive ? 'disabled' : ''}
          >
            <AiFillVideoCamera className="mb-1" /> <span className="text-filter">ROOM ON LIVE</span>
          </Button>
        </div>
      </div>
    ) : (
      <div className="row mt-4">
        <div className="col-12 search-wrapper">
          <FcSearch className="search-bar" color="#03665c" size="1.5em" />
          <input
            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem' }}
            type="text"
            placeholder="Search member name"
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="col-12 search-wrapper">
          <Button
            className="mx-2"
            color="danger"
            onClick={filterAllMember}
            disabled={allMember ? 'disabled' : ''}
          >
            <AiFillAppstore className='mb-1'/> <span className="text-filter">ALL</span>
          </Button>
          <Button
            className="mx-2"
            color="info"
            onClick={filterAcademy}
            disabled={isAcademy ? 'disabled' : ''}
          >
            <IoSchoolSharp className='mb-1' /> <span className="text-filter">ACADEMY</span>
          </Button>
          <Button
            className="mx-2"
            style={{ backgroundColor: 'teal', border: 'none' }}
            onClick={filterRegular}
            disabled={isRegular ? 'disabled' : ''}
          >
           <RiGlobalLine className="mb-1" /> <span className="text-filter">REGULAR</span>
          </Button>
        </div>
      </div>
    )
  );
}

export default SearchAndFilter;
