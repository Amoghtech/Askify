import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
const CommentItem = ({
  postid,
  comment: { _id, text, name, avatar, user, date },
  
}) => {
const dispatch=useDispatch()

const auth=useSelector((state)=>state.auth);
  return <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img class='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p class='my-1'>{text}</p>
      <p class='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => dispatch(deleteComment(postid, _id))}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times'></i>
        </button>
      )}
    </div>
  </div>
};

export default CommentItem;

// 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
