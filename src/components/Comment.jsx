import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Card } from 'reactstrap';
import { comments } from 'utils/api/api';

export default function Comment({roomId}) {
  const [comment, setComment] = useState([{
    name: 'Minzoid ',
    comment: 'Tunggu wots',
    avatar_url: "https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87"
  }]);

  useEffect(() => {
    axios.get(comments(roomId)).then(res => {
      const comments = res.data.comment_log
      setComment(comments)
    });
  }, [comment]);

  return (
    <Card body inverse color="dark" className="scroll">
      {comment.map((item, idx) => (
        item.comment.length != '2' && item.comment.length != '1' && 
        <>
          <h5 key={idx} className="text-gray-200">
            <img width="30" className="mr-2" src={item.avatar_url} alt={item.name} />
            {item.name}
          </h5>
          <p>{item.comment}</p>
          <hr/>
        </>
      ))}
    </Card>
  )
}
