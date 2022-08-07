import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import * as theme from "../../../styles/theme";
import close_btn from "../../../assets/images/close-btn.png";
import { timeBefore } from "../../../lib/timeBefore";

interface IAlrimType {
	data: any;
	deleteAlrim: any;
	ReadAlrim: any;
}

const AlrimContent = ({ data, deleteAlrim, ReadAlrim }: IAlrimType) => {
	console.log(data);
	// notificationType에 따른 알림타입, 메세지 구분
	let notiType = "";
	let notiMsg = "";

	function regexTitle(content: string) {
		let regex_content = "";
		if (content.length > 3) {
			regex_content = content.substr(0, 3) + "...";
		} else {
			regex_content = content;
		}

		return '"' + regex_content + '"';
	}

	switch (data.notificationType) {
		case "commentWrite":
			notiType = "댓글";
			notiMsg = `${data.nickname}님이 ${regexTitle(
				data.content
			)} 댓글을 남겼습니다.`;
			break;
		case "meetingCommentWrite":
			notiType = "모임";
			notiMsg = `${data.nickname}님이 ${regexTitle(
				data.content
			)} 모임 게시물에 댓글을 남겼습니다.`;
			break;
		case "meetingJoinApproved":
			notiType = "모임";
			notiMsg = `${data.nickname}님이 ${regexTitle(
				data.meetingTitle
			)} 모임에 승인되셨습니다.`;
			break;
		case "meetingJoinDeclined":
			notiType = "모임";
			notiMsg = `${data.nickname}님이 ${regexTitle(
				data.meetingTitle
			)} 모임에 거절되셨습니다.`;
			break;
		case "meetingJoinedRequest":
			notiType = "모임";
			notiMsg = `${data.nickname}님이 ${regexTitle(
				data.meetingTitle
			)} 모임에 가입신청을 하였습니다.`;
			break;
		case "meetingPostWrite":
			notiType = "모임";
			notiMsg = `${data.nickname}님이 ${regexTitle(
				data.meetingTitle
			)} 모임에 글이 올라왔습니다.`;
			break;
		case "postLike":
			notiType = "게시판";
			notiMsg = `${data.nickname}님이 ${regexTitle(
				data.content
			)} 글에 좋아요를 하였습니다.`;
			break;
		default:
			notiType = "";
			notiMsg = "";
			break;
	}

	return (
		<Wrapper isChecked={data.checked}>
			<Thumbnail src={data.memberImgUrl} alt={data.postTitle} />
			<Info onClick={() => ReadAlrim(data.notificationId)}>
				<Top>
					<Type>{notiType}</Type>
					<Message>{notiMsg}</Message>
				</Top>
				<Bottom>
					{data.nickname && <Nickname>{data.nickname}</Nickname>}
					<Date>{timeBefore(data.createdDate)}</Date>
				</Bottom>
			</Info>
			<DeleteBtn
				onClick={() => deleteAlrim(data.notificationId)}
			></DeleteBtn>
		</Wrapper>
	);
};

export default AlrimContent;

const Wrapper = styled.div`
	width: 100%;
	padding: 10px;
	border: 2px solid #ddd;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: top;
	margin-bottom: 10px;
	position: relative;
	background-color: ${(props: { isChecked: boolean }) =>
		props.isChecked ? "#f0f0f0" : "#ffffff"};
`;

const Thumbnail = styled.img`
	width: 100px;
	height: 100px;

	@media screen and (max-width: 600px) {
		width: 50px;
		height: 50px;
	}
`;

const Info = styled.div`
	width: calc(100% - 110px);

	display: flex;
	flex-direction: column;
	justify-content: center;

	@media screen and (max-width: 600px) {
		width: calc(100% - 60px);
	}
`;

const Top = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	align-items: top;
	margin-bottom: 4px;
`;

const Type = styled.div`
	margin-left: 8px;
	margin-right: 8px;
	margin-bottom: 1px;
	font-size: 20px;
	font-weight: bold;
	color: ${theme.PrimaryColor};

	@media screen and (max-width: 600px) {
		width: 50px;
		font-size: 16px;
	}
`;

const Message = styled.div`
	font-size: 20px;
	line-height: 1.3;
	color: ${theme.TextConentColor};
	width: calc(100% - 100px);
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;

	word-break: keep-all;

	@media screen and (max-width: 600px) {
		font-size: 16px;
		width: calc(100% - 50px);
	}
`;

const Bottom = styled(Top)`
	margin-left: 8px;

	font-size: 16px;
	color: ${theme.TextSubColor};
	justify-content: start;

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;

const Nickname = styled.div`
	&::after {
		content: "|";
		display: inline-block;
		clear: both;
		margin: 0 4px;
	}
`;
const Date = styled.div``;

const DeleteBtn = styled.button`
	position: absolute;
	right: 10px;
	top: 10px;
	width: 20px;
	height: 20px;
	background: transparent url(${close_btn}) no-repeat center center;

	@media screen and (max-width: 600px) {
		width: 10px;
		height: 10px;
	}
`;
