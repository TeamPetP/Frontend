import axios from "axios";

export const DeletePost = (user: any, postId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.delete(`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`, {
				headers: user_regex,
			})
			.then((e) => {
				resolve(e);
			});
	});
};
interface IPostRequestData {
	content: string;
	tagList: Array<string>;
	imgUrlList: Array<string>;
}
export const EditPost = (
	user: any,
	postId: number,
	postRequestData: IPostRequestData
) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.put(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`,
				postRequestData,
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const CreatePost = (user: any, postRequestData: IPostRequestData) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/`,
				postRequestData,
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const SearchDetailPost = (user: any, postId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`, {
				headers: user_regex,
			})
			.then((e) => {
				resolve(e);
			});
	});
};

export const SearchPost = (user: any, page: number, tag: string) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/?page=${page}${
					tag ? `&tag=${tag}` : ""
				}&size=10`,
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

export const LikePost = (user: any, postId: number) => {
	return new Promise((resolve, reject) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.patch(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`,
				{},
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e.data);
			});
	});
};

export const BookmarkPost = (user: any, postId: number) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios
		.patch(`${process.env.REACT_APP_SERVER_API_URL}/bookmarks/${postId}`, {
			headers: user_regex,
		})
		.then((e) => {});
};
export const BookmarkDelete = (user: any, postId: number) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios
		.delete(`${process.env.REACT_APP_SERVER_API_URL}/bookmarks/${postId}`, {
			headers: user_regex,
		})
		.then((e) => {
			console.log(e);
		});
};
