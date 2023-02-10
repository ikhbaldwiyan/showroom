import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Card } from 'reactstrap';
import { API, SEND_COMMENT } from 'utils/api/api';
import Skeleton from 'react-content-loader'

export default function Comment({ roomId }) {
  const [comment, setComment] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      await axios.get(`${API}/lives/comments/${roomId}`).then(res => {
        const comments = res.data
        setTimeout(() => {
          setComment(comments)
        }, 2000);
      });
    }
    getComments()
  }, [comment]);

  // const sendComment = async (e) => {
  //   e.preventDefault();
  //   setButtonLoading(true);
  //   try {
  //     const response = await axios.post(SEND_COMMENT, {
  //       live_id: names.live_id,
  //       room_url_key: names.room_url_key,
  //       comment: comment,
  //       csrf: session.csrf_token,
  //       cookies_id: session.cookie_login_id,
  //     });
  //     setButtonLoading(false);
  //     console.log(response.data);

  //     setComment('')
  //   } catch (err) {
  //     setButtonLoading(false);
  //   }
  // };

  const LoadingMessage = () => (
    <>
      <h5 style={styles.name}>
        <img src="https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87" width="30" className="mr-2 mb-1" />
        Tunggu Wots
        <img src="https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87" width="30" className="ml-2 mb-1" />
      </h5>
      <hr />
    </>
  );

  const CommentList = () => (
    Array.from(Array(7), (e, i) => {
      return (
        <div>
          <Skeleton viewBox="0 0 300 100" height={90} width={200} backgroundColor="#D1D7E0">
            <rect x="70" y="10" rx="4" ry="4" width="170" height="10" />
            <rect x="70" y="30" rx="3" ry="3" width="200" height="10" />
            <circle cx="25" cy="25" r="25" />
          </Skeleton>
        </div>
      )
    })
  );

  // const WriteComment = () => {
  //   return (
  //     <div>
  //       <form
  //         onSubmit={sendComment}
  //       // style={{ width: 300, display: "flex" }}
  //       >
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="exampleInputEmail1"
  //           placeholder="Comment"
  //           value={comment}
  //           onChange={(e) => setComment(e.target.value)}
  //         />
  //         <button
  //           type="submit"
  //           className="btn btn-secondary rounded-0"
  //           disabled={buttonLoading ? true : false}
  //         >
  //           {buttonLoading ? "....." : "Send"}
  //         </button>
  //       </form>
  //     </div>
  //   )
  // }

  return (
    <Card body inverse color="dark" className="scroll">
      {comment && comment.length !== 0 ? comment.map((item, idx) => (
        item.comment.length != '2' && item.comment.length != '1' &&
        <div key={idx}>
          <h5 style={styles.name}>
            <img src={item.avatar_url} width="25" alt={item.name} className="mr-2 mb-1" />
            {item.name}
          </h5>
          <p style={styles.comment}>{item.comment}</p>
          <hr />
        </div>
      )) : (
        <div>
          <LoadingMessage />
          <CommentList />
        </div>
      )}
    </Card>
  )
}

const styles = {
  name: {
    display: 'inline',
    color: '#24a2b7',
    fontWeight: 500,
    fontSize: '17px'
  },
  comment: {
    marginTop: 6,
    fontSize: '15px'
  }
}
