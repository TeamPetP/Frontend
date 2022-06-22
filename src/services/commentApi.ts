import axios from "axios";

export const CreateComment = (user: any, postId: number, content: string) => {
	axios
		.post(
			`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}/comments`,
			{
				content: content,
			},
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const CreateCommentReply = (
	user: any,
	commentId: number,
	content: string
) => {
	axios
		.post(
			`${process.env.REACT_APP_SERVER_API_URL}/comments/${commentId}`,
			{
				content: content,
			},
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const EditComment = (user: any, commentId: number, content: string) => {
	axios
		.put(
			`${process.env.REACT_APP_SERVER_API_URL}/comments/${commentId}`,
			{
				content: content,
			},
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const DeleteComment = (user: any, commentId: number) => {
	axios
		.delete(
			`${process.env.REACT_APP_SERVER_API_URL}/comments/${commentId}`,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const SearchComment = (user: any, postId: number) => {
	axios
		.get(
			`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}/comments`,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const LikeComment = (user: any, commentId: number) => {
	axios
		.patch(
			`${process.env.REACT_APP_SERVER_API_URL}/comments/${commentId}`,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};
