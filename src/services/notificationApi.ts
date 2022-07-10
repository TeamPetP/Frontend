import axios from "axios";

// 회원 알림 조회
export const SearchAlrim = (user: any) => {
  axios
    .get(`/members/me/notifications`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 회원 알림 전체 갱신
export const CheckedAllAlrim = (user: any) => {
  axios
    .patch(`/members/me/notifications`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 회원 알림 단건 갱신
export const CheckedAlrim = (user: any, notificationId: number) => {
  axios
    .patch(`/members/me/notifications/${notificationId}`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 회원의 모든 알림 삭제
export const DeleteAllAlrim = (user: any) => {
  axios
    .delete(`/members/me/notifications`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 알림 단건 삭제
export const DeleteAlrim = (user: any, notificationId: number) => {
  axios
    .delete(`/notifications/${notificationId}`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};

// 회원의 안 읽은 알림 개수
export const CountAlrim = (user: any) => {
  axios
    .get(`/members/me/notifications/count`, {
      headers: user,
    })
    .then((e) => {
      console.log(e);
    });
};
