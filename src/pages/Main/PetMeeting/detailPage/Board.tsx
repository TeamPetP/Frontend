import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../../hooks/useStores';
import Comment from '../../../../components/common/Comment';
import styled from 'styled-components';
import * as theme from '../../../../styles/theme';
import user_profile from '../../../../assets/images/user_profile.png';
import SampleImg from '../../../../assets/images/bg1.png';

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
			<BoardContent>
				<BoardTitle>수제간식 원데이클래스 재밌었어요!</BoardTitle>
				<ContentImg>
					<img src={SampleImg} alt="활동사진" />
					<img src={SampleImg} alt="활동사진" />
					<img src={SampleImg} alt="활동사진" />
				</ContentImg>
				<Content>
					aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
					<br />
					aaaaaaa
				</Content>
			</BoardContent>
			<Comment />
		</Meeting>
	);
});

export default Board;

const Meeting = styled.div`
	padding: 10px 20px;
	background-color: #fff;
	box-sizing: border-box;
	cursor: pointer;
	transition: ${theme.Transition};
	border-bottom : 1px solid ${theme.SecondaryColor};

	&:last-child {
		margin-bottom: 0;
		border-bottom: 0;
	}
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

const BoardTitle = styled.div`
font-size:20px;
font-weight: 500;
color: #000;
margin-bottom: 16px;
`;

const BoardContent =styled.div``;

const ContentImg = styled.div`
& img{
	width: 72px;
	margin-right: 8px;
	border: 1px solid black;
	box-sizing: border-box;
}
margin-bottom: 16px;
`;
