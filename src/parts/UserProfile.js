import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardImg, Card, CardText } from 'reactstrap';

export default function UserProfile({ profile, user }) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleLogOut = () => {
        localStorage.clear()
        window.location.reload(false);

    }
    return (
        <>
            <a
                type="button"
                onClick={toggle}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <li className="row ml-2 button-dropdown">
                    <img
                        src={profile.image}
                        alt="profile"
                        style={{ width: "2.5rem", height: "2.5rem" }}
                        className="rounded-circle"
                    />{" "}
                    <div className="col ml-2 profile-link">
                        <span
                            className="row d-inline-block text-truncate"
                            style={{ maxWidth: "5rem" }}
                        >
                            {profile.name}
                        </span>
                        <span className="row" style={{ lineHeight: "0px" }}>
                            {user.user_id}
                        </span>
                    </div>
                </li>
            </a>

            <Modal isOpen={modal}>
                <ModalHeader toggle={toggle} className="text-dark">
                    Log Out
                </ModalHeader>
                <ModalBody className="text-dark my-2">
                    Apakah Anda yakin ingin logout ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Close
                    </Button>
                    <Button color="info" onClick={handleLogOut}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
