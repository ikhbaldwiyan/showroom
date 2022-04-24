import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardImg, Card, CardText} from 'reactstrap';
import formatDescription from 'utils/formatDescription';

const ProfileModal = ({ buttonLabel, className, profile }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const text = {
    borderColor: '#24a2b7',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    color: 'black',
  };

  const header = {
    backgroundColor: 'teal',
    color: 'white',
  };

  return (
    <>
      <p style={{fontSize: 16, cursor: 'pointer'}} className={className} onClick={toggle}>
        {buttonLabel}
      </p>
      <Modal isOpen={modal}>
        <ModalHeader style={header} toggle={toggle}>
          {profile.room_name} Profile
        </ModalHeader>
        <ModalBody>
          <Card
            style={{
              borderColor: '#24a2b7',
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
            }}
            body
            outline
          >
            <CardImg
              top
              width="100%"
              src={profile.image_square}
              alt={profile.room_name}
              style={{ boxShadow: '3px 3px 3px 2px' }}
              className="mb-3"
            />
            <CardText style={text}>
              <div
                dangerouslySetInnerHTML={{ __html: formatDescription(profile) }}
              />
              {profile.avatar && <h4 className="mt-3">Avatar List</h4>}
              {profile.avatar &&
                profile.avatar.list.map((item, idx) => (
                  <img key={idx} width="60" className="mr-2" src={item} />
                ))}
              <Button
                href={profile.share_url_live}
                className="btn-block mt-2"
                style={{ backgroundColor: 'teal', border: 'none' }}
                target="_blank"
              >
                Open Showroom
              </Button>
              {profile.is_onlive ? (
                <Button className="btn-block mt-2" outline color="info">
                  Online
                </Button>
              ) : (
                <Button className="btn-block mt-2" color="danger" disabled>
                  Offline
                </Button>
              )}
            </CardText>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProfileModal;
