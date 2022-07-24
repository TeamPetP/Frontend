import axios from "axios";

export const CreateComment = (user: any, postId: number, content: string) => {
  return new Promise((resolve) => {
    axios
      .post(
        `/posts/${postId}/comments`,
        {
          content: content,
        },
        {
          headers: user,
        }
      )
      .then((e) => {
        resolve(e);
      });
  });
};

export const CreateCommentReply = (
  user: any,
  postId: number,
  commentId: number,
  content: string
) => {
  return new Promise((resolve) => {
    axios
      .post(
        `/posts/${postId}/comments/${commentId}`,
        {
          content: content,
        },
        {
          headers: user,
        }
      )
      .then((e) => {
        resolve(e);
      });
  });
};

export const EditComment = (user: any, commentId: number, content: string) => {
  axios
    .put(
      `/comments/${commentId}`,
      {
        content: content,
      },
      {
        headers: user,
      }
    )
    .then((e) => {
      console.log(e);
    });
};

export const DeleteComment = (user: any, commentId: number) => {
  axios
    .delete(`/comments/${commentId}`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

export const SearchComment = (user: any, postId: number) => {
  console.log(user, postId);
  return new Promise((resolve) => {
    axios
      .get(`/posts/${postId}/comments`, {
        headers: user,
      })
      .then((e) => {
        resolve(e);
      });
  });
};

export const LikeComment = (user: any, commentId: number) => {
  axios
    .patch(`/comments/${commentId}`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

export const SearchMeetingBoardComment = (
  user: any,
  meetingId: number,
  meetingPostId: number
) => {
  return new Promise((resolve) => {
    axios
      .get(
        `/meetings/${meetingId}/meetingPosts/${meetingPostId}/meetingComments`,
        {
          headers: user,
        }
      )
      .then((e) => {
        resolve(e);
      });
  });
};

export const CreateMeetingBoardCommentReply = (
  user: any,
  meetingId: number,
  meetingPostId: number,
  meetingCommentId: number,
  content: string
) => {
  return new Promise((resolve) => {
    axios
      .post(
        `/meetings/${meetingId}/meetingPosts/${meetingPostId}/meetingComments/${meetingCommentId}`,
        {
          content: content,
        },
        {
          headers: user,
        }
      )
      .then((e) => {
        resolve(e);
      });
  });
};

export const CreateMeetingBoardComment = (
  user: any,
  meetingId: number,
  meetingPostId: number,
  content: string
) => {
  return new Promise((resolve) => {
    axios
      .post(
        `/meetings/${meetingId}/meetingPosts/${meetingPostId}/meetingComments`,
        {
          content: content,
        },
        {
          headers: user,
        }
      )
      .then((e) => {
        resolve(e);
      });
  });
};
