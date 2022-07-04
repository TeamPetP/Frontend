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
