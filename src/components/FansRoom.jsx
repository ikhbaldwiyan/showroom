import React, { useState, useEffect } from 'react'
import axios from "axios";
import Button from "elements/Button";
import Fade from 'react-reveal/Fade';
import { isMobile } from 'react-device-detect';

function FansRoom({roomId}) {
  const [profile, setProfile] = useState('');

  useEffect(() => { 
    axios.get(`/profile?room_id=${roomId}`).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
    });
  }, [roomId]);

  return (
    <div key={profile.roomId} className={`item ${isMobile ? "column-12 row-1" : `column-4 row-1`}`}>
      <Fade bottom>
        <div className="card card-featured">
          {profile.is_onlive && (
             <div className="tag" style={{backgroundColor: '#dc3545'}}>
             Live <span className="font-weight-light">Now</span>
           </div>
          )}
          <figure className="img-wrapper">
            <img
              src={profile.image}
              alt={profile.main_name}
              className="img-cover"
            />
          </figure>
          <div className="meta-wrapper">
            <Button
              type="link"
              style={{textDecoration: 'none'}}
              className="strecthed-link d-block text-white"
              href={`live-stream/${profile.room_id}`}
            >
              <h5>{profile.main_name}</h5>
            </Button>
          </div>
        </div>
        <div>
          {profile.avatar &&
            <div className="mt-2" style={{backgroundColor: '#17a2b8', borderRadius: '8px', textAlign: 'center', width: '350px', height: '60px'}}>
              {profile.avatar && profile.avatar.list.slice(0,5).map((item, idx) => (
                <img key={idx} width="50" className="mt-1 mr-2" src={item} />
              ))}
            </div>
          }
        </div>
      </Fade>
    </div>
  )
}

export default FansRoom
