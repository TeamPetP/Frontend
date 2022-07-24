import { String } from "aws-sdk/clients/apigateway";
import axios from "axios";

interface IPostRequestData {
  category: string;
  conditions: string;
  content: string;
  doName: string;
  imgUrlList: Array<string>;
  location: string;
  maxPeople: number;
  meetingType: string;
  period: string;
  sex: string;
  sigungu: string;
  title: string;
  isOpened?: boolean;
}

// 모임목록 전체조회
export const SearchMeetList = (
  user: any,
  page: number,
  size: number,
  urlParams: any
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/meetings?page=${page}&size=${size}&${urlParams}`, {
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

// 모임등록
export const CreateMeet = (user: any, postRequestData: IPostRequestData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/meetings`, postRequestData, {
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

// 모임 단건 조회
export const SearchMeet = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/meetings/${meetingId}`, {
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

// 모임수정
export const EditMeet = (
  user: any,
  meetingId: number,
  postRequestData: IPostRequestData
) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/meetings/${meetingId}`, postRequestData, {
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

// 모임 가입 요청
export const JoinMeet = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    console.log("모임 가입요청", user, meetingId);

    axios
      .post(`/meetings/${meetingId}`, null, {
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

// 모임 가입취소 요청
export const CancleJoinMeet = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/meetings/${meetingId}/cancel`, {
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

// 모임 탈퇴 요청
export const ResignMeet = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/meetings/${meetingId}/resign`, {
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

// 모임 게시글 전체 조회
export const GetBoardList = (
  user: any,
  meetingId: number,
  page: number,
  size: number
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/meetings/${meetingId}/meetingPosts?page=${page}&size=${size}`, {
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

interface IPostRequestData {
  content: string;
  title: string;
  imgUrlList: Array<string>;
}

// 모임 게시글 등록
export const CreateBoardPost = (
  user: any,
  meetingId: number,
  postRequestData: IPostRequestData
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/meetings/${meetingId}/meetingPosts`, postRequestData, {
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

// 모임 북마크등록
export const AddBookmark = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/meetings/${meetingId}/meetingBookmarks`, null, {
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

// 모임 북마크취소
export const CancleBookmark = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/meetings/${meetingId}/bookmark`, {
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

// 모임 사진첩 조회
export const GetGallery = (user: any, meetingId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/meetings/${meetingId}/images`, {
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
