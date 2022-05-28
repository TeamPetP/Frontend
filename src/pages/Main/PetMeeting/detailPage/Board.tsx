import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../../hooks/useStores';
import withMain from '../../../../hocs/ui/withMain';
import styled from 'styled-components';
import * as theme from '../../../../styles/theme';
import user_profile from '../../../../assets/images/user_profile.png';
import DefaultImg from '../../../../components/common/DefaultImg';
import Tag from '../../../../components/PetMeeting/common/Tag';
import BookmarkButton from '../../../../components/PetMeeting/common/BookmarkButton';
import MeetCondition from '../../../../components/PetMeeting/common/MeetCondition';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding: 10px;
`;

const Board = observer(() => {
	const { userStore } = useStores();
	const [isBookmark, setIsBookmark] = useState(false);
	const [status, setStatus] = useState(false);

	return (
		<Meeting>
			<Creator>
				<CreatorThumbnail src={user_profile} />
				<div>
					<Nickname>{userStore.getName}</Nickname>
					<div>
						<Place>서울시 마포구</Place>
						<CreateTime>3시간전</CreateTime>
					</div>
				</div>
			</Creator>
			<MeetCondition
				status={status}
				meetTitle="수제간식 원데이클래스 같이 하실 분!"
				age="20~30대만"
				date="5월 7일 오후 2시"
				personnel={2}
			/>
			{/* <MeetThumbnail src={}/> */}
			<DefaultImg />
			<Content>
				aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
				<br />
				aaaaaaa
			</Content>
			<Line />
			<Member>
				<Members>
					참여중인 친구
					<MemberLength>2/3</MemberLength>
				</Members>
				<div>
					<MemberThumbnail src={user_profile} />
					<MemberThumbnail src={user_profile} />
				</div>
			</Member>
			<ButtonWrap>
				<SubmitBtn>관심 꾸-욱zzz</SubmitBtn>
				<SubmitBtn>참여 신청</SubmitBtn>
			</ButtonWrap>
		</Meeting>
	);
});

export default Board;

const Meeting = styled.div`
	padding: 20px;
	background-color: #fff;
	box-sizing: border=box;
	margin-bottom: 20px;
	cursor: pointer;
	transition: ${theme.Transition};

	&:last-child {
		margin-bottom: 0;
	}
`;

const Options = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Tags = styled.div`
	justify-content: start;
`;

const Creator = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 20px 0;
	box-sizing: border-box;
`;

const CreatorThumbnail = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 15px;
	overflow: hidden;
`;

const Content = styled.div`
	line-height: 1.5;
	font-weight: noraml;
`;

const Nickname = styled.span`
	font-size: 20px;
	font-weight: bold;
	color: #000;
`;

const Place = styled.span`
	font-weight: noraml;
	font-size: 16px;
	&::after {
		content: '|';
		display: inline-block;
		clear: both;
		margin: 0 8px;
	}
`;

const CreateTime = styled.span`
	font-size: 16px;
	color: ${theme.TextSubColor};
`;

const Member = styled.div`
	& img {
		margin-right: 8px;
	}
`;

const MemberThumbnail = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 15px;
	overflow: hidden;
`;

const Line = styled.div`
	background-color: #cfcfcf;
	height: 1px;
	margin: 20px 0;
`;

const Members = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

const MemberLength = styled.span`
	color: ${theme.PrimaryColor};
	padding-left: 12px;
`;

const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`;
const SubmitBtn = styled.button`
	background-color: ${theme.PrimaryColor};
	color: #fff;
	border-radius: 5px;
	font-size: 26px;
	font-family: ${theme.jalnan};
	display: block;
	width: calc(50% - 5px);
	padding: 8px;
`;
