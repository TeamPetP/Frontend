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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
        resolve(e);
      })
      .catch((e) => {
        console.log(e.response);
        reject(e);
      });
  });
};