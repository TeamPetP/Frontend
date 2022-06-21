import React, { useState } from "react";
import styled from "styled-components";
import withMain from "../../hocs/ui/withMain";
import { useNavigate } from "react-router";
import { useStores } from "../../hooks/useStores";
import { observer } from "mobx-react";
import * as theme from "../../styles/theme";
import user_profile from "../../assets/images/user_profile.png";
import Feed from "./index/Feed";
import Bookmark from "./index/Bookmark";

const IndexPage = observer(() => {
	const { userStore } = useStores();
	const navigate = useNavigate();

	const MoveAlrimPage = () => {
		navigate("/mypage/alrim");
	};
	const MoveMyMeetPage = () => {
		navigate("/mypage/myMeet");
	};
	const MoveAttentionMeetPage = () => {
		navigate("/mypage/attentionMeet");
	};

	// 클릭한 탭 구별
	const [selectedTabs, setSelectedTabs] = useState("feed");
	function setClickedTabs(e: any) {
		const role = e.target.dataset.role;
		setSelectedTabs(role);
	}
	return (
		<Wrapper>
			<Padding>
				<MyInfo>
					<ProfileWrap>
						{userStore.info.imgUrl &&
						userStore.info.imgUrl.length > 0 ? (
							<ProfileImg src={userStore.info.imgUrl} />
						) : (
							<ProfileImg src={user_profile} alt="프로필이미지" />
						)}

						<MyActivity
							count={4}
							title="알림"
							onPageChange={MoveAlrimPage}
						/>
						<MyActivity
							count={2}
							title="내모임"
							onPageChange={MoveMyMeetPage}
						/>
						<MyActivity
							count={3}
							title="관심모임"
							onPageChange={MoveAttentionMeetPage}
						/>
					</ProfileWrap>
					<NickName>{userStore.getName}</NickName>
					<Intro>안녕하세요.</Intro>
				</MyInfo>
				<EditProfile>프로필 편집</EditProfile>
			</Padding>
			<TabsWrap>
				<Tab
					onClick={setClickedTabs}
					data-role="feed"
					page="feed"
					selectedTabs={selectedTabs}
				>
					피드
				</Tab>
				<Tab
					onClick={setClickedTabs}
					data-role="bookmark"
					page="bookmark"
					selectedTabs={selectedTabs}
				>
					북마크
				</Tab>
			</TabsWrap>
			<div>
				{selectedTabs === "feed" && <Feed />}
				{selectedTabs === "bookmark" && <Bookmark />}
			</div>
			<input
				onChange={(value) => {
					userStore.setName(value.target.value);
				}}
			/>
		</Wrapper>
	);
});

interface ITitleType {
	count: number;
	title: string;
	onPageChange: any;
}

const MyActivity = ({ count, title, onPageChange }: ITitleType) => {
	return (
		<Activity onClick={() => onPageChange()}>
			<Count>{count}</Count>
			<Title>{title}</Title>
		</Activity>
	);
};

export default withMain(IndexPage, "마이페이지");

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const Padding = styled.div`
	padding: 0 20px;
`;

const MyInfo = styled.div`
	padding: 25px 40px;
`;

const Activity = styled.div`
	text-align: center;
	cursor: pointer;
`;

const Count = styled.div`
	font-size: 22px;
	font-weight: bold;
	color: #000;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 400;
	color: #000;
`;

const ProfileWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ProfileImg = styled.img`
	width: 90px;

	border-radius: 100%;
`;

const NickName = styled.div`
	margin-top: 20px;
	font-size: 24px;
	font-weight: bold;
`;

const Intro = styled.div`
	font-size: 20px;
`;

const EditProfile = styled.button`
	color: ${theme.PrimaryColor};
	border: 1px solid ${theme.SecondaryColor};
	border-radius: 3px;
	width: 100%;
	height: 50px;
	display: block;
	font-size: 20px;
`;

const TabsWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Tab = styled.div`
	width: 50%;
	padding: 20px;
	font-size: 20px;
	text-align: center;
	line-height: 24px;
	cursor: pointer;
	transition: all 200ms ease;
	border-bottom: ${(props: { selectedTabs: string; page: string }) =>
		props.selectedTabs === props.page
			? `2px solid ${theme.PrimaryColor}`
			: "2px solid #EBEBEB"};
	color: ${(props: { selectedTabs: string; page: string }) =>
		props.selectedTabs === props.page ? `${theme.PrimaryColor}` : "#000"};
	font-weight: ${(props: { selectedTabs: string; page: string }) =>
		props.selectedTabs === props.page ? 600 : 500};

	&:hover {
		color: ${theme.PrimaryColor};
	}
`;
