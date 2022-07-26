import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import withMain from "../../hocs/ui/withMain";
import { useStores } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";
import PageTitle from "../../components/common/PageTitle";
import Tag from "../../components/common/Tag";
import BookmarkButton from "../../components/common/BookmarkButton";
import MeetCondition from "../../components/common/MeetCondition";
import { UserContext } from "../../contexts/UserContext";

import { MyBookmarkPetpMetting } from "../../services/authApi";
import { timeBefore } from "../../lib/timeBefore";

const AttentionMeetPage = observer(() => {
	const { userStore } = useStores();
	const navigate = useNavigate();
	const [isBookmark, setIsBookmark] = useState(false);
	const [status, setStatus] = useState(false);

	const { user } = useContext(UserContext);
	const [petpListData, setPetPListData] = useState<any>([]);

	function category(category: string): string {
		switch (category) {
			case "PICTURE":
				return "사진 공유";
			case "WALK":
				return "산책";
			case "VOLUNTEER":
				return "봉사";
			case "CLASS":
				return "클래스/수업";
			case "TRAINING":
				return "교육/훈련";
			case "AMITY":
				return "친목/모임";
			case "ETC":
				return "기타";
			default:
				return "";
		}
	}

	useEffect(() => {
		async function fetchData() {
			console.log("test", user);
			const d: any = await MyBookmarkPetpMetting(user);
			console.log("Daatㅇa", d.data.content);
			setPetPListData(() => d.data.content);
		}
		fetchData();
	}, [user]);

	const moveDetailPage = (id: number) => {
		navigate(`/meeting/detail?id=${id}`);
	};

	function DueDate(e: any) {
		const date1 = new Date(new Date().toString());
		const date2 = new Date(e.period);

		const diffDate = date1.getTime() - date2.getTime();

		let meetingOpenDueDate = Math.abs(diffDate / (1000 * 60 * 60 * 24))
			.toString()
			.split(".");

		return meetingOpenDueDate[0];
	}

	return (
		<Wrapper>
			<PageTitle title="관심모임" />
			<List>
				{petpListData.map((e: any) => {
					return (
						<>
							<Meeting
								onClick={() => moveDetailPage(e.meetingId)}
							>
								<Options>
									<Tags>
										<Tag
											color={theme.PrimaryColor}
											text={
												e.meetingType === "REGULAR"
													? "상시"
													: `D-${DueDate(e)}`
											}
										/>
										<Tag text={category(e.category)} />
									</Tags>
									<BookmarkButton isBookmark={isBookmark} />
								</Options>
								<MeetCondition
									status={status}
									meetTitle={e.title}
									conditions={e.conditions}
									date={e.period}
									personnel={e.joinPeople}
									// memberId={e.memberId}
									sex={e.sex}
								/>
								<Content>{e.content}</Content>
								<Bottom>
									<div>
										<Nickname>{e.nickname}</Nickname>
										<Place>
											{e.doName}
											{e.doName !== "전체" && e.sigungu}
										</Place>
									</div>
									<CreateTime>
										{timeBefore(e.createDate)}
									</CreateTime>
								</Bottom>
							</Meeting>
						</>
					);
				})}
			</List>
			<input
				onChange={(value) => {
					userStore.setName(value.target.value);
				}}
			/>
		</Wrapper>
	);
});

export default withMain(AttentionMeetPage, "마이페이지");

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const List = styled.div`
	padding: 10px 40px;

	@media screen and (max-width: 600px) {
		padding: 10px;
	}
`;

const Meeting = styled.div`
	padding: 20px;
	background-color: #fff;
	border: 1px solid ${theme.PrimaryColor};
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

const Content = styled.div`
	background-color: #fff;
	border: 2px solid #ebebeb;
	box-sizing: border-box;
	padding: 18px;
	margin: 16px 0;
	line-height: 1.5;
	font-weight: noraml;

	@media screen and (max-width: 600px) {
		word-break: break-all;
		line-height: 1.2;
	}
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Nickname = styled.span`
	font-size: 20px;
	font-weight: bold;
	color: #000;

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;

const Place = styled.span`
	font-weight: noraml;

	&::before {
		content: "|";
		display: inline-block;
		clear: both;
		margin: 0 4px;
	}

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;

const CreateTime = styled.span`
	font-size: 16px;
	color: ${theme.TextSubColor};

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;
