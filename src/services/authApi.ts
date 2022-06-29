import axios from "axios";
import { resolve } from "path";

export const SignUp = (
  user: any,
  nickname: string,
  introduce: string,
  setUser: any,
  closeEvent: any,
  setUserInfo: any
) => {
  console.log(
    {
      nickname: nickname,
      introduce: introduce,
    },
    user
  );
  axios
    .post(
      `/members`,
      {
        nickname: nickname,
        introduce: introduce,
      },
      {
        headers: user,
      }
    )
    .then((e) => {
      setUser({ ...user, userAccessState: true });
      console.log("test", e.data);
      setUserInfo(e.data);
      closeEvent();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const EditProfile = (user: any, nickname: string, introduce: string) => {
  axios
    .patch(
      `/members/me`,
      {
        nickname: nickname,
        introduce: introduce,
      },
      {
        headers: user,
      }
    )
    .then((e) => {
      console.log(e);
    });
};

export const DeleteAuth = (user: any) => {
  axios
    .delete(`/members/me`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 회원의 한줄 소개 조회
export const InfoData = (user: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/me/info`, {
        headers: user,
      })
      .then((e) => {
        console.log(e);
        resolve(e);
      });
  });
};

// 회원이 작성한 게시글 조회
export const MyPost = (user: any, page: number, size: number) => {
  console.log(
    {
      user: user,
    },
    user
  );
  axios
    .get(`/members/me/posts?page=${page}&size=${size}`, {
      headers: user,
    })
    .then(function (response) {
      console.log(`게시글 조회 성공인가?`, response);
      return response;
    })
    .catch(function (error) {
      console.log(`게시글 조회 에러다`, user, error);
    });
};

// 회원이 가입한 모임 조회
export const MyMeeting = (user: any, page: number, size: number) => {
  axios
    .get(`/members/me/meeting?page=${page}&size=${size}`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 내 모임에 신청 대기자 조회
export const MyMeetingWaitList = (user: any, meetingId: number) => {
  axios
    .get(`/members/me/meetings/${meetingId}`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 회원의 북마크 조회
export const MyBookmark = (user: any, page: number, size: number) => {
  axios
    .get(`/members/me/bookmark?page=${page}&size=${size}`, {
      headers: user,
    })
    .then(function (response) {
      console.log(`북마크 조회 성공인가?`, response);
      return response;
    })
    .catch(function (error) {
      console.log(`북마크 조회 에러다`, user, error);
    });
};

// 회원이 작성한 모임 게시글 조회
export const MyMeetingBoard = (user: any, page: number, size: number) => {
  axios
    .get(`/members/me/meetings/meetingPosts?page=${page}&size=${size}`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};
