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
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios
		.post(
			`${process.env.REACT_APP_SERVER_API_URL}/members`,
			{
				nickname: nickname,
				introduce: introduce,
			},
			{
				headers: user_regex,
			}
		)
		.then((e) => {
			setUser({ ...user_regex, userAccessState: true });
			setUserInfo(e.data);
			closeEvent();
		});
};

export const EditProfile = (user: any, nickname: string, introduce: string) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios.patch(
		`${process.env.REACT_APP_SERVER_API_URL}/members/me`,
		{
			nickname: nickname,
			introduce: introduce,
		},
		{
			headers: user_regex,
		}
	);
};

export const DeleteAuth = (user: any) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios.delete(`${process.env.REACT_APP_SERVER_API_URL}/members/me`, {
		headers: user_regex,
	});
};

// 회원의 알림, 내 모임, 관심모임 갯수
export const InfoData = (user: any) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(`${process.env.REACT_APP_SERVER_API_URL}/members/me/info`, {
				headers: user_regex,
			})
			.then((e) => {
				resolve(e);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// 회원이 작성한 게시글 조회
export const MyPost = (user: any, page: number, size: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/posts?page=${page}&size=${size}`,
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
export const MyLikePost = (user: any, page: number, size: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/likes?page=${page}&size=${size}`,
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

// 회원이 가입한 모임 조회
export const MyMeeting = (user: any, page: number, size: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/meetings?page=0&size=2000`,
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

// 회원이 가입신청한 모임 조회
export const MyMeetingWait = (user: any, page: number, size: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/meetings/apply?page=0&size=2000`,
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

// 내 모임에 신청 대기자 조회
export const MyMeetingWaitList = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/meetings/${meetingId}`,
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

// 회원의 북마크 조회
export const MyBookmark = (user: any, page: number, size: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/bookmark?page=${page}&size=${size}`,
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

// 회원의 북마크 조회
export const MyBookmarkPetpMetting = (user: any) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/meetingBookmark?page=0&size=2000`,
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

// 회원이 작성한 모임 게시글 조회
export const MyMeetingBoard = (user: any, page: number, size: number) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios
		.get(
			`${process.env.REACT_APP_SERVER_API_URL}/members/me/meetings/meetingPosts?page=${page}&size=${size}`,
			{
				headers: user_regex,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

// 내 모임에 신청 대기자 조회
export const MyMeetWaitPartiList = (user: any, meetingId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/meetings/${meetingId}`,
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

// 모임 가입 승인
export const AcceptJoinMeet = (
	user: any,
	meetingId: number,
	memberId: number
) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/members/${memberId}/approve`,
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

// 모임 가입 거절
export const RefuseJoinMeet = (
	user: any,
	meetingId: number,
	memberId: number
) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.delete(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/members/${memberId}/decline`,
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

// 모임 추방
export const ExileMeet = (user: any, meetingId: number, memberId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.delete(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/members/${memberId}/expel`,
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
