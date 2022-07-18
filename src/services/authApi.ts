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

// 회원의 알림, 내 모임, 관심모임 갯수
export const InfoData = (user: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/me/info`, {
        headers: user,
      })
      .then((e) => {
        console.log("/members/me/info", e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};

// 회원이 작성한 게시글 조회
export const MyPost = (user: any, page: number, size: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/me/posts?page=${page}&size=${size}`, {
        headers: user,
      })
      .then((e) => {
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};

// 회원이 가입한 모임 조회
export const MyMeeting = (user: any, page: number, size: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/me/meetings?page=${page}&size=${size}`, {
        headers: user,
      })
      .then((e) => {
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};

// 회원이 가입신청한 모임 조회
export const MyMeetingWait = (user: any, page: number, size: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/me/meetings/apply?page=${page}&size=${size}`, {
        headers: user,
      })
      .then((e) => {
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
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
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/me/bookmark?page=${page}&size=${size}`, {
        headers: user,
      })
      .then((e) => {
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
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

// 내 모임에 신청 대기자 조회
export const MyMeetWaitPartiList = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/me/meetings/${meetingId}`, {
        headers: user,
      })
      .then((e: any) => {
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};

// 모임 가입 승인
export const AcceptJoinMeet = (
  user: any,
  meetingId: number,
  memberId: number
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/meetings/${meetingId}/members/${memberId}/approve`, null, {
        headers: user,
      })
      .then((e: any) => {
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};

// 모임 가입 거절
export const RefuseJoinMeet = (
  user: any,
  meetingId: number,
  memberId: number
) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/meetings/${meetingId}/members/${memberId}/decline`, {
        headers: user,
      })
      .then((e: any) => {
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};

// 모임 추방
export const ExileMeet = (user: any, meetingId: number, memberId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/meetings/${meetingId}/members/${memberId}/expel`, {
        headers: user,
      })
      .then((e: any) => {
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};
