import axios from "axios";

export const DeletePost = (user: any, postId: number) => {
	return new Promise((resolve, reject) => {
		axios
			.delete(`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`, {
				headers: user,
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
		axios
			.put(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`,
				postRequestData,
				{
					headers: user,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const CreatePost = (user: any, postRequestData: IPostRequestData) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/`,
				postRequestData,
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

export const SearchDetailPost = (user: any, postId: number) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`, {
				headers: user,
			})
			.then((e) => {
				resolve(e);
			});
	});
};

export const SearchPost = (user: any, page: number, tag: string) => {
	return new Promise((resolve, reject) => {
		console.log("aaa", user, page, tag);

		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/?page=${page}${
					tag ? `&tag=${tag}` : ""
				}&size=10`,
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log("tesaat", e);
				resolve(e);
			})
			.catch((e) => {
				console.log(e.response);
				reject(e);
			});
	});
};

export const LikePost = (user: any, postId: number) => {
	return new Promise((resolve, reject) => {
		console.log(user, postId);
		axios
			.patch(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`,
				{},
				{
					headers: user,
				}
			)
			.then((e) => {
				console.log(e);
				resolve(e.data);
			});
	});
};

export const BookmarkPost = (user: any, postId: number) => {
	axios
		.patch(`${process.env.REACT_APP_SERVER_API_URL}/bookmarks/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};
export const BookmarkDelete = (user: any, postId: number) => {
	axios
		.delete(`${process.env.REACT_APP_SERVER_API_URL}/bookmarks/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};
