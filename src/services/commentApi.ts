import axios from "axios";

export const CreateComment = (user: any, postId: number, content: string) => {
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
		.delete(
			`/comments/${commentId}`,
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
			`/posts/${postId}/comments`,
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
			`/comments/${commentId}`,
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};
