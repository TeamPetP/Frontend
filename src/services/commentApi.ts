import axios from "axios";

export const CreateComment = (user: any, postId: number, content: string) => {
	return new Promise((resolve) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}/comments`,
				{
					content: content,
				},
				{
					headers: user_regex,
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
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}/comments/${commentId}`,
				{
					content: content,
				},
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const EditComment = (user: any, commentId: number, content: string) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios
		.put(
			`${process.env.REACT_APP_SERVER_API_URL}/comments/${commentId}`,
			{
				content: content,
			},
			{
				headers: user_regex,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const DeleteComment = (user: any, commentId: number) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios
		.delete(
			`${process.env.REACT_APP_SERVER_API_URL}/comments/${commentId}`,
			{
				headers: user_regex,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const SearchComment = (user: any, postId: number) => {
	console.log(user, postId);
	return new Promise((resolve) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/posts/${postId}/comments`,
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const LikeComment = (user: any, commentId: number) => {
	let user_regex = { ...user };
	delete user_regex.userAccessState;
	axios
		.patch(
			`${process.env.REACT_APP_SERVER_API_URL}/comments/${commentId}`,
			{
				headers: user_regex,
			}
		)
		.then((e) => {
			console.log(e);
		});
};

export const SearchMeetingBoardComment = (
	user: any,
	meetingId: number,
	meetingPostId: number
) => {
	return new Promise((resolve) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.get(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/meetingPosts/${meetingPostId}/meetingComments`,
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const CreateMeetingBoardCommentReply = (
	user: any,
	meetingId: number,
	meetingPostId: number,
	meetingCommentId: number,
	content: string
) => {
	return new Promise((resolve) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/meetingPosts/${meetingPostId}/meetingComments/${meetingCommentId}`,
				{
					content: content,
				},
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};

export const CreateMeetingBoardComment = (
	user: any,
	meetingId: number,
	meetingPostId: number,
	content: string
) => {
	return new Promise((resolve) => {
		let user_regex = { ...user };
		delete user_regex.userAccessState;
		axios
			.post(
				`${process.env.REACT_APP_SERVER_API_URL}/meetings/${meetingId}/meetingPosts/${meetingPostId}/meetingComments`,
				{
					content: content,
				},
				{
					headers: user_regex,
				}
			)
			.then((e) => {
				resolve(e);
			});
	});
};
