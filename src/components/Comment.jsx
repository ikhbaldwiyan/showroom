import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Card } from 'reactstrap';
import { API } from 'utils/api/api';

export default function Comment({roomId}) {
  const [comment, setComment] = useState([{
    name: 'Minzoid ',
    comment: 'Tunggu wots',
    avatar_url: "https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87"
  }]);

  useEffect(() => {
    async function getComments(){
      await axios.get(`${API}/lives/comments/${roomId}`).then(res => {
        const comments = res.data
        setTimeout(() => {
          setComment(comments)
        }, 2000);
      });
    } 
    getComments()
  }, [comment]);

  return (
    <Card body inverse color="dark" className="scroll">
      {comment && comment.length !== 0 && comment.map((item, idx) => (
        item.comment.length != '2' && item.comment.length != '1' && 
        <div key={idx}>
          <h5 style={styles.name}>
            <img src={item.avatar_url} width="25" alt={item.name} className="mr-2 mb-1" />
            {item.name} 
          </h5>
          <p style={styles.comment}>{item.comment}</p>
          <hr/>
        </div>
      ))}
    </Card>
  )
}

const styles = {
  name : {
    display: 'inline', 
    color: '#24a2b7', 
    fontWeight: 500, 
    fontSize: '18px'
  },
  comment : {
    fontSize: '15px'
  }
}
