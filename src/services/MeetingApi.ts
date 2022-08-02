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
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	return new Promise((resolve, reject) => {
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings?page=${page}&size=${size}&${urlParams}`,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임등록
export const CreateMeet = (user: any, postRequestData: IPostRequestData) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;

	return new Promise((resolve, reject) => {
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings`,
				postRequestData,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임 단건 조회
export const SearchMeet = (user: any, meetingId: number) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;

	return new Promise((resolve, reject) => {
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}`,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
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
		let user_regex = { ...user };
		delete user_regex.userAccessState;

		axios
			.put(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}`,
				postRequestData,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임 가입 요청
export const JoinMeet = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}`,
				null,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임 가입취소 요청
export const CancleJoinMeet = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.delete(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/cancel`,
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임 탈퇴 요청
export const ResignMeet = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.delete(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/resign`,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
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
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/meetingPosts?page=${page}&size=${size}`,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
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
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/meetingPosts`,
				postRequestData,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임 북마크등록
export const AddBookmark = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;

		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/meetingBookmarks`,
				null,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임 북마크취소
export const CancleBookmark = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.delete(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/bookmark`,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 모임 사진첩 조회
export const GetGallery = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;

		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/images`,
				{
					headers: user_regex,
				}
			)
			.then((e: any) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};
