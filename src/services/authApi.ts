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

export const MyPost = (user: any, page: number, size: number) => {
	axios
		.get(
			`/members/me/post?page=${page}&size=${size}`,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const MyMeeting = (user: any, page: number, size: number) => {
	axios
		.get(
			`/members/me/meeting?page=${page}&size=${size}`,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};
