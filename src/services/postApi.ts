import axios from "axios";

export const DeletePost = (user: any, postId: number) => {
	axios
		.delete(`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`, {
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
			`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`,
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
		});
};

export const SearchDetailPost = (user: any, postId: number) => {
	axios
		.post(`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};

export const SearchPost = (user: any, page: number, tag: string) => {
	axios
		.post(
			`${process.env.REACT_APP_SERVER_API_URL}/posts/?page=${page}&tag=${tag}`,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const LikePost = (user: any, postId: number) => {
	axios
		.patch(`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
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
