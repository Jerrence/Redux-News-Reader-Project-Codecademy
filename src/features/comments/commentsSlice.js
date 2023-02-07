// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadComments',
  async (id) => {
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json;
  }
);

// Create postCommentForArticleId here.
export const postCommentForArticleId = createAsyncThunk(
  'comments/postComment',
  async ({ articleId, comment }) => {
    const requestBody = JSON.stringify({comment: comment});
    const response = await fetch(`api/articles/${articleId}/comments`, {
      method: 'POST',
      body: requestBody
    });

    const json = await response.json();
    return json;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    // Add initial state properties here.
    // loadCommentsForArticleId
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,

    // postCommmentForArticleId
    createCommentIsPending: false,
    failedToCreateComment: false
  },
  // Add extraReducers here.
  // loadCommentsForArticleId
  extraReducers: {
    [loadCommentsForArticleId.pending]: (state, action) => {
      state.isLoadingComments = true;
      state.failedToLoadComments = false;
    },

    [loadCommentsForArticleId.fulfilled]: (state, action) => {
      state.byArticleId = {[action.payload.articleId]: action.payload.comments};
      state.isLoadingComments = false;
      state.failedToLoadComments = false;
    },

    [loadCommentsForArticleId.rejected]: (state, action) => {
      state.isLoadingComments = false;
      state.failedToLoadComments = true;
    },

    // postCommmentForArticleId
    [postCommentForArticleId.pending]: (state, action) => {
      state.createCommentIsPending = true;
      state.failedToCreateComment = false;
    },

    [postCommentForArticleId.fulfilled]: (state, action) => {
      const articleId = action.payload.articleId
      state.byArticleId[articleId].push(action.payload);

      state.createCommentIsPending = false;
      state.failedToCreateComment = false;
    },

[postCommentForArticleId.rejected]: (state, action) => {
      state.createCommentIsPending = false;
      state.failedToCreateComment = true;
    }
  }
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
