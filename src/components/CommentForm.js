import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCommentIsPending,
  postCommentForArticleId
} from '../features/comments/commentsSlice';

export default function CommentForm({ articleId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  
  // Declare isCreatePending here.
  const isCreatePending = useSelector(createCommentIsPending);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch your asynchronous action here!
    console.log(comment)
    dispatch (
      postCommentForArticleId ({
        articleId: articleId,
        comment: comment
      })
    );

    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for='comment' className='label'>
        Add Comment:
      </label>
      <div id='input-container'>
        <input
          id='comment'
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          type='text'
          required
        />
        <button
          
          className='comment-button'
          disabled={isCreatePending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
