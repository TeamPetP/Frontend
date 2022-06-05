import React, {useState} from "react";
import styled from "styled-components";
import withMain from "../../hocs/ui/withMain";
import { observer } from "mobx-react";
import * as theme from "../../styles/theme";
import PageTitle from "../../components/common/PageTitle";
import MyMeetList from "./myMeet/MyMeetList";

const MyMeetPage = observer(() => {
	const [selectedTabs, setSelectedTabs] = useState('participating');
	// 클릭한 탭 구별
	function setClickedTabs(e: any) {
		const role = e.target.dataset.role;
		setSelectedTabs(role);
	}

	const data = [
		{gatheringId: 1234, memberId: 4321, status : "모집중", endDate : "2022-05-22T22:40:01.0001", category : "공예/만들기", title :"수제 간식 원데이클래스 같이 하실 분!", content : "강아지를 위한 수제 간식 원데이 클래스 같이 하실 분 구합니다~~", members: ["고양이좋아", "커여운댕댕이", "신림동따발주먹"]},
		{gatheringId: 1235, memberId: 4321, status : "모집완료", endDate : "2022-05-22T22:40:01.0001", category : "공예/만들기", title :"수제 간식 원데이클래스 같이 하실 분!", content : "강아지를 위한 수제 간식 원데이 클래스 같이 하실 분 구합니다~~", members: ["고양이좋아", "커여운댕댕이", "신림동따발주먹"]},
		{gatheringId: 1236, memberId: 1234, status : "모집중", endDate : "2022-05-22T22:40:01.0001", category : "공예/만들기", title :"수제 간식 원데이클래스 같이 하실 분!", content : "강아지를 위한 수제 간식 원데이 클래스 같이 하실 분 구합니다~~", members: ["고양이좋아", "커여운댕댕이", "신림동따발주먹"]},
	]
	return (
		<Wrapper>
			<PageTitle title="내모임" />
			<TabsWrap>
				<Tab
					onClick={setClickedTabs}
					data-role="participating"
					page="participating"
					selectedTabs={selectedTabs}
				>
					참여중
				</Tab>
				<Tab
					onClick={setClickedTabs}
					data-role="Applying"
					page="Applying"
					selectedTabs={selectedTabs}
				>
					신청중
				</Tab>
			</TabsWrap>

			{selectedTabs === 'participating' && (<ContentArea>
				{data.map((data) => (
					<MyMeetList
						data={data}
						key={data.gatheringId}
					/>
				))}
			</ContentArea>)}
			{selectedTabs === 'Applying' && (<ContentArea>
				{data.map((data) => (
					<MyMeetList
						data={data}
						key={data.gatheringId}
					/>
				))}
			</ContentArea>)}
		</Wrapper>
	);
});

export default withMain(MyMeetPage, "마이페이지");

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const ContentArea = styled.div`
	padding: 10px 40px;
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
			: '2px solid #EBEBEB'};
	color: ${(props: { selectedTabs: string; page: string }) =>
		props.selectedTabs === props.page ? `${theme.PrimaryColor}` : '#000'};
	font-weight: ${(props: { selectedTabs: string; page: string }) =>
		props.selectedTabs === props.page ? 600 : 500};

	&:hover {
		color: ${theme.PrimaryColor};
	}
`;