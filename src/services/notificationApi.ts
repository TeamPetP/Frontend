import axios from "axios";

// 회원 알림 조회
export const SearchAlrim = (user: any) => {
	return new Promise((resolve) => {
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/notifications`,
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log(e);
				resolve(e);
			});
	});
};

// 회원 알림 전체 갱신
export const CheckedAllAlrim = (user: any) => {
	return new Promise((resolve) => {
		axios
			.patch(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/notifications`,
				{},
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log(e);
				resolve(e);
			});
	});
};

// 회원 알림 단건 갱신
export const CheckedAlrim = (user: any, notificationId: number) => {
	return new Promise((resolve) => {
		axios
			.patch(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/notifications/${notificationId}`,
				{},
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log(e);
				resolve(e);
			});
	});
};

// 회원의 모든 알림 삭제
export const DeleteAllAlrim = (user: any) => {
	return new Promise((resolve) => {
		axios
			.delete(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/notifications`,
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log(e);
				resolve(e);
			});
	});
};

// 알림 단건 삭제
export const DeleteAlrim = (user: any, notificationId: number) => {
	return new Promise((resolve) => {
		axios
			.delete(
				`${process.env.REACT_APP_SERVER_API_URL}/notification/${notificationId}`,
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log("Sf", e);
				resolve(e);
			});
	});
};

// 회원의 안 읽은 알림 개수
export const CountAlrim = (user: any) => {
	return new Promise((resolve) => {
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/members/me/notifications/count`,
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log(e);
				resolve(e);
			});
	});
};
