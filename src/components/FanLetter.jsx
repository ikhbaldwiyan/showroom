import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { API } from "utils/api/api";
import { gaEvent } from "utils/gaEvent";
import getSchedule from 'utils/getSchedule'

function FanLetter({ header, text, profile, roomId, theme, room_name }) {
	const [modal, setModal] = useState(false);
	const [fanLetter, setFanLetter] = useState([]);
	const toggle = () => {
		setModal(!modal)
		gaEvent("Profile", `${room_name?.replace('Room', '')}Fan Letter`, "Detail")
	};

	useEffect(() => {
		axios.get(`${API}/rooms/fan-letters/${roomId}`).then(res => {
			const data = res.data
			setFanLetter(data)
		});
	}, []);

	const ModalFanLetter = () => (
		<>
			<Button onClick={toggle} className="btn-block mt-2" color="info">Show More Message</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader style={header} toggle={toggle}>Fans Letter {room_name?.replace('Room', '')}</ModalHeader>
				<ModalBody className="scroll-fan-letter" style={{ backgroundColor: theme == 'dark' ? '#282C34' : '' }}>
					{fanLetter ? fanLetter.map((item, idx) => (
						<div key={idx}>
							<h5>
								<img
									width="30"
									className="mr-2"
									src={item.user.image}
								/>
								{item.user.name}
							</h5>
							<p style={{ fontWeight: '400', fontSize: 13, color: 'grey' }}>{getSchedule(item.created_at)}</p>
							<p>{item.comment}</p>
							<hr />
						</div>
					)) : (
						'No Message'
					)}
				</ModalBody>
			</Modal>
		</>
	)

	return (
		<div style={{ backgroundColor: theme == 'dark' ? '#282c34' : '' }}>
			<CardHeader style={header}>Fans Letter</CardHeader>
			<Card style={text} body outline>
				<CardText>
					{profile.recommend_comment_list ? profile.recommend_comment_list.map((item, idx) => (
						<div key={idx}>
							<h5>
								<img
									width="30"
									className="mr-2"
									src={item.user.image}
								/>
								{item.user.name}
							</h5>
							<p style={{ fontWeight: '400', fontSize: 13, color: 'grey' }}>{getSchedule(item.created_at)}</p>
							<p>{item.comment}</p>
							{hr(idx)}
						</div>
					)) : (
						'No Message'
					)}
					<ModalFanLetter />
				</CardText>
			</Card>
		</div>
	)
}

export default FanLetter

const hr = (idx) => {
	if (idx !== 2) {
		return <hr />
	}
}