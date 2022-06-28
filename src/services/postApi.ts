import axios from "axios";

export const DeletePost = (user: any, postId: number) => {
	axios
		.delete(`/posts/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
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
	axios
		.put(
			`/posts/${postId}`,
			postRequestData,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const CreatePost = (user: any, postRequestData: IPostRequestData) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`/posts/`,
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
	axios
		.get(`/posts/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};

export const SearchPost = (user: any, page: number, tag?: string) => {
	return new Promise((resolve, reject) => {
		console.log("aaa", user);
		axios
			.get(
				`/posts/?page=${page}&tag=${tag}&size=10`,
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
	axios
		.patch(`/posts/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};

export const BookmarkPost = (user: any, postId: number) => {
	axios
		.patch(`/bookmarks/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};
export const BookmarkDelete = (user: any, postId: number) => {
	axios
		.delete(`/bookmarks/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};
