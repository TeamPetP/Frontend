import axios from "axios";

export const CreateComment = (user: any, postId: number, content: string) => {
	return new Promise((resolve) => {
		axios
			.post(
				`/posts/${postId}/comments`,
				{
					content: content,
				},
				{
					headers: user,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const CreateCommentReply = (
	user: any,
	postId: number,
	commentId: number,
	content: string
) => {
	return new Promise((resolve) => {
		axios
			.post(
				`/posts/${postId}/comments/${commentId}`,
				{
					content: content,
				},
				{
					headers: user,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const EditComment = (user: any, commentId: number, content: string) => {
	axios
		.put(
			`/comments/${commentId}`,
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
		.delete(`/comments/${commentId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};

export const SearchComment = (user: any, postId: number) => {
	console.log(user, postId);
	return new Promise((resolve) => {
		axios
			.get(`/posts/${postId}/comments`, {
				headers: user,
			})
			.then((e) => {
				resolve(e);
			});
	});
};

export const LikeComment = (user: any, commentId: number) => {
	axios
		.patch(`/comments/${commentId}`, {
			headers: user,
		})
		.then((e) => {
			console.log(e);
		});
};
